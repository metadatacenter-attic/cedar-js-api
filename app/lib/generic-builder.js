/** @constructor */
function GenericBuilder() {
}

GenericBuilder.prototype.parsePointer = function (jsonPointer) {
  if (jsonPointer === '') {
    return [];
  }
  if (jsonPointer.charAt(0) == '#') {
    jsonPointer = jsonPointer.substring(1);
  }
  if (jsonPointer.charAt(0) !== '/') {
    throw new Error('Invalid JSON pointer: ' + jsonPointer);
  }
  return jsonPointer.substring(1).split(/\//);
};

GenericBuilder.prototype.getPointer = function (object, jsonPointer) {
  var path = this.parsePointer(jsonPointer);
  for (var i = 0; i < path.length; ++i) {
    var key = path[i];
    if (!(typeof object == 'object' && object.hasOwnProperty(key))) {
      throw new Error('Invalid reference in JSON pointer: ' + jsonPointer + " at part " + i + " : " + key);
    }
    object = object[key];
  }
  return object;
};

