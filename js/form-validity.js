'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  window.formValidity = {
    userNameInputChangeHandler: function () {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity(
            'Имя персонажа не может содержать менее 2 символов'
        );
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity(
            'Максимальная длина имени персонажа — 25 символов'
        );
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      } else {
        userNameInput.setCustomValidity('');
      }
    }
  };
})();
