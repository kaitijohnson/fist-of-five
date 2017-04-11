$(() => {
  console.log();
  let = urlArray = $(location).attr('href').split('/');
  let classId = urlArray[urlArray.length - 1];
  let currentRoom = `classroom_${classId}`
  let isInstructor = true;


  while (isNaN(parseInt(classId))) {
    urlArray.pop()
    console.log(urlArray);
    classId = urlArray[urlArray.length - 1];
    console.log(classId);
  }

  console.log(classId);
  let socket = io()
  let ul = $('#messages')

  $('.reaction_button').click((e) => {
    e.preventDefault()
    let input = $(e.target)
    console.log(e.target);

    socket.emit('mood', {
      mood: input.attr('data-value'),
      room: currentRoom
    })

  })
  socket.on('session object', data => {
    $('#stoked').text(`${data.happy.students.length}`)
    $('#happy').text(`${data.ya.students.length}`)
    $('#ok').text(`${data.meh.students.length}`)
    $('#sad').text(`${data.confused.students.length}`)
    $('#mad').text(`${data.angry.students.length}`)

    //     ul.append(`<li>${data.happy.students.length} are happy, ${data.ya.students.length} are ya,${data.meh.students.length} are meh,${data.confused.students.length} are confused,${data.angry.students.length} are angry,
    // ${averageRating(data)}
    //        </li>`)

    //ul.prepend(`<li>This is the class average: ${JSON.stringify(data)}</li>`)
  })
  socket.on('findRoom', data => {
    socket.emit('checkRoom', {
      currentRoom,
      isInstructor
    })
    socket.emit('joinRoom', currentRoom);
  })
  socket.on('message', data => {
    console.log("got something");
    ul.prepend(`<li>${data}</li>`)
  })
  socket.on('toDashboard', () => {

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
