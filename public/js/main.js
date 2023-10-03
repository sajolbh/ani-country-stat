$(document).ready(function(){
    $('.delete-animal').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url: '/animals/'+id,
        success: function(response){
          alert('Are you sure?');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });

      for (var i = 0; i < document.links.length; i++) {
        if (document.links[i].href == document.URL) {
            document.links[i].className = 'active';
        }
    }
    });
  });