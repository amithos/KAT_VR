'use strict';

const $ = window.$;

$(document).ready(function() {
  const menuBtn = $('.header__menu-btn');
  const menu = $('.menu');
  const menuBtnWrapper = $('.header__button-wrap');
  const menuToggler = 'menu--switch';
  const animateBurger = 'header__menu-btn--animateBurger';
  const animateCross = 'header__menu-btn--animateCross';
  const animateWrapper = 'header__button-wrap--rotate';

  const logo = $('.header__logo-link');
  const logoHide = 'header__logo-link--hide';

  const toggleMenu = () => {
    menu.toggleClass(menuToggler);
    menuBtn.toggleClass(animateBurger);
    menuBtn.toggleClass(animateCross);
    menuBtnWrapper.toggleClass(animateWrapper);
    logo.toggleClass(logoHide);
  };

  menuBtn.click(toggleMenu);

  const startPhoto1 = $('.start-view__photo');
  const startPhoto2 = $('.start-view__photo2');
  const photo1HideClass = 'start-view__photo--hide';
  const photo2ShowClass = 'start-view__photo2--show';
  const transition = $('.start-view__transition');
  const transitionMod1 = 'transition--1';
  const transitionMod2 = 'transition--2';
  const buttonPrev = $('#transition__prev');
  const buttonNext = $('#transition__next');

  const changeTransitionLine = mod => {
    transition.removeClass(transitionMod1);
    transition.removeClass(transitionMod2);
    transition.addClass(`transition--${mod}`);
  };

  const showFirstPhoto = () => {
    startPhoto1.removeClass(photo1HideClass);
    startPhoto2.removeClass(photo2ShowClass);
    changeTransitionLine(1);
  };

  const showSecondPhoto = () => {
    startPhoto1.addClass(photo1HideClass);
    startPhoto2.addClass(photo2ShowClass);
    changeTransitionLine(2);
  };

  buttonPrev.click((event) => {
    event.preventDefault();
    showFirstPhoto();
  });

  buttonNext.click((event) => {
    event.preventDefault();
    showSecondPhoto();
  });

  const specMain = $('.specifications__main');
  const senBtn = $('#sen');
  const batBtn = $('#bat');
  const conBtn = $('#con');

  const openSenClass = 'specifications__main--sen';
  const openBatClass = 'specifications__main--bat';
  const openConClass = 'specifications__main--con';
  const buttonChange = 'specifications__button--open';

  const specSwitcher = (openClass, button) => {
    specMain.toggleClass(openClass);
    button.toggleClass(buttonChange);
  };

  senBtn.click(function() {
    specSwitcher(openSenClass, senBtn);
  });

  batBtn.click(function() {
    specSwitcher(openBatClass, batBtn);
  });

  conBtn.click(function() {
    specSwitcher(openConClass, conBtn);
  });

  const langChoosedIcon = $('.lang__icon');
  const langList = $('.lang__slide');
  const openList = 'lang__slide--tog';
  const electClass = 'lang__elect';

  const languageButton = {
    ua: $('#item_ua'),
    en: $('#item_en'),
    pl: $('#item_pl'),
    ru: $('#item_ru'),
  };

  const icon = {
    ua: 'lang__icon--ua',
    en: 'lang__icon--en',
    pl: 'lang__icon--pl',
    ru: 'lang__icon--ru',
  };

  const langListToggler = () => {
    langList.toggleClass(openList);
  };

  langChoosedIcon.click(langListToggler);

  const removeElect = () => {
    for (const key of Object.keys(languageButton)) {
      if (languageButton[key].hasClass(electClass)) {
        languageButton[key].removeClass(electClass);
      }
    }
  };

  const changeIcon = valueOfClass => {
    const langIconClasses = langChoosedIcon.attr('class').split(' ');

    langIconClasses.forEach(iconClass => {
      if (Object.values(icon).includes(iconClass)) {
        langChoosedIcon.removeClass(iconClass);
      }
    });

    langChoosedIcon.addClass(valueOfClass);
  };

  const langSelect = langFlag => {
    removeElect();
    languageButton[langFlag].addClass(electClass);
    changeIcon(icon[langFlag]);
  };

  languageButton.ru.click(function() {
    langSelect('ru');
  });

  languageButton.ua.click(function() {
    langSelect('ua');
  });

  languageButton.en.click(function() {
    langSelect('en');
  });

  languageButton.pl.click(function() {
    langSelect('pl');
  });

  const windowElement = $(window);
  const mainBuyButton = $('.page-main__buy-button');
  const activeButtonClass = 'page-main__buy-button--active';

  const showTabletButton = () => {
    if (windowElement.scrollTop() > 850) {
      mainBuyButton.addClass(activeButtonClass);
    } else {
      mainBuyButton.removeClass(activeButtonClass);
    }
  };

  windowElement.scroll(showTabletButton);

  const activePopupClass = 'popup--act';
  const slidePopupContentClass = 'popup__content--slide';

  const popupToggler = (currentPopup, currentContent, currentVideo) => {
    currentPopup.toggleClass(activePopupClass);
    currentContent.toggleClass(slidePopupContentClass);

    if (currentVideo && !currentPopup.hasClass(activePopupClass)) {
      const source = currentVideo.attr('src');

      currentVideo.attr('src', source);
    }
  };

  const buyPopup = $('#buy-popup');
  const buyButtons = $('.buy-button');

  buyButtons.click(() => popupToggler(buyPopup, buyPopupContent));

  const closeBuyPopupButton = $('#buy-popup__cross');
  const buyPopupContent = $('#buy-popup__content');

  closeBuyPopupButton.click(() => popupToggler(buyPopup, buyPopupContent));

  const videoPopup = $('#video-popup');
  const videoButtons = $('.video-button');
  const video = $('.video-popup__video');

  videoButtons.click(() => popupToggler(videoPopup, videoPopupContent, video));

  const closeVideoPopupButton = $('#video-popup__cross');

  closeVideoPopupButton.click(
    () => popupToggler(videoPopup, videoPopupContent, video)
  );

  const videoPopupContent = $('#video-popup__content');

  const faqPopup = $('#faq-popup');
  const faqContent = $('#faq__content');
  const faqButtons = $('.faq-button');
  const closeFaqPopup = $('#faq__cross');

  faqButtons.click(() => popupToggler(faqPopup, faqContent));
  closeFaqPopup.click(() => popupToggler(faqPopup, faqContent));

  const sliderPhotos = $('.slider__photo');
  const slider = $('.slider');
  const sliderWidth = slider.outerWidth();
  const sliderLine = $('.slider__line');
  const sliderLineWidth = sliderWidth * sliderPhotos.length;
  const sliderPrevButton = $('#slider__prev');
  const sliderNextButton = $('#slider__next');
  const DOMSliderCounter = $('.slider__counter');
  const indicatorLine = $('.slider__indicator');
  const lastSliderLinePosition = sliderLineWidth - sliderWidth;
  let photoCount = 1;
  let offset = 0;

  const confirmSlide = () => {
    sliderLine.css('right', offset + 'px');
    DOMSliderCounter.html(`${photoCount}/5`);
    indicatorLine.css('width', `${photoCount * 20}%`);
  };

  const prevFunc = () => {
    if (offset !== 0) {
      offset -= sliderWidth;
      photoCount--;
    } else {
      offset = lastSliderLinePosition;
      photoCount = 5;
    }

    confirmSlide();
  };

  const nextFunc = () => {
    if (offset !== lastSliderLinePosition) {
      offset += sliderWidth;
      photoCount++;
    } else {
      offset = 0;
      photoCount = 1;
    }

    confirmSlide();
  };

  sliderPrevButton.click(prevFunc);
  sliderNextButton.click(nextFunc);

  windowElement.resize(() => {
    if ($(this).outerWidth() < 1225) {
      showFirstPhoto();
    };
  });
});
