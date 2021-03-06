"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('info'),
    sfc = _use[0],
    bem = _use[1];

function Info(h, props, slots, ctx) {
  if (!(0, _utils.isDef)(props.info) || props.info === '') {
    return;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem()
  }, (0, _functional.inherit)(ctx, true)]), [props.info]);
}

Info.props = {
  info: [String, Number]
};

var _default = sfc(Info);

exports["default"] = _default;