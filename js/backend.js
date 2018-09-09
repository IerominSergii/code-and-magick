'use strict';

(function () {
  var TIMEOUT = 1000;
  var STATUS_SUCCESS = 200;

  var createXMLHttpRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
        // window.tempXhrResponse = xhr.response;
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    loadData: function (url, onSuccess, onError) {
      var xhr = createXMLHttpRequest(onSuccess, onError);

      xhr.open('GET', url + '/data');
      xhr.send();
    },
    saveForm: function (data, onSuccess, onError) {
      var xhr = createXMLHttpRequest(onSuccess, onError);

      xhr.open('POST', window.constants.URL);
      xhr.send(data);
    }
  };
})();
