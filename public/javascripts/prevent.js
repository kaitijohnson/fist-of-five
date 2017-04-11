$(()=>{
  let info = $('#moreInfo')
  let infoMore = $('#more')

  info.click((e)=>{
    e.preventDefault()
    infoMore.toggle()
  })
})
