'use strict';

(function () {
  // import
  var getRandom = window.util.getRandomElement;

  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setFullName = function (fullName) {
    return getRandom(1) ? fullName.join(' ') : fullName.reverse().join(' ');
  };

  var createWizard = function (nameFirst, nameSecond, colorCoat, colorEyes) {
    var newWizard = {};
    var firstName = nameFirst[getRandom(nameFirst.length)];
    var secondName = nameSecond[getRandom(nameSecond.length)];
    newWizard.name = setFullName([firstName, secondName]);
    newWizard.coatColor = colorCoat[getRandom(colorCoat.length)];
    newWizard.eyesColor = colorEyes[getRandom(colorEyes.length)];

    return newWizard;
  };

  // export
  window.createWizards = function (amount) {
    var wizards = [];
    while (wizards.length < amount) {
      wizards.push(createWizard(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS));
    }

    return wizards;
  };
})();
