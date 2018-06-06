'use strict';

(function () {
  // import
  var createWizardsArray = window.createWizardsArray;
  var showElement = window.showElement;

  var SIMILAR_WIZARDS_AMOUNT = 4;
  var wizards = createWizardsArray(SIMILAR_WIZARDS_AMOUNT);

  var userDialog = document.querySelector('.setup');
  var similarListBlock = userDialog.querySelector('.setup-similar');
  var similarListElement = similarListBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };


  showElement(userDialog);
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  similarListElement.appendChild(fragment);
  showElement(similarListBlock);
})();
