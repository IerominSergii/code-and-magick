'use strict';

(function () {
  // functions
  var createWizard = function (wizard) {
    var newWizard = {};
    newWizard.name = wizard.name;
    newWizard.coatColor = wizard.colorCoat;
    newWizard.eyesColor = wizard.colorEyes;

    return newWizard;
  };

  // export
  window.createWizards = function (wizards) {
    var wizards = [];

    for (var i = 0; i <= 4; i++) {
      wizards.push(createWizard(wizard[i]));
    }

    return wizards;
  };
})();
