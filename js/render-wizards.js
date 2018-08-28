'use strict';

(function () {
  window.renderWizard = function (wizard) {
    var wizardElement = document
      .querySelector('#similar-wizard-template')
      .content.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent =
      wizard.name;

    return wizardElement;
  };
})();
