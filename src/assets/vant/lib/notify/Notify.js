"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _color = require("../utils/color");

var _functional = require("../utils/functional");

var _popup = require("../mixins/popup");

var _popup2 = _interopRequireDefault(require("../popup"));

var _use = (0, _utils.use)('notify'),
    sfc = _use[0],
    bem = _use[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background
  };
  return h(_popup2["default"], (0, _babelHelperVueJsxMergeProps["default"])([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "lockScroll": false
    },
    "style": style,
    "class": [bem(), props.className],
    "on": {
      "input": function input(value) {
        (0, _functional.emit)(ctx, 'input', value);
      },
      "click": function click(event) {
        (0, _functional.emit)(ctx, 'click', event);
      },
      "opened": function opened() {
        (0, _functional.emit)(ctx, 'opened');
      }
    }
  }, (0, _functional.inherit)(ctx)]), [props.message]);
}

Notify.props = (0, _extends2["default"])({}, _popup.PopupMixin.props, {
  className: null,
  message: [String, Number],
  color: {
    type: String,
    "default": _color.WHITE
  },
  background: {
    type: String,
    "default": _color.RED
  },
  duration: {
    type: Number,
    "default": 3000
  }
});

var _default = sfc(Notify);

exports["default"] = _default;