'use strict';

(function () {
  var SIMILAR_WIZARDS_AMOUNT = 4;
  var USER_DIALOG = document.querySelector('.setup');
  var SIMILAR_LIST_BLOCK = USER_DIALOG.querySelector('.setup-similar');
  var SIMILAR_LIST_ELEMENT = SIMILAR_LIST_BLOCK.querySelector('.setup-similar-list');
  var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // functions
  // import
  var createWizardsArray = window.createWizardsArray;
  var showElement = window.showElement;

  var renderWizard = function (wizard) {
    var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);
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
  showElement(USER_DIALOG);
  addElementsUsingFragment(SIMILAR_LIST_ELEMENT, wizards, renderWizard);
  showElement(SIMILAR_LIST_BLOCK);
})();
