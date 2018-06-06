'use strict';

(function () {
  // export function
  window.getRandomNumber = function (max) {
    return Math.round(Math.random() * max);
  };

  // export function
  window.getRandomElement = function (elementLength) {
    return Math.round(Math.random() * (elementLength - 1));
  };

  // export function
  window.getMaxElement = function (array) {
    var maxElement = array[0];

    for (var i = 1; i < array.length; i++) {
      maxElement = maxElement < array[i] ? array[i] : maxElement;
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
