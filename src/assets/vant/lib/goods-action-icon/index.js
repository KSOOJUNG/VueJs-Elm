"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _use = (0, _utils.use)('goods-action-icon'),
    sfc = _use[0],
    bem = _use[1];

function GoodsActionIcon(h, props, slots, ctx) {
  function onClick(event) {
    (0, _functional.emit)(ctx, 'click', event);
    (0, _router.functionalRoute)(ctx);
  }

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "attrs": {
      "role": "button",
      "tabindex": "0"
    },
    "class": [bem(), 'van-hairline'],
    "on": {
      "click": onClick
    }
  }, (0, _functional.inherit)(ctx)]), [h(_icon["default"], {
    "class": [bem('icon'), props.iconClass],
    "attrs": {
      "tag": "div",
      "info": props.info,
      "name": props.icon
    }
  }), slots["default"] ? slots["default"]() : props.text]);
}

GoodsActionIcon.props = (0, _extends2["default"])({}, _router.routeProps, {
  text: String,
  icon: String,
  info: [String, Number],
  iconClass: null
});

var _default = sfc(GoodsActionIcon);

exports["default"] = _default;