/** @constructor */
function StringDescriptor(scope, nullable) {
  this.class = 'StringDescriptor';
  this.type = JSONSchema.TYPES.STRING;
  this.nullable = nullable;
  if (scope.hasOwnProperty(JSONSchema.ENUM)) {
    this.validValues = scope[JSONSchema.ENUM];
  }
  if (scope.hasOwnProperty(JSONSchema.MINLENGTH) && scope[JSONSchema.MINLENGTH] == 1) {
    this.valueMandatory = true;
  }
  if (scope.hasOwnProperty(JSONSchema.FORMAT)) {
    // can be 'uri', 'date-time'
    this.format = scope[JSONSchema.FORMAT];
  }
}