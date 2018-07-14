'use strict';

(function () {
  // constants
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var SETUP_INITIAL_POSITION = {
    x: 622,
    y: 80,
  };

  // global
  var showElement = window.util.showElement;
  var hideElement = window.util.hideElement;
  var getRandomElement = window.util.getRandomElement;
  var constants = window.constants;
  var setupSubmitEnterPressHandler = window.setupSubmitEnterPressHandler;
  var setupSubmitClickHandler = window.setupSubmitClickHandler;
  var userNameInputChangeHandler = window.userNameInputChangeHandler;

  // elements
  var userDialog = document.querySelector('.setup');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var setupPlayer = userDialog.querySelector('.setup-player');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireballInput = setupFireballWrap.querySelector('input');
  var setupFireball = setupFireballWrap.querySelector('.setup-fireball');

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');


  // functions
  var setSetupInitialPosition = function () {
    userDialog.style.left = SETUP_INITIAL_POSITION.x + 'px';
    userDialog.style.top = SETUP_INITIAL_POSITION.y + 'px';
  };

  var changeFillColor = function (element, colors) {
    element.style.fill = colors[getRandomElement(colors.length)];
  };

  var changeBackgroundColor = function (element, colors) {
    element.style.backgroundColor = colors[getRandomElement(colors.length)];
  };

  var openSetup = function () {
    setupClose.addEventListener('click', closeSetup);
    document.addEventListener('keydown', userDialogEscPressHandler);
    document.addEventListener('keydown', setupCloseEnterPressHandler);
    document.addEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.addEventListener('click', setupSubmitClickHandler);

    userNameInput.addEventListener('change', userNameInputChangeHandler);
    setupPlayer.addEventListener('click', setupPlayerClickHandler);
    showElement(userDialog);
  };

  var closeSetup = function () {
    hideElement(userDialog);
    setSetupInitialPosition();
    setupClose.removeEventListener('click', closeSetup);
    document.removeEventListener('keydown', userDialogEscPressHandler);
    document.removeEventListener('keydown', setupCloseEnterPressHandler);
    document.removeEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.removeEventListener('click', setupSubmitClickHandler);

    userNameInput.removeEventListener('change', userNameInputChangeHandler);
    setupPlayer.removeEventListener('click', setupPlayerClickHandler);
  };

  // handlers
  var setupPlayerClickHandler = function (evt) {
    if (evt.target === wizardCoat) {
      changeFillColor(wizardCoat, constants.COAT_COLORS);
    } else if (evt.target === wizardEyes) {
      changeFillColor(wizardEyes, constants.EYES_COLORS);
    } else if (evt.target === setupFireball) {
      changeBackgroundColor(setupFireballWrap, constants.FIREBALL_COLORS);
      setupFireballInput.value = setupFireballWrap.style.backgroundColor;
    }
  };

  var setupOpenIconEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      openSetup();
    }
  };

  var userDialogEscPressHandler = function (evt) {
    if (document.activeElement !== userNameInput && evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeSetup();
    }
  };

  var setupCloseEnterPressHandler = function (evt) {
    if (document.activeElement === setupClose && evt.keyCode === ENTER_KEYCODE) {
      closeSetup();
    }
  };


  setupOpen.addEventListener('click', openSetup);
  setupOpenIcon.addEventListener('keydown', setupOpenIconEnterPressHandler);
})();
