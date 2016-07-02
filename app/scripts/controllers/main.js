(function () {
  'use strict';

  angular
      .module('cedarJsApiApp')
      .controller('MainController', MainController);

  MainController.$inject = ['DataService', 'LoggerService'];

  function MainController(DataService, LoggerService) {

    var vm = this;

    DataService.init('pageTitle.index');

    DataService.loadRawSchema().then(function (loadedData) {
      vm.schemaRaw = loadedData.data;
      LoggerService.log("Raw schema loaded");
    });

    DataService.loadSchema().then(function (loadedData) {
      vm.schema = loadedData.data;
      LoggerService.log("Schema loaded");

      var fb = new FieldBuilder();
      fb.initialize(vm.schema, "/definitions/templateField");
      vm.descriptorField = fb.getDescriptor();

      //var cedarField = fb.buildEmptyField();
      //cedarField....

      var eb = new ElementBuilder();
      eb.initialize(vm.schema, "/definitions/templateElement");
      vm.descriptorElement = eb.getDescriptor();

      var tb = new TemplateBuilder();
      tb.initialize(vm.schema, "/definitions/template");
      vm.descriptorTemplate = tb.getDescriptor();

    });


  }
})();