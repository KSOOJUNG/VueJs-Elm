"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../../utils");

var _functional = require("../../utils/functional");

var _button = _interopRequireDefault(require("../../button"));

var _use = (0, _utils.use)('sku-actions'),
    sfc = _use[0],
    bem = _use[1];

function SkuActions(h, props, slots, ctx) {
  var emit = function emit(name) {
    return function () {
      props.skuEventBus.$emit(name);
    };
  };

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem()
  }, (0, _functional.inherit)(ctx)]), [props.showAddCartBtn && h(_button["default"], {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "warning",
      "text": "加入购物车"
    },
    "on": {
      "click": emit('sku:addCart')
    }
  }), h(_button["default"], {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.buyText || '立即购买'
    },
    "on": {
      "click": emit('sku:buy')
    }
  })]);
}

SkuActions.props = {
  buyText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean
};

var _default = sfc(SkuActions);

exports["default"] = _default;