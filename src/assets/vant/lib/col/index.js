"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _use = (0, _utils.use)('col'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      "default": 'div'
    }
  },
  computed: {
    gutter: function gutter() {
      return this.$parent && Number(this.$parent.gutter) || 0;
    },
    style: function style() {
      var padding = this.gutter / 2 + "px";
      return this.gutter ? {
        paddingLeft: padding,
        paddingRight: padding
      } : {};
    }
  },
  render: function render(h) {
    var _bem;

    var span = this.span,
        offset = this.offset;
    return h(this.tag, {
      "class": bem((_bem = {}, _bem[span] = span, _bem["offset-" + offset] = offset, _bem)),
      "style": this.style
    }, [this.slots()]);
  }
});

exports["default"] = _default;