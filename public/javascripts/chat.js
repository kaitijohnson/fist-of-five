$(() => {
  let socket = io()
  let ul = $('#messages')

  $('.rating').click((e) => {
    e.preventDefault()
    let input = $(e.target)
    socket.emit('mood', input.attr('data-value'))
  })

  socket.on('session object', data => {
    ul.append(`<li>${data.happy.length} are happy, ${data.ya.length} are ya,${data.meh.length} are meh,${data.confused.length} are confused,${data.angry.length} are angry, </li>`)
  })
})
