JSONUtil = {};

JSONUtil.isArray = function (a) {
  return a instanceof Array;
};

JSONUtil.isObject = function (o) {
  return typeof o == 'object';
};

JSONUtil.isObjectNotArray = function (o) {
  return JSONUtil.isObject(o) && !JSONUtil.isArray(o);
};