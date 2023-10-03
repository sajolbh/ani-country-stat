$(document).ready(function(){
    $('.delete-country').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url: '/countries/'+id,
        success: function(response){
          alert('Are you sure?');
          window.location.href='/countries';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });