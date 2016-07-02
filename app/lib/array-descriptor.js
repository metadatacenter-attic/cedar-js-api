/** @constructor */
function ArrayDescriptor(scope) {
  this.class = 'ArrayDescriptor';
  this.type = JSONSchema.TYPES.ARRAY;
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