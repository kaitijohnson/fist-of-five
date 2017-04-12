$(() =>{
  console.log("hello world");
  $('.remove_class').click((e) =>{
    let id = $(e.target).closest('.collection').data('id');

    $.ajax({
      url: `/classroom/${id}`,
      type: 'DELETE',
      datatype: 'json',
      success: (data) =>{
        console.log('I pretty much removed this class')
        $(e.target).closest('.collection').hide('slow', (target)=>{
          console.log(target)
        })
      }

    })
    //$(e.target).closest('.collection').remove();
    // console.log($(e.target).closest());
  })
})
