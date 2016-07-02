/** @constructor */
function SchemaParsingContext(sourcePath, targetPath) {
  this.sourcePath = sourcePath;
  this.targetPath = targetPath;
}

SchemaParsingContext.prototype.getSourcePath = function () {
  return this.sourcePath;
};

SchemaParsingContext.prototype.getTargetPath = function () {
  return this.targetPath;
};

SchemaParsingContext.prototype.clone = function () {
  return new SchemaParsingContext(this.sourcePath.slice(0), this.targetPath.slice(0));
};

SchemaParsingContext.prototype.addSource = function (s) {
  this.sourcePath.push(s);
  return this;
};

SchemaParsingContext.prototype.addTarget = function (t) {
  this.targetPath.push(t);
  return this;
};