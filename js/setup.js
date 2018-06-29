'use strict';

(function () {
  // import
  var createWizards = window.createWizards;
  var showElement = window.util.showElement;
  var hideElement = window.util.hideElement;
  var getRandomElement = window.util.getRandomElement;
  var constants = window.constants;

  // constants
  var SIMILAR_WIZARDS_AMOUNT = 4;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // elements
  var userDialog = document.querySelector('.setup');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
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
  var similarListBlock = userDialog.querySelector('.setup-similar');
  var similarListElement = similarListBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');

  // functions
  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.content.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var renderElements = function (parent, dataArray, callback) {
    var fragment = document.createDocumentFragment();

    dataArray.forEach(function (it) {
      fragment.appendChild(callback(it));
    });
    parent.appendChild(fragment);
  };

  var submitSetupWizardForm = function () {
    if (setupWizardForm.valiidity.valid === true) {
      setupWizardForm.submit();
    }
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

  var setupSubmitEnterPressHandler = function (evt) {
    if (document.activeElement === setupSubmit && evt.keyCode === ENTER_KEYCODE) {
      submitSetupWizardForm();
    }
  };

  var setupSubmitClickHandler = function () {
    submitSetupWizardForm();
  };

  var userNameInputChangeHandler = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var start = function () {
    var wizards = createWizards(SIMILAR_WIZARDS_AMOUNT);
    renderElements(similarListElement, wizards, createWizardElement);

    setupOpen.addEventListener('click', openSetup);
    setupOpenIcon.addEventListener('keydown', setupOpenIconEnterPressHandler);
  };


  // start
  start();
})();
