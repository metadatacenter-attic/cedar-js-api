(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .controller('MainController', MainController);

  MainController.$inject = ['DataService', 'RestCallBuilder', 'UrlService', 'LoggerService'];

  function MainController(DataService, RestCallBuilder, UrlService, LoggerService) {

    var vm = this;

    DataService.init('pageTitle.index');

    DataService.loadRawSchema().then(function (loadedData) {
      vm.schemaRaw = loadedData.data;
      LoggerService.log("Raw schema loaded");
    });

    DataService.loadSchema().then(function (loadedData) {
      console.log(loadedData);
      vm.schema = loadedData.data;
      LoggerService.log("Schema loaded");

      var fb = new FieldBuilder();
      fb.initialize(vm.schema, "/definitions/templateField/asd");

      //var eb = new ElementBuilder();
      //eb.initialize(vm.schema, "/definitions/templateElement");

      //var tb = new TemplateBuilder();
      //tb.initialize(vm.schema, "/definitions/template");
    });


  }
})();