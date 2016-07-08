/** @constructor */
function ArrayDescriptor(scope, nullable) {
  this.class = 'ArrayDescriptor';
  this.type = JSONSchema.TYPES.ARRAY;
  this.nullable = nullable;
  if (scope.hasOwnProperty(JSONSchema.MINITEMS)) {
    this.minItems = scope[JSONSchema.MINITEMS];
  }
  if (scope.hasOwnProperty(JSONSchema.MAXITEMS)) {
    this.maxItems = scope[JSONSchema.MAXITEMS];
  }
  if (scope.hasOwnProperty(JSONSchema.UNIQUEITEMS)) {
    this.uniqueItems = scope[JSONSchema.UNIQUEITEMS];
  }
  this.items = [];
}

ArrayDescriptor.prototype.push = function (d) {
  this.items.push(d);
};