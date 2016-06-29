(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .service('UrlService', UrlService);

  UrlService.$inject = [];

  function UrlService() {

    var baseUrl = 'http://localhost:2006/';
    var service = {};

    service.loadSchema = function () {
      return baseUrl + 'resources/template_validator.json';
    };

    return service;

  };
})();