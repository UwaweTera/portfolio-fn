$(document).ready(function () {
  $('[data-toggle="tooltip]').tooltip();

  $(window).scroll(function () {
    $(".animated-element").each(function () {
      var element = $(this);
      var position = element.offset().top;

      // If the element is in the viewport
      if (position < $(window).scrollTop() + $(window).height()) {
        element.addClass("animate__fadeIn");
      }
    });
  });
});
