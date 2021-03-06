"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _event = require("../utils/dom/event");

var _use = (0, _utils.use)('overlay'),
    sfc = _use[0],
    bem = _use[1];

function preventTouchMove(event) {
  (0, _event.preventDefault)(event, true);
}

function Overlay(h, props, slots, ctx) {
  var style = (0, _extends2["default"])({
    zIndex: props.zIndex
  }, props.customStyle);
  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "directives": [{
      name: "show",
      value: props.visible
    }],
    "style": style,
    "class": [bem(), props.className],
    "on": {
      "touchmove": preventTouchMove
    }
  }, (0, _functional.inherit)(ctx, true)]))]);
}

Overlay.props = {
  zIndex: Number,
  className: null,
  visible: Boolean,
  customStyle: Object
};

var _default = sfc(Overlay);

exports["default"] = _default;