'use strict';

(function () {
  // constants
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var SETUP_INITIAL_POSITION = {
    x: 622,
    y: 80
  };

  var showElement = window.util.showElement;
  var hideElement = window.util.hideElement;
  var getRandomElement = window.util.getRandomElement;
  var constants = window.constants;
  var userNameInputCheckValidity =
    window.formValidity.userNameInputCheckValidity;
  var saveForm = window.backend.saveForm;
  var showError = window.message.error;

  // elements
  var userDialog = document.querySelector('.setup');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupPlayer = userDialog.querySelector('.setup-player');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var setupFireballInput = setupFireballWrap.querySelector('input');
  var setupFireball = setupFireballWrap.querySelector('.setup-fireball');

  var setupSimilar = userDialog.querySelector('.setup-similar');
  var similarListElement = setupSimilar.querySelector('.setup-similar-list');

  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');

  // functions
  var setSetupInitialPosition = function () {
    userDialog.style.left = SETUP_INITIAL_POSITION.x + 'px';
    userDialog.style.top = SETUP_INITIAL_POSITION.y + 'px';
  };

  var changeBackgroundColor = function (element, colors) {
    element.style.backgroundColor = colors[getRandomElement(colors.length)];
  };

  var submitSetupWizardForm = function (evt) {
    if (userNameInput.validity.valid) {
      evt.preventDefault();
      saveForm(new FormData(setupWizardForm), closeSetup, showError);
    }
  };

  var openSetup = function () {
    if (!similarListElement.children.length) {
      window.similarWizards.load();
    }
    setupClose.addEventListener('click', closeSetup);
    document.addEventListener('keydown', userDialogEscPressHandler);
    document.addEventListener('keydown', setupCloseEnterPressHandler);
    document.addEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.addEventListener('click', setupSubmitClickHandler);

    userNameInput.addEventListener('input', userNameInputCheckValidity);
    setupPlayer.addEventListener('click', setupPlayerClickHandler);
    showElement(userDialog);
  };

  var closeSetup = function () {
    hideElement(userDialog);
    window.similarWizards.reset();
    setSetupInitialPosition();
    setupClose.removeEventListener('click', closeSetup);
    document.removeEventListener('keydown', userDialogEscPressHandler);
    document.removeEventListener('keydown', setupCloseEnterPressHandler);
    document.removeEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.removeEventListener('click', setupSubmitClickHandler);

    userNameInput.removeEventListener('input', userNameInputCheckValidity);
    setupPlayer.removeEventListener('click', setupPlayerClickHandler);
  };

  // changeFillColor
  var changeFillColor = function (element, colors) {
    element.style.fill = colors[getRandomElement(colors.length)];
  };

  var changeCoatHandler = window.debounce(window.similarWizards.reload);
  var changeEyesHandler = window.debounce(window.similarWizards.reload);

  var setupPlayerClickHandler = function (evt) {
    if (evt.target === wizardCoat) {
      changeFillColor(wizardCoat, constants.COAT_COLORS);
      changeCoatHandler();
    } else if (evt.target === wizardEyes) {
      changeFillColor(wizardEyes, constants.EYES_COLORS);
      changeEyesHandler();
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
    if (
      document.activeElement !== userNameInput &&
      evt.keyCode === ESC_KEYCODE
    ) {
      evt.preventDefault();
      closeSetup();
    }
  };

  var setupCloseEnterPressHandler = function (evt) {
    if (
      document.activeElement === setupClose &&
      evt.keyCode === ENTER_KEYCODE
    ) {
      closeSetup();
    }
  };

  var setupSubmitEnterPressHandler = function (evt) {
    if (
      document.activeElement === setupSubmit &&
      evt.keyCode === ENTER_KEYCODE
    ) {
      submitSetupWizardForm(evt);
    }
  };

  var setupSubmitClickHandler = function (evt) {
    submitSetupWizardForm(evt);
  };

  setupOpen.addEventListener('click', openSetup);
  setupOpenIcon.addEventListener('keydown', setupOpenIconEnterPressHandler);
  window.similarWizards.load();
})();
