"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _use = (0, _utils.use)('row'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      "default": 'div'
    },
    gutter: {
      type: [Number, String],
      "default": 0
    }
  },
  render: function render(h) {
    var _bem;

    var align = this.align,
        justify = this.justify;
    var flex = this.type === 'flex';
    var margin = "-" + Number(this.gutter) / 2 + "px";
    var style = this.gutter ? {
      marginLeft: margin,
      marginRight: margin
    } : {};
    return h(this.tag, {
      "style": style,
      "class": bem((_bem = {
        flex: flex
      }, _bem["align-" + align] = flex && align, _bem["justify-" + justify] = flex && justify, _bem))
    }, [this.slots()]);
  }
});

exports["default"] = _default;