"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _color = require("../utils/color");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _cell = _interopRequireDefault(require("../cell"));

var _button = _interopRequireDefault(require("../button"));

var _radio = _interopRequireDefault(require("../radio"));

var _radioGroup = _interopRequireDefault(require("../radio-group"));

var _use = (0, _utils.use)('contact-list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function ContactList(h, props, slots, ctx) {
  var List = props.list.map(function (item, index) {
    var onClick = function onClick() {
      (0, _functional.emit)(ctx, 'input', item.id);
      (0, _functional.emit)(ctx, 'select', item, index);
    };

    return h(_cell["default"], {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "valueClass": bem('item-value')
      },
      "class": bem('item'),
      "scopedSlots": {
        "default": function _default() {
          return h(_radio["default"], {
            "attrs": {
              "name": item.id,
              "iconSize": 16,
              "checkedColor": _color.RED
            },
            "on": {
              "click": onClick
            }
          }, [h("div", {
            "class": bem('name')
          }, [item.name + "\uFF0C" + item.tel])]);
        },
        'right-icon': function rightIcon() {
          return h(_icon["default"], {
            "attrs": {
              "name": "edit"
            },
            "class": bem('edit'),
            "on": {
              "click": function click(event) {
                event.stopPropagation();
                (0, _functional.emit)(ctx, 'edit', item, index);
              }
            }
          });
        }
      },
      "on": {
        "click": onClick
      }
    });
  });
  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem()
  }, (0, _functional.inherit)(ctx)]), [h(_radioGroup["default"], {
    "attrs": {
      "value": props.value
    },
    "class": bem('group')
  }, [List]), h(_button["default"], {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.addText || t('addText')
    },
    "class": bem('add'),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'add');
      }
    }
  })]);
}

ContactList.props = {
  value: null,
  list: Array,
  addText: String
};

var _default2 = sfc(ContactList);

exports["default"] = _default2;