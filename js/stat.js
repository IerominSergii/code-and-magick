'use strict';

var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;

var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;

var TEXT_HEIGHT = 20;
var TEXT_COLOR = 'rgba(0, 0, 0, 1)';

var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_BETWEEN_DISTANCE = 50;

var resultMarginBottom = 5;
var titleMarginLeft = 60;
var barsMarginTop = 80;

var renderCloud = function (ctx, x, y, color) {
  var cloudWidth = 420;
  var cloudHeight = 270;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getBarColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  return 'hsla(237, ' + getRandomNumber(0, 100) + '%, 59%, 1)';
};

var renderBar = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};


window.renderStatistics = function (ctx, names, times) {
  ctx.font = '16px PT Mono';

  renderCloud(ctx, CLOUD_POSITION_X + SHADOW_GAP, CLOUD_POSITION_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_COLOR);

  renderText(ctx, 'Ура, вы победили!', CLOUD_POSITION_X + titleMarginLeft, CLOUD_POSITION_Y + TEXT_HEIGHT, TEXT_COLOR);
  renderText(ctx, 'Список результатов:', CLOUD_POSITION_X + titleMarginLeft, CLOUD_POSITION_Y + TEXT_HEIGHT * 2, TEXT_COLOR);

  var maxTime = getMaxElement(times);
  var positionY = CLOUD_POSITION_Y + barsMarginTop + BAR_MAX_HEIGHT;

  for (var i = 0; i < names.length; i++) {
    var positionX = CLOUD_POSITION_X + titleMarginLeft + (BAR_WIDTH + BAR_BETWEEN_DISTANCE) * i;

    var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;
    var resultPositionY = positionY - barHeight - resultMarginBottom;
    renderText(ctx, Math.round(times[i]), positionX, resultPositionY, TEXT_COLOR);

    var barColor = getBarColor(names[i]);

    var barPositionY = positionY - barHeight;
    renderBar(ctx, positionX, barPositionY, barHeight, barColor);

    var namePositionY = positionY + TEXT_HEIGHT;
    renderText(ctx, names[i], positionX, namePositionY, TEXT_COLOR);
  }
};
