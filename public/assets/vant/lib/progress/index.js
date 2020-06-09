"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _color = require("../utils/color");

var _use = (0, _utils.use)('progress'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    inactive: Boolean,
    pivotText: String,
    pivotColor: String,
    percentage: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      "default": true
    },
    color: {
      type: String,
      "default": _color.BLUE
    },
    textColor: {
      type: String,
      "default": _color.WHITE
    }
  },
  data: function data() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },
  mounted: function mounted() {
    this.getWidth();
  },
  watch: {
    showPivot: function showPivot() {
      this.getWidth();
    },
    pivotText: function pivotText() {
      this.getWidth();
    }
  },
  methods: {
    getWidth: function getWidth() {
      var _this = this;

      this.$nextTick(function () {
        _this.progressWidth = _this.$el.offsetWidth;
        _this.pivotWidth = _this.$refs.pivot ? _this.$refs.pivot.offsetWidth : 0;
      });
    }
  },
  render: function render(h) {
    var pivotText = this.pivotText,
        percentage = this.percentage;
    var text = (0, _utils.isDef)(pivotText) ? pivotText : percentage + '%';
    var showPivot = this.showPivot && text;
    var background = this.inactive ? '#cacaca' : this.color;
    var pivotStyle = {
      color: this.textColor,
      background: this.pivotColor || background
    };
    var portionStyle = {
      background: background,
      width: (this.progressWidth - this.pivotWidth) * percentage / 100 + 'px'
    };
    return h("div", {
      "class": bem()
    }, [h("span", {
      "class": bem('portion', {
        'with-pivot': showPivot
      }),
      "style": portionStyle
    }, [showPivot && h("span", {
      "ref": "pivot",
      "style": pivotStyle,
      "class": bem('pivot')
    }, [text])])]);
  }
});

exports["default"] = _default;