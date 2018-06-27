'use strict';

(function () {
  window.util = {
    getRandomNumber: function (max) {
      return Math.round(Math.random() * max);
    },
    getRandomElement: function (elementLength) {
      return Math.round(Math.random() * (elementLength - 1));
    },
    getMaxElement: function (array) {
      var maxElement = array[0];

      for (var i = 1; i < array.length; i++) {
        maxElement = maxElement < array[i] ? array[i] : maxElement;
      }

      return maxElement;
    },
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },
    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },
  };
})();
