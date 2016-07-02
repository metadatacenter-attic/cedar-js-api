/** @constructor */
function ObjectDescriptor() {
  this.class = 'ObjectDescriptor';
  this.fields = {};
  this.requiredFieldsNameMap = {};
  this.requiredFields = [];
  Object.defineProperty(this, 'requiredFieldsNameMap', {enumerable: false});
}

ObjectDescriptor.prototype.addNamedDescriptor = function (name, descriptor) {
  this.fields[name] = descriptor;
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