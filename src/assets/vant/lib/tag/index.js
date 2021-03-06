"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _color = require("../utils/color");

var _use = (0, _utils.use)('tag'),
    sfc = _use[0],
    bem = _use[1];

var COLOR_MAP = {
  danger: _color.RED,
  primary: _color.BLUE,
  success: _color.GREEN
};

function Tag(h, props, slots, ctx) {
  var _style;

  var type = props.type,
      mark = props.mark,
      plain = props.plain,
      round = props.round,
      size = props.size;
  var color = props.color || type && COLOR_MAP[type] || _color.GRAY_DARK;
  var key = plain ? 'color' : 'backgroundColor';
  var style = (_style = {}, _style[key] = color, _style);

  if (props.textColor) {
    style.color = props.textColor;
  }

  var classes = {
    mark: mark,
    plain: plain,
    round: round
  };

  if (size) {
    classes[size] = size;
  }

  return h("span", (0, _babelHelperVueJsxMergeProps["default"])([{
    "style": style,
    "class": [bem(classes), {
      'van-hairline--surround': plain
    }]
  }, (0, _functional.inherit)(ctx, true)]), [slots["default"] && slots["default"]()]);
}

Tag.props = {
  size: String,
  type: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String
};

var _default = sfc(Tag);

exports["default"] = _default;