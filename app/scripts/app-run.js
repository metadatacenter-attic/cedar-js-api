(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .run(run);

  run.$inject = ['$rootScope', '$document', 'KeyService', 'LoggerService'];

  function run($rootScope, $document, KeyService, LoggerService) {

    var bindTo = $document;

    bindTo.bind('keydown', function (e) {
      var te = {};
      te.which = e.which;

      te.metaKey = e.metaKey;
      te.shiftKey = e.shiftKey;
      te.ctrlKey = e.ctrlKey;
      te.altKey = e.altKey;

      KeyService.event(te);
    });

    $rootScope.fluid = true;

    $rootScope.logger = LoggerService;
  }
})();