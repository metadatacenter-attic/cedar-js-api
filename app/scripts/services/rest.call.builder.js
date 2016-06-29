(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .service('RestCallBuilder', RestCallBuilder);

  RestCallBuilder.$inject = ['$http'];

  function RestCallBuilder($http) {

    var service = {};

    service.method = function (method, url, data, config) {
      var req = {
        "method": method,
        "url"   : url,
        "data"  : data
      };
      if (config != null) {
        for (var i in config) {
          req[i] = config[i];
        }
      }
      return $http(req);
    };

    service.get = function (url, config) {
      return this.method("GET", url, null, config);
    };
    /*
     service.delete = function (url) {
     return this.method("DELETE", url, null);
     };

     service.post = function (url, data) {
     return this.method("POST", url, data);
     };

     service.put = function (url, data) {
     return this.method("PUT", url, data);
     };
     */
    return service;
  };
})();
