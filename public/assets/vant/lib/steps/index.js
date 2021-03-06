"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _color = require("../utils/color");

var _use = (0, _utils.use)('steps'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    active: Number,
    inactiveIcon: String,
    direction: {
      type: String,
      "default": 'horizontal'
    },
    activeColor: {
      type: String,
      "default": _color.GREEN
    },
    activeIcon: {
      type: String,
      "default": 'checked'
    }
  },
  data: function data() {
    return {
      steps: []
    };
  },
  render: function render(h) {
    return h("div", {
      "class": bem([this.direction])
    }, [h("div", {
      "class": bem('items')
    }, [this.slots()])]);
  }
});

exports["default"] = _default;