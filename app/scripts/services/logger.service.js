(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .service('LoggerService', LoggerService);

  LoggerService.$inject = [];

  function LoggerService() {

    var service = {};

    service.content = "";

    service.log = function (s) {
      service.content += s + "\n";
      //console.log(s);
    };

    service.logJson = function (s) {
      service.content += JSON.stringify(s) + "\n";
      //console.log(s);
    };

    return service;
  };
})();
