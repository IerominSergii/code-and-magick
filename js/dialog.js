'use strict';

(function () {
  // elements
  var setup = document.querySelector('.setup');
  var setupUserPic = setup.querySelector('.upload');

  // handlers
  var setupMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var setupMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY,
      };

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };

    var setupMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', setupMouseMoveHandler);
      document.removeEventListener('mouseup', setupMouseUpHandler);

      if (dragged) {
        var preventDefaultClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          setupUserPic.removeEventListener('click', preventDefaultClickHandler);
        };

        setupUserPic.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', setupMouseMoveHandler);
    document.addEventListener('mouseup', setupMouseUpHandler);
  };

  // start
  setupUserPic.addEventListener('mousedown', setupMouseDownHandler);
})();
