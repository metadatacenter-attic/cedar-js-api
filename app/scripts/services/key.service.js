(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .service('KeyService', KeyService);

  KeyService.$inject = ['$rootScope', '$timeout'];

  function KeyService($rootScope, $timeout) {

    var service = {};

    service.event = function (e) {
    };

    return service;
  };
})();
