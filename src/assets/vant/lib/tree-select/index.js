"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _use = (0, _utils.use)('tree-select'),
    sfc = _use[0],
    bem = _use[1];

function TreeSelect(h, props, slots, ctx) {
  var height = props.height,
      items = props.items,
      mainActiveIndex = props.mainActiveIndex,
      activeId = props.activeId;
  var selectedItem = items[mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem(),
    "style": {
      height: height + "px"
    }
  }, (0, _functional.inherit)(ctx)]), [h("div", {
    "class": bem('nav')
  }, [items.map(function (item, index) {
    return h("div", {
      "key": index,
      "class": ['van-ellipsis', bem('nav-item', {
        active: mainActiveIndex === index,
        disabled: item.disabled
      })],
      "on": {
        "click": function click() {
          if (!item.disabled) {
            (0, _functional.emit)(ctx, 'navclick', index);
          }
        }
      }
    }, [item.text]);
  })]), h("div", {
    "class": bem('content')
  }, [subItems.map(function (item) {
    return h("div", {
      "key": item.id,
      "class": ['van-ellipsis', bem('item', {
        active: activeId === item.id,
        disabled: item.disabled
      })],
      "on": {
        "click": function click() {
          if (!item.disabled) {
            (0, _functional.emit)(ctx, 'itemclick', item);
          }
        }
      }
    }, [item.text, activeId === item.id && h(_icon["default"], {
      "attrs": {
        "name": "checked",
        "size": "16px"
      },
      "class": bem('selected')
    })]);
  })])]);
}

TreeSelect.props = {
  items: Array,
  mainActiveIndex: Number,
  activeId: {
    type: [Number, String],
    "default": 0
  },
  height: {
    type: Number,
    "default": 300
  }
};

var _default = sfc(TreeSelect);

exports["default"] = _default;