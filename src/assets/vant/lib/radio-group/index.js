"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _use = (0, _utils.use)('radio-group'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ParentMixin)('vanRadio')],
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem(),
      "attrs": {
        "role": "radiogroup"
      }
    }, [this.slots()]);
  }
});

exports["default"] = _default;