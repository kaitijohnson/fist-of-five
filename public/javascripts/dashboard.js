$(() =>{
  console.log("hello world");
  $('.remove_class').click((e) =>{
    $(e.target).closest('.collection').hide('slow', (target)=>{
      log(target)
    })
    //$(e.target).closest('.collection').remove();
    console.log($(e.target).closest());
  })
})
