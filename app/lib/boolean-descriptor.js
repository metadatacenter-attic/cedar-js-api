/** @constructor */
function BooleanDescriptor(scope, nullable) {
  this.class = 'BooleanDescriptor';
  this.type = JSONSchema.TYPES.BOOLEAN;
  this.nullable = nullable;
  if (scope.hasOwnProperty(JSONSchema.ENUM)) {
    this.validValues = scope[JSONSchema.ENUM];
  }
}