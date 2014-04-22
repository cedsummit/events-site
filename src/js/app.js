$(document).ready(function () {
  softScroll();
  navHighlight();
  onResize();
});

$(window).focus(function() {
  $('#bg-video').get(0).play();
});

$(window).blur(function() {
    $('#bg-video').get(0).pause();
});

$('#bg-video').on('ended', function () {
    this.get(0).currentTime = 0;
    this.get(0).play();
}, false);

function softScroll() {
  $('.nav-menu-item').click(function(e){
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
  });
}

function navHighlight() {
  // Cache selectors
  var topMenu = $(".menu"),
      topMenuHeight = topMenu.height()+200,

      // All list items
      menuItems = topMenu.find("a.nav-menu-item"),

      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });

     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     menuItems.removeClass('active');
     $('a[href="#'+ id + '"]').addClass('active');
  });
}

function onResize() {
  $( window ).resize(function() {
    var wHeight = $(window).height();
    var hHeight = $('header').height();
    var aboutHeight = wHeight - hHeight;

    $('#about').css('height', wHeight + 'px');
  });
}