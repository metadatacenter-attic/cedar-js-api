(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .service('DataService', DataService);

  DataService.$inject = ['RestCallBuilder', 'UrlService', '$rootScope', '$translate'];

  function DataService(RestCallBuilder, UrlService, $rootScope, $translate) {

    var service = {};

    service.init = function (pageTitleKey) {
      $rootScope.pageTitle = $translate.instant(pageTitleKey);
    };

    service.loadRawSchema = function () {
      return RestCallBuilder.get(UrlService.loadSchema(), {"transformResponse": []});
    };

    service.loadSchema = function () {
      return RestCallBuilder.get(UrlService.loadSchema());
    };

    return service;
  };
})();
