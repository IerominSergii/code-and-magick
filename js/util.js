'use strict';

(function () {
  // export function
  window.getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  // export function
  window.getMaxElement = function (array) {
    var maxElement = array[0];

    for (var i = 1; i < array.length; i++) {
      if (maxElement < array[i]) {
        maxElement = array[i];
      }
    }

    return maxElement;
  };

  // export function
  window.showElement = function (element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
  };
})();
