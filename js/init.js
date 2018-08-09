$(function(){
  $('a[href^="#"]').click(function (){
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 60;
    jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
  });
  $('.begin-tov-img').slick({
    infinite: true,
    autoplay: true,
    dots: false,
    arrows: false,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $('.tov-gal').slick({
    infinite: true,
    autoplay: true,
    dots: false,
    arrows: true,
    fade: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span data-role="none" class="slick-prev animate" aria-label="Previous" tabindex="0" role="button"></span>',
    nextArrow: '<span data-role="none" class="slick-next animate" aria-label="Next" tabindex="0" role="button"></span>'
  });   
  $('.rew-cont').slick({
    infinite: true,
    autoplay: false,
    dots: false,
    arrows: true,
    fade: false,
    speed: 300,
    slidesToShow: 3,
    prevArrow: '<span data-role="none" class="slick-prev animate" aria-label="Previous" tabindex="0" role="button"></span>',
    nextArrow: '<span data-role="none" class="slick-next animate" aria-label="Next" tabindex="0" role="button"></span>',
    responsive: [
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });

  /* FAQ */

  function faqInitialization() {
    $(".faq_block .question_item .question").prepend("<span class='icon'></span>");
    $(".faq_block .question_item:eq(0)").addClass("active");
    var answer_text = $(".faq_block .question_item.active .answer").text();
    $(".faq_block").append("<div class='answer_block'>"+answer_text+"</div>");
  }

  faqInitialization();

  $(".faq_block .question_item .question").click(function(){
    if ($(".faq_block .answer_block").css("display") == "block") {
      $(".faq_block .question_item").removeClass("active");
      $(this).parent().addClass("active");
      var answer_text = $(".faq_block .question_item.active .answer").text();
      $(".faq_block .answer_block").text(answer_text);
    }
  });
  
});

jQuery(document).ready(function($){

  //в этой функции отслеживается изменение чекбокса "я не робот"
  $(document).on('change', '.fofm input:checkbox', function() {
    if($(this).is(':checked')){
      $(".fofm input[type=submit]").removeAttr('disabled');
      $('.fofm input[type=hidden].valTrFal').val('valTrFal_true');
    }
    else {
      $(".fofm input[type=submit]").attr('disabled','disabled');
      $('.fofm input[type=hidden].valTrFal').val('valTrFal_disabled');
    }
  });

  //закрытие модального окна
  $('.close_modal, .overlay').click(function (){
    $('.popup, .popup2, .overlay').css({'opacity':'0', 'visibility':'hidden'});
    $('.popup > .fofm textarea').val('');
    //сброс всех полей формы обраной связи
    $(':input','.fofm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');

  });

  //показ модального окна
  $('.open_modal').click(function (e){
    e.preventDefault();
    $('.popup, .overlay').css({'opacity':'1', 'visibility':'visible'});
  });

  //аякс форма обратной связи
  //проверяет какой ответ был получен
  //и в зависимости от ответа
  //выводит информацию о статусе
  //отправки письма
  $(".fofm").submit(function() {
    var str = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "php/contact.php",
      data: str,
      success: function(msg) {
        if(msg == 'ok') {
          $('.popup2, .overlay').css('opacity','1');
          $('.popup2, .overlay').css('visibility','visible');
          $('.popup').css({'opacity':'0','visibility':'hidden'});
        }
        else {
          $('.popup2 .window').html('<h5>Ошибка</h5><p>Сообщение не отправлено, убедитесь в правильности заполнение полей</p>');
          $('.popup2, .overlay').css('opacity','1');
          $('.popup2, .overlay').css('visibility','visible');
          $('.popup').css({'opacity':'0','visibility':'hidden'});
        }
      }
    });
    return false;
  });

});