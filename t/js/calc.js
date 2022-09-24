$(document).ready(function () {
  //Tabs
  $(".tab_content").hide();
  $("ul.tabs li:first").addClass("active").show();
  $(".tab_content:first").show();

  //On Click Event
  $("ul.tabs li").click(function () {
    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");
    $(".tab_content").hide();
    let activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    $(".main-calc__content").removeClass("active-tab");
    $(activeTab).addClass("active-tab");
    return false;
  });

  //Range slider
  let rangeValues = [
    [30000, 100000, 300000],
    [100000, 300000, 500000],
    [60000, 200000, 400000]
  ];

  for (let i = 0; i < rangeValues[2].length; i++) {
    $("#range-" + (i + 1)).slider({
      animate: "slow",
      range: "min",
      min: rangeValues[0][i],
      max: rangeValues[1][i],
      value: rangeValues[2][i],
      slide: function (event, ui) {
        $("#main-calc-range-price-" + (i + 1)).text(ui.value.toLocaleString('ru-RU'));
      }
    });
  }

//Scroll bar
  $(".nano").nanoScroller();

//Checked/unchecked elements
  $('.check-highload').on('change', function () {
    let totalSum = $(this).closest('.main-calc__content').find('.total-sum');
    let total = totalSum.text();
    total = Number(total.replace(/\s/g, ''));
    let value = $(this).attr('value');
    let index = $(this).closest('.main-calc__left-check').index();
    let calcContent = $(this).closest('.main-calc__content');
    let listItem = calcContent.find('.main-calc__right-item').eq(index);
    let backgroundImage = calcContent.find('.main-calc__right-img');
    let buttonCulc = calcContent.find('.main-calc__left-btn--culc');
    let buttonReset = calcContent.find('.main-calc__left-btn--reset');

    if ($(this).prop("checked") === true) {
      total += +value;
      listItem.show();
    } else {
      listItem.hide();
      total -= +value;
    }
    if (total === 0) {
      backgroundImage.show();
      buttonCulc.css('opacity', '0.3');
      buttonReset.css('opacity', '0.5');
    } else {
      backgroundImage.hide();
      buttonCulc.css('opacity', '1');
      buttonReset.css('opacity', '1');
    }
    totalSum.text(total.toLocaleString('ru-RU'));
  });

//Click buttonReset
  $('.main-calc__left-btn--reset').click(function (e) {
    $(this).css('opacity', '0.5');
    let parent = $(this).closest('.main-calc__content');
    parent.find('.main-calc__left-btn--culc').css('opacity', '0.3');
    parent.find('.main-calc__right-img').show();
    parent.find('.total-sum').text('0');
    parent.find('.check-highload').prop('checked', false);
    parent.find('.main-calc__right-item').hide();
    for (let j = 0; j < rangeValues[2].length; j++) {
      $("#range-" + (j + 1)).slider({
        value: rangeValues[2][j],
      });
      $("#main-calc-range-price-" + (j + 1)).text(rangeValues[2][j].toLocaleString('ru-RU'));
    }
  });

// Modal window
  $('.popup-open').click(function () {
    let activeTab = $('.active-tab');
    let popupRange = activeTab.find('.main-calc__left-price').text();
    $('.popup-total-budget').val(popupRange);
    let popupTotal = activeTab.find('.main-calc__right-total--sum').text();
    $('.popup-total-sum').val(popupTotal);
    $(activeTab.find('.main-calc__left-check')).each(function () {
      if ($(this).find('.check-highload').prop("checked") === true) {
        $(this).clone().appendTo(".popup-check-services");
        $(".popup-check-services").find('.check-highload').prop('disabled', true);
      }
    });
    $(".popup-check-services").find('.main-calc__left-check').each(function () {
      let checkSum = $(this).find('.main-calc__left-check--sum span').text();
      checkSum = Number(checkSum);
      $(this).find('.main-calc__left-check--sum span').text(checkSum.toLocaleString('ru-RU'));
    });
    $('.popup-fade').show();
    return false;
  });
  function checkRemove() {
    $(".popup-check-services .main-calc__left-check").remove();
  }
  $('.popup-close, .popup-btn-back').click(function () {
    $(this).parents('.popup-fade').hide();
    checkRemove();
    return false;
  });
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').hide();
      checkRemove();
    }
  });
  $('.popup-fade').click(function (e) {
    if ($(e.target).closest('.popup').length === 0) {
      $(this).hide();
      checkRemove();
    }
  });
});
