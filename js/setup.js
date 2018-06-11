'use strict';

(function () {
  var SIMILAR_WIZARDS_AMOUNT = 4;
  var userDialog = document.querySelector('.setup');
  var similarListBlock = userDialog.querySelector('.setup-similar');
  var similarListElement = similarListBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // functions
  // import
  var createWizardsArray = window.createWizardsArray;
  var showElement = window.showElement;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var addElementsUsingFragment = function (parent, dataArray, callback) {
    var fragment = document.createDocumentFragment();
    dataArray.forEach(function (it) {
      fragment.appendChild(callback(it));
    });
    parent.appendChild(fragment);
  };

  // start
  var wizards = createWizardsArray(SIMILAR_WIZARDS_AMOUNT);
  showElement(userDialog);
  addElementsUsingFragment(similarListElement, wizards, renderWizard);
  showElement(similarListBlock);
})();
