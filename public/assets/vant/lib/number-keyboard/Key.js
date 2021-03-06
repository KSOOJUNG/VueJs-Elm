"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _use = (0, _utils.use)('key'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    type: String,
    theme: Array,
    text: [String, Number]
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    className: function className() {
      var classNames = this.theme.slice(0);

      if (this.active) {
        classNames.push('active');
      }

      if (this.type) {
        classNames.push(this.type);
      }

      return bem(classNames);
    }
  },
  methods: {
    onFocus: function onFocus() {
      this.active = true;
    },
    onBlur: function onBlur(event) {
      this.active = false;
    },
    onClick: function onClick() {
      this.$emit('press', this.text, this.type);
    }
  },
  render: function render(h) {
    var onBlur = this.onBlur;
    return h("i", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": ['van-hairline', this.className],
      "on": {
        "click": this.onClick,
        "touchstart": this.onFocus,
        "touchmove": onBlur,
        "touchend": onBlur,
        "touchcancel": onBlur
      }
    }, [this.slots('default') || this.text]);
  }
});

exports["default"] = _default;