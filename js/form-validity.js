'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  window.formValidity = {
    userNameInputCheckValidity: function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity(
            'Имя персонажа не может содержать менее ' +
            userNameInput.minLength +
            ' символов'
        );
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity(
            'Максимальная длина имени персонажа — ' +
            userNameInput.maxLength +
            ' символов'
        );
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    }
  };
})();
