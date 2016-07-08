/** @constructor */
function GenericBuilder() {
  this.globalSchema = null;
  this.descriptor = null;
}

GenericBuilder.prototype.getDescriptor = function () {
  return this.descriptor;
};

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

GenericBuilder.prototype.getPointer = function (obj, jsonPointer) {
  var path = this.parsePointer(jsonPointer);
  for (var i = 0; i < path.length; ++i) {
    var key = path[i];
    if (!(JSONUtil.isObject(obj) && obj.hasOwnProperty(key))) {
      throw new Error('Invalid reference in JSON pointer: ' + jsonPointer + " at part " + i + " : " + key);
    }
    obj = obj[key];
  }
  return obj;
};

GenericBuilder.prototype.initialize = function (schemaObject, jsonPointer) {
  var rootName = jsonPointer;
  this.globalSchema = schemaObject;
  var currentRoot = this.getPointer(schemaObject, jsonPointer);
  var parsingContext = new SchemaParsingContext([rootName], [rootName]);
  this.descriptor = this.buildObjectDescriptor(currentRoot, parsingContext);
};

GenericBuilder.prototype.buildObjectDescriptor = function (schema, parsingContext) {
  //console.log("-------------------------------------buildObjectDescriptor--------------------------------------------");
  //console.log(parsingContext.getSourcePath());
  //console.log(parsingContext.getTargetPath());
  //console.log(schema);

  var newParsingContext = parsingContext.clone();

  if (schema.hasOwnProperty(JSONSchema.REF)) {
    var subSchema = this.getPointer(this.globalSchema, schema[JSONSchema.REF]);
    newParsingContext.addSource(JSONSchema.REF);
    return this.buildObjectDescriptor(subSchema, newParsingContext);
  } else if (schema.hasOwnProperty(JSONSchema.ALLOF)) {
    var objectDescriptor = new ObjectDescriptor(false);
    var schemaList = schema[JSONSchema.ALLOF];
    var descriptorList = [];
    for (var i = 0; i < schemaList.length; i++) {
      newParsingContext = parsingContext.clone().addSource(JSONSchema.ALLOF).addSource(i);
      var o = schemaList[i];
      descriptorList.push(this.buildObjectDescriptor(o, newParsingContext));
    }
    for (var i = 0; i < descriptorList.length; i++) {
      var od = descriptorList[i];
      var fields = od.getFields();
      for (var pn in fields) {
        objectDescriptor.addNamedDescriptor(pn, fields[pn]);
      }
      objectDescriptor.addRequiredFields(od.getRequiredFields());
    }
    return objectDescriptor;
  } else if (schema.hasOwnProperty(JSONSchema.TYPE)) {
    var pType = schema[JSONSchema.TYPE];
    var nullable = false;
    if (JSONUtil.isArray(pType)) {
      var realType = null;
      for (var i = 0; i < pType.length; i++) {
        var oneType = pType[i];
        if (oneType === 'null') {
          nullable = true;
        } else {
          realType = oneType;
        }
      }
      pType = realType;
    }
    if (pType == JSONSchema.TYPES.STRING) {
      return new StringDescriptor(schema, nullable);
    } else if (pType == JSONSchema.TYPES.BOOLEAN) {
      return new BooleanDescriptor(schema, nullable);
    } else if (pType == JSONSchema.TYPES.ARRAY) {
      var arrayDescriptor = new ArrayDescriptor(schema, nullable);
      var itemsOrItem = schema[JSONSchema.ITEMS];
      if (JSONUtil.isArray(itemsOrItem)) {
        for (var i = 0; i < itemsOrItem.length; i++) {
          newParsingContext = parsingContext.clone().addSource(JSONSchema.ITEMS).addSource(i);
          arrayDescriptor.push(this.buildObjectDescriptor(itemsOrItem[i], newParsingContext));
        }
      } else if (JSONUtil.isObjectNotArray(itemsOrItem)) {
        newParsingContext = parsingContext.clone().addSource(JSONSchema.ITEMS);
        arrayDescriptor.push(this.buildObjectDescriptor(itemsOrItem, newParsingContext));
      }
      return arrayDescriptor;
    } else if (pType == JSONSchema.TYPES.OBJECT) {
      var objectDescriptor = new ObjectDescriptor(nullable);
      if (schema.hasOwnProperty(JSONSchema.PROPERTIES)) {
        var properties = schema[JSONSchema.PROPERTIES];
        for (var pName in properties) {
          var p = properties[pName];
          newParsingContext = parsingContext.clone().addSource(JSONSchema.PROPERTIES).addSource(pName);
          var newProp = this.buildObjectDescriptor(p, newParsingContext);
          objectDescriptor.addNamedDescriptor(pName, newProp);
        }
        if (schema.hasOwnProperty(JSONSchema.REQUIRED)) {
          objectDescriptor.addRequiredFields(schema[JSONSchema.REQUIRED]);
        }
      }
      if (schema.hasOwnProperty(JSONSchema.PATTERNPROPERTIES)) {
        var patternProperties = schema[JSONSchema.PATTERNPROPERTIES];
        for (var pattern in patternProperties) {
          var p = patternProperties[pattern];
          newParsingContext = parsingContext.clone().addSource(JSONSchema.PATTERNPROPERTIES).addSource(pattern);
          var newProp = this.buildObjectDescriptor(p, newParsingContext);
          objectDescriptor.addPatternDescriptor(pattern, newProp);
        }
      }
      return objectDescriptor;
    }
  } else {
    throw new Error('Invalid JSON Schema! Missing "type" field');
  }
};