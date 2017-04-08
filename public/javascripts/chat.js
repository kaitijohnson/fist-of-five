$(() => {
  let socket = io()
  let ul = $('#messages')

  $('.rating').click((e) => {
    e.preventDefault()
    let input = $(e.target)
    socket.emit('mood', input.attr('data-value'))
  })

  socket.on('session object', data => {
    //     ul.append(`<li>${data.happy.students.length} are happy, ${data.ya.students.length} are ya,${data.meh.students.length} are meh,${data.confused.students.length} are confused,${data.angry.students.length} are angry,
    // ${averageRating(data)}
    //        </li>`)

    ul.prepend(`<li>This is the class average: ${averageRating(data)}</li>`)
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
