$(() =>{
  console.log("hello world");
  let userId = $('#user-id').text();
  console.log(userId);
  $('.remove_class').click((e) => {
    let id = $(e.target).closest('.collection').data('id');

    $.ajax({
      url: `/classroom/${id}`,
      type: 'DELETE',
      datatype: 'json',
      success: (data) =>{
        console.log('I pretty much removed this class')
        $(e.target).closest('.collection').hide('fast')
      }

    })
  })

  $('.form-submission').click((e) => {
    e.preventDefault();
    if($('#class_name').val()){
      let className = $('#class_name').val()
      $.ajax({
        url: `/classroom/`,
        type: 'POST',
        datatype: 'json',
        data:{'className': className, 'id': userId},
        success: (data) =>{
          toggleForm();
          addClassLink(data.data);
          console.log(data);
        }
      })
    }
    console.log('form submission working');
  })

  $('.create-class').click((e) => {
    console.log("create-class working");
    toggleForm();
    // $('.create-form-container').is(':visible') ? console.log('visible'):console.log('invisible');
  })
  function toggleForm(){
    $('.create-form-container').slideToggle(() =>{
      if($('.create-form-container').is(':visible')){
        $('.create-class').text('cancel');
      }
      else{
        $('.create-class').text('New Class');
      }
    });
  }
  function addClassLink(classData){
    console.log("class data",classData);
    console.log("class id ", classData.id);
    let classLink = $('<div class="collection"></div>c').html(`<span class="badge"><button class="remove_class" type="button" name="button"><i class="material-icons">delete</i></button></span><a class="valign-wrapper collection-item z-depth-5" onclick="myFunction(${classData.id})"><i class="material-icons">people</i> ${classData.name}</a>`);
    classLink.attr('data-id', classData.id)
    console.log(classLink);

    console.log();
    classLink.children('span').children('button').click((e)=>{
      let id = $(e.target).closest('.collection').data('id');

      $.ajax({
        url: `/classroom/${id}`,
        type: 'DELETE',
        datatype: 'json',
        success: (data) =>{
          console.log('I pretty much removed this class')
          $(e.target).closest('.collection').hide('fast')
        }

      })
    })
    $('#classes-container').append(classLink)
  }
})

/*
<div class="collection" data-id={{this.id}} >
  <span class="badge"><button class="remove_class" type="button" name="button"><i class="material-icons">delete</i></button></span>
  <a class="valign-wrapper collection-item z-depth-5" onclick="myFunction({{this.id}})"><i class="material-icons">people</i> {{this.name}}
  </a>
</div>
*/
