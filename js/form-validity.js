'use strict';

(function () {
  // constants
  var ENTER_KEYCODE = 13;

  // elements
  var userDialog = document.querySelector('.setup');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  // functions
  var submitSetupWizardForm = function () {
    if (setupWizardForm.valiidity.valid === true) {
      setupWizardForm.submit();
    }
  };

  // export
  window.formValidity = {
    setupSubmitEnterPressHandler: function (evt) {
      if (document.activeElement === setupSubmit && evt.keyCode === ENTER_KEYCODE) {
        submitSetupWizardForm();
      }
    },
    setupSubmitClickHandler: function () {
      submitSetupWizardForm();
    },
    userNameInputChangeHandler: function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    },
  };
})();
