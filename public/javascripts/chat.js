$(() => {
  console.log();
  let = urlArray = $(location).attr('href').split('/');
  let classId = urlArray[urlArray.length -1];
  let currentRoom = `classroom_${classId}`


  while(isNaN(parseInt(classId))){
    urlArray.pop()
    console.log(urlArray);
    classId = urlArray[urlArray.length -1];
    console.log(classId);
  }

  console.log(classId);
  let socket = io()
  let ul = $('#messages')

  $('.rating').click((e) => {
    e.preventDefault()
    let input = $(e.target)
    socket.emit('mood', {mood:input.attr('data-value'),room:currentRoom})
  })
  socket.on('session object', data => {
        ul.append(`<li>${data.happy.students.length} are happy, ${data.ya.students.length} are ya,${data.meh.students.length} are meh,${data.confused.students.length} are confused,${data.angry.students.length} are angry,
    ${averageRating(data)}
           </li>`)

    //ul.prepend(`<li>This is the class average: ${JSON.stringify(data)}</li>`)
  })
  socket.on('findRoom', data =>{
    socket.emit('joinRoom', currentRoom);
  })
  socket.on('message', data =>{
    console.log("got something");
    ul.prepend(`<li>${data}</li>`)
  })
})

function averageRating(data) {
  // console.log(data);
  let sum = 0
  let studentSum = 0
  for (var mood in data) {
    let currentMood = data[mood]
    console.log(currentMood.value, '-----', currentMood.students.length);
    sum += currentMood.value * currentMood.students.length
    studentSum += currentMood.students.length
  }
  return (sum / studentSum).toFixed(2)
}
