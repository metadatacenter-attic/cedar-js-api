/** @constructor */
function BooleanDescriptor(scope) {
  this.class = 'BooleanDescriptor';
  this.type = JSONSchema.TYPES.BOOLEAN;
  if (scope.hasOwnProperty(JSONSchema.ENUM)) {
    this.validValues = scope[JSONSchema.ENUM];
  }
}