'use strict';

(function () {
  // import
  var createWizards = window.createWizards;
  var showElement = window.util.showElement;
  var hideElement = window.util.hideElement;

  var SIMILAR_WIZARDS_AMOUNT = 4;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var userDialog = document.querySelector('.setup');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var setupSubmit = userDialog.querySelector('.setup-submit');

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
    setupWizardForm.submit();
  };

  var setupOpenIconEnterPressHandler = function (evt) {
    if (document.activeElement === setupOpenIcon && evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      openSetup();
    }
  };

  var userDialogEscPressHandler = function (evt) {
    if (document.activeElement !== setupUserName && evt.keyCode === ESC_KEYCODE) {
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

  var openSetup = function () {
    setupClose.addEventListener('click', closeSetup);
    document.addEventListener('keydown', userDialogEscPressHandler);
    document.addEventListener('keydown', setupCloseEnterPressHandler);
    document.addEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.addEventListener('click', setupSubmitClickHandler);
    showElement(userDialog);
  };

  var closeSetup = function () {
    hideElement(userDialog);
    setupClose.removeEventListener('click', closeSetup);
    document.removeEventListener('keydown', userDialogEscPressHandler);
    document.removeEventListener('keydown', setupCloseEnterPressHandler);
    document.removeEventListener('keydown', setupSubmitEnterPressHandler);
    setupSubmit.removeEventListener('click', setupSubmitClickHandler);
  };

  // start
  var wizards = createWizards(SIMILAR_WIZARDS_AMOUNT);
  renderElements(similarListElement, wizards, createWizardElement);
  // showElement(userDialog);
  // showElement(similarListBlock);

  setupOpen.addEventListener('click', openSetup);
  setupOpenIcon.addEventListener('keydown', setupOpenIconEnterPressHandler);
})();
