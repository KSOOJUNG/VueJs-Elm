"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _popup = require("../mixins/popup");

var _use = (0, _utils.use)('popup'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_popup.PopupMixin],
  props: {
    transition: String,
    duration: {
      type: Number,
      "default": null
    },
    position: {
      type: String,
      "default": 'center'
    },
    overlay: {
      type: Boolean,
      "default": true
    },
    closeOnClickOverlay: {
      type: Boolean,
      "default": true
    }
  },
  render: function render(h) {
    var _this = this,
        _bem;

    if (!this.shouldRender) {
      return;
    }

    var position = this.position,
        duration = this.duration;

    var emit = function emit(eventName) {
      return function (event) {
        return _this.$emit(eventName, event);
      };
    };

    var transitionName = this.transition || (position === 'center' ? 'van-fade' : "van-popup-slide-" + position);
    var style = {};

    if ((0, _utils.isDef)(duration)) {
      style.transitionDuration = duration + "s";
    }

    return h("transition", {
      "attrs": {
        "name": transitionName
      },
      "on": {
        "afterEnter": emit('opened'),
        "afterLeave": emit('closed')
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "style": style,
      "class": bem((_bem = {}, _bem[position] = position, _bem)),
      "on": {
        "click": emit('click')
      }
    }, [this.slots()])]);
  }
});

exports["default"] = _default;