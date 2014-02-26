// Page Stuff

$(document).ready(function () {
  var wHeight = $(window).height(),
      hHeight = $('header').height(),
      aboutHeight = wHeight - hHeight;

  var videoTemplate = '<video id="bg-video" poster="video/ambient.png" autoplay loop>' +
                          '<source src="video/ambient.webm" type="video/webm" />' +
                          '<source src="video/ambient.ogv" type="video/ogg" />' +
                          '<source src="video/ambient.mp4" />' +
                       '</video>';

  $('#about').prepend(videoTemplate);
  $('#about').css('height', wHeight + 'px');

  $('.nav-menu-item').click(function(e){
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
  });
});