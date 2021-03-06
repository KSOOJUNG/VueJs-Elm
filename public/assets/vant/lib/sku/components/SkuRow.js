"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../../utils");

var _functional = require("../../utils/functional");

var _use = (0, _utils.use)('sku-row'),
    sfc = _use[0],
    bem = _use[1];

function SkuRow(h, props, slots, ctx) {
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem()
  }, (0, _functional.inherit)(ctx)]), [h("div", {
    "class": bem('title')
  }, [props.skuRow.k, "\uFF1A"]), slots["default"] && slots["default"]()]);
}

SkuRow.props = {
  skuRow: Object
};

var _default = sfc(SkuRow);

exports["default"] = _default;