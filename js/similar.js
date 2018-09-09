'use strict';

(function () {
  // constants
  var SIMILAR_WIZARDS_AMOUNT = 4;
  var RANK_VALUE = {
    coat: 2,
    eye: 1
  };
  var renderWizard = window.renderWizard;
  var loadData = window.backend.loadData;
  var showError = window.message.error;

  // elements
  var userDialog = document.querySelector('.setup');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var setupSimilar = userDialog.querySelector('.setup-similar');
  var similarListElement = setupSimilar.querySelector('.setup-similar-list');

  var originalWizards = [];

  // functions
  var getRank = function (wizard) {
    var coatRank =
      wizard.colorCoat === wizardCoat.style.fill ? RANK_VALUE.coat : 0;
    var eyeRank =
      wizard.colorEyes === wizardEyes.style.fill ? RANK_VALUE.eye : 0;
    return coatRank + eyeRank;
  };

  var getSortedSimilarWizards = function (wizards) {
    return wizards
      .map(function (wizard) {
        var rank = getRank(wizard);
        wizard.rank = rank;
        return wizard;
      })
      .sort(function (left, right) {
        return right.rank - left.rank;
      });
  };

  var renderSimilarWizards = function (wizards) {
    var newWizards = getSortedSimilarWizards(wizards);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < SIMILAR_WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(newWizards[i]));
    }

    similarListElement.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

  var clearSimilarWizards = function () {
    for (var i = similarListElement.children.length - 1; i >= 0; i--) {
      similarListElement.removeChild(similarListElement.children[i]);
    }
  };

  var getWizards = function (receivedWizards) {
    originalWizards = receivedWizards;
    renderSimilarWizards(originalWizards);
  };

  window.similarWizards = {
    load: function () {
      loadData(window.constants.URL, getWizards, showError);
    },
    reload: function () {
      clearSimilarWizards();
      renderSimilarWizards(originalWizards);
    },
    reset: function () {
      setupSimilar.classList.add('hidden');
      clearSimilarWizards();
    }
  };
})();
