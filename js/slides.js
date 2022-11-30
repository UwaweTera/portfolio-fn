$(document).ready(function(){
    
    $('.test-slide').slick({
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        prevArrow: '.test-prev',
        nextArrow: '.test-next',
        
      });
      $('.row-2-1').slick({
        infinite: true,
        speed: 800,
        prevArrow: '.prev',
        nextArrow: '.next',
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        
        ]
      });


      $('#row-slide').slick({
        infinite: true,
        speed: 800,
        prevArrow: '#prev',
        nextArrow: '#next',
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        
        ]
      });
      
});