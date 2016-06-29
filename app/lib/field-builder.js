/** @constructor */
function FieldBuilder() {

}

FieldBuilder.prototype = new GenericBuilder();

FieldBuilder.prototype.initialize = function(schemaObject, jsonPointer) {
  console.log(jsonPointer);
  var path = this.parsePointer(jsonPointer);
  console.log(path);
  var schemaRoot = this.getPointer(schemaObject, jsonPointer);
  console.log(schemaRoot);
};