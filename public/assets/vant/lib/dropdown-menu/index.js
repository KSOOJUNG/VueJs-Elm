"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _color = require("../utils/color");

var _relation = require("../mixins/relation");

var _clickOutside = require("../mixins/click-outside");

var _use = (0, _utils.use)('dropdown-menu'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ParentMixin)('vanDropdownMenu'), (0, _clickOutside.ClickOutsideMixin)({
    event: 'click',
    method: 'onClickOutside'
  })],
  props: {
    overlay: {
      type: Boolean,
      "default": true
    },
    zIndex: {
      type: Number,
      "default": 10
    },
    duration: {
      type: Number,
      "default": 0.2
    },
    direction: {
      type: String,
      "default": 'down'
    },
    activeColor: {
      type: String,
      "default": _color.BLUE
    },
    closeOnClickOverlay: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      offset: 0
    };
  },
  methods: {
    toggleItem: function toggleItem(active) {
      var menu = this.$refs.menu;
      var rect = menu.getBoundingClientRect();

      if (this.direction === 'down') {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }

      this.children.forEach(function (item, index) {
        if (index === active) {
          item.toggle();
        } else if (item.showPopup) {
          item.hide(true);
        }
      });
    },
    onClickOutside: function onClickOutside() {
      this.children.forEach(function (item) {
        item.hide();
      });
    }
  },
  render: function render(h) {
    var _this = this;

    var Titles = this.children.map(function (item, index) {
      return h("div", {
        "attrs": {
          "role": "button",
          "tabindex": item.disabled ? -1 : 0
        },
        "class": bem('item', {
          disabled: item.disabled
        }),
        "on": {
          "click": function click() {
            if (!item.disabled) {
              _this.toggleItem(index);
            }
          }
        }
      }, [h("span", {
        "class": [bem('title', {
          down: item.showPopup === (_this.direction === 'down')
        }), item.titleClass],
        "style": {
          color: item.showPopup ? _this.activeColor : ''
        }
      }, [item.displayTitle])]);
    });
    return h("div", {
      "ref": "menu",
      "class": [bem(), 'van-hairline--top-bottom']
    }, [Titles, this.slots('default')]);
  }
});

exports["default"] = _default;