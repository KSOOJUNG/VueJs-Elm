"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('cell-group'),
    sfc = _use[0],
    bem = _use[1];

function CellGroup(h, props, slots, ctx) {
  var Group = h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": [bem(), {
      'van-hairline--top-bottom': props.border
    }]
  }, (0, _functional.inherit)(ctx, true)]), [slots["default"] && slots["default"]()]);

  if (props.title) {
    return h("div", [h("div", {
      "class": bem('title')
    }, [props.title]), Group]);
  }

  return Group;
}

CellGroup.props = {
  title: String,
  border: {
    type: Boolean,
    "default": true
  }
};

var _default = sfc(CellGroup);

exports["default"] = _default;