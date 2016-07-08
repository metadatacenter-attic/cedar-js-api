/** @constructor */
function ObjectDescriptor(nullable) {
  this.class = 'ObjectDescriptor';
  this.type = JSONSchema.TYPES.OBJECT;
  this.nullable = nullable;
  this.fields = {};
  this.patternFields = {};
  this.requiredFieldsNameMap = {};
  this.requiredFields = [];
  Object.defineProperty(this, 'requiredFieldsNameMap', {enumerable: false});
}

ObjectDescriptor.prototype.addNamedDescriptor = function (name, descriptor) {
  this.fields[name] = descriptor;
};

ObjectDescriptor.prototype.addPatternDescriptor = function (pattern, descriptor) {
  this.patternFields[pattern] = descriptor;
};

ObjectDescriptor.prototype.addRequiredFields = function (fieldNameList) {
  for (var i in fieldNameList) {
    var name = fieldNameList[i];
    if (!this.requiredFieldsNameMap.hasOwnProperty(name)) {
      this.requiredFieldsNameMap[name] = true;
      this.requiredFields.push(name);
    }
  }
};

ObjectDescriptor.prototype.getRequiredFields = function () {
  return this.requiredFields;
};

ObjectDescriptor.prototype.getFields = function () {
  return this.fields;
};