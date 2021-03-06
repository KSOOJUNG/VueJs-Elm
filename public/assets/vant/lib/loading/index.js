"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _color = require("../utils/color");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('loading'),
    sfc = _use[0],
    bem = _use[1];

function LoadingIcon(h, props) {
  if (props.type === 'spinner') {
    var Spin = [];

    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }

    return Spin;
  }

  return h("svg", {
    "class": bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
}

function LoadingText(h, props, slots) {
  if (slots["default"]) {
    var style = props.textSize && {
      fontSize: (0, _utils.suffixPx)(props.textSize)
    };
    return h("span", {
      "class": bem('text'),
      "style": style
    }, [slots["default"]()]);
  }
}

function Loading(h, props, slots, ctx) {
  var color = props.color,
      size = props.size,
      type = props.type;
  var style = {
    color: color
  };

  if (size) {
    var iconSize = (0, _utils.suffixPx)(size);
    style.width = iconSize;
    style.height = iconSize;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem([type, {
      vertical: props.vertical
    }])
  }, (0, _functional.inherit)(ctx, true)]), [h("span", {
    "class": bem('spinner', type),
    "style": style
  }, [LoadingIcon(h, props)]), LoadingText(h, props, slots)]);
}

Loading.props = {
  size: [String, Number],
  textSize: [String, Number],
  vertical: Boolean,
  type: {
    type: String,
    "default": 'circular'
  },
  color: {
    type: String,
    "default": _color.GRAY
  }
};

var _default = sfc(Loading);

exports["default"] = _default;