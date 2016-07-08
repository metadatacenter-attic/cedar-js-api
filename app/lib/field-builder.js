/** @constructor */
function FieldBuilder() {

}

FieldBuilder.prototype = new GenericBuilder();

FieldBuilder.prototype.buildEmptyField = function () {
  var field = this.buildFromDescriptor(this.descriptor, true);
  return field;
};

FieldBuilder.prototype.buildFromDescriptor = function (desc, isMandatory) {
  //console.log("Build from descriptor:" + isMandatory);
  if (desc instanceof ObjectDescriptor) {
    var obj = {};
    for (var fieldName in desc.fields) {
      var fieldIsMandatory = desc.requiredFields.indexOf(fieldName) != -1;
      if (fieldIsMandatory) {
        var fieldValue = this.buildFromDescriptor(desc.fields[fieldName], fieldIsMandatory);
        obj[fieldName] = fieldValue;
      }
    }
    return obj;
  } else if (desc instanceof StringDescriptor) {
    var value = null;
    if (isMandatory) {
      if (desc.hasOwnProperty('validValues')) {
        value = desc['validValues'][0];
      } else {
        if (desc.hasOwnProperty('nullable') && desc['nullable']) {
          return null;
        } else if (desc.hasOwnProperty('format')) {
          console.log(desc);
          throw new Error('Cannot handle non-empty values for formatted string!');
        } else {
          value = " ";
        }
      }
    }
    return value;
  } else if (desc instanceof BooleanDescriptor) {
    var value = null;
    if (isMandatory) {
      if (desc.hasOwnProperty('validValues')) {
        value = desc['validValues'][0];
      } else {
        value = false;
      }
    }
    return value;
  } else if (desc instanceof ArrayDescriptor) {
    var obj = [];
    var minItems = 0;
    if (desc.hasOwnProperty('minItems')) {
      minItems = desc['minItems'];
    }
    for (var i = 0; i < minItems; i++) {
      obj[i] = this.buildFromDescriptor(desc.items[i % desc.items.length], true);
    }
    return obj;
  }
}

