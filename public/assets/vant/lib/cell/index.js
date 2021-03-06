"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _shared = require("./shared");

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _icon = _interopRequireDefault(require("../icon"));

var _use = (0, _utils.use)('cell'),
    sfc = _use[0],
    bem = _use[1];

function Cell(h, props, slots, ctx) {
  var icon = props.icon,
      size = props.size,
      title = props.title,
      label = props.label,
      value = props.value,
      isLink = props.isLink,
      arrowDirection = props.arrowDirection;
  var showTitle = slots.title || (0, _utils.isDef)(title);
  var showValue = slots["default"] || (0, _utils.isDef)(value);
  var showLabel = slots.label || (0, _utils.isDef)(label);
  var Label = showLabel && h("div", {
    "class": [bem('label'), props.labelClass]
  }, [slots.label ? slots.label() : label]);
  var Title = showTitle && h("div", {
    "class": [bem('title'), props.titleClass],
    "style": props.titleStyle
  }, [slots.title ? slots.title() : h("span", [title]), Label]);
  var Value = showValue && h("div", {
    "class": [bem('value', {
      alone: !slots.title && !title
    }), props.valueClass]
  }, [slots["default"] ? slots["default"]() : h("span", [value])]);
  var LeftIcon = slots.icon ? slots.icon() : icon && h(_icon["default"], {
    "class": bem('left-icon'),
    "attrs": {
      "name": icon
    }
  });
  var rightIconSlot = slots['right-icon'];
  var RightIcon = rightIconSlot ? rightIconSlot() : isLink && h(_icon["default"], {
    "class": bem('right-icon'),
    "attrs": {
      "name": arrowDirection ? "arrow-" + arrowDirection : 'arrow'
    }
  });

  function onClick(event) {
    (0, _functional.emit)(ctx, 'click', event);
    (0, _router.functionalRoute)(ctx);
  }

  var classes = {
    center: props.center,
    required: props.required,
    borderless: !props.border,
    clickable: isLink || props.clickable
  };

  if (size) {
    classes[size] = size;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem(classes),
    "on": {
      "click": onClick
    }
  }, (0, _functional.inherit)(ctx)]), [LeftIcon, Title, Value, RightIcon, slots.extra && slots.extra()]);
}

Cell.props = (0, _extends2["default"])({}, _shared.cellProps, _router.routeProps, {
  arrowDirection: String
});

var _default = sfc(Cell);

exports["default"] = _default;