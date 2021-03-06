"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('goods-action'),
    sfc = _use[0],
    bem = _use[1];

function GoodsAction(h, props, slots, ctx) {
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem({
      'safe-area-inset-bottom': props.safeAreaInsetBottom
    })
  }, (0, _functional.inherit)(ctx, true)]), [slots["default"] && slots["default"]()]);
}

GoodsAction.props = {
  safeAreaInsetBottom: Boolean
};

var _default = sfc(GoodsAction);

exports["default"] = _default;