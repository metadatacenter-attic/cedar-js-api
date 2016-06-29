(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider'];

  function config($routeProvider, $locationProvider, $translateProvider) {
    $routeProvider
        .when('/', {
          templateUrl : 'views/main.html',
          controller  : 'MainController',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }
})();