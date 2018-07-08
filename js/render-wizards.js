'use strict';

(function () {
  // constants
  var SIMILAR_WIZARDS_AMOUNT = 4;

  // global
  var createWizards = window.createWizards;

  // elements
  var userDialog = document.querySelector('.setup');
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

  // start
  var wizards = createWizards(SIMILAR_WIZARDS_AMOUNT);
  renderElements(similarListElement, wizards, createWizardElement);
})();
