"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.noop = noop;
exports.isDef = isDef;
exports.isObj = isObj;
exports.get = get;
exports.isServer = exports.suffixPx = exports.use = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _use = require("./use");

exports.use = _use.use;

var _unit = require("./format/unit");

exports.suffixPx = _unit.suffixPx;
var isServer = _vue["default"].prototype.$isServer;
exports.isServer = isServer;

function noop() {}

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    result = isDef(result[key]) ? result[key] : '';
  });
  return result;
}