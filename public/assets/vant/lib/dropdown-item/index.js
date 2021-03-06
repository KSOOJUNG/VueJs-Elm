"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _cell = _interopRequireDefault(require("../cell"));

var _icon = _interopRequireDefault(require("../icon"));

var _popup = _interopRequireDefault(require("../popup"));

var _relation = require("../mixins/relation");

var _use = (0, _utils.use)('dropdown-item'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ChildrenMixin)('vanDropdownMenu')],
  props: {
    value: null,
    title: String,
    options: Array,
    disabled: Boolean,
    titleClass: String
  },
  data: function data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false
    };
  },
  computed: {
    displayTitle: function displayTitle() {
      var _this = this;

      if (this.title) {
        return this.title;
      }

      var match = this.options.filter(function (option) {
        return option.value === _this.value;
      });
      return match.length ? match[0].text : '';
    }
  },
  methods: {
    toggle: function toggle(show) {
      this.showPopup = !this.showPopup;

      if (this.showPopup) {
        this.showWrapper = true;
      }
    },
    hide: function hide(skipTransition) {
      this.showPopup = false;

      if (skipTransition) {
        this.transition = false;
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    var _this$parent = this.parent,
        zIndex = _this$parent.zIndex,
        offset = _this$parent.offset,
        overlay = _this$parent.overlay,
        duration = _this$parent.duration,
        direction = _this$parent.direction,
        activeColor = _this$parent.activeColor,
        closeOnClickOverlay = _this$parent.closeOnClickOverlay;
    var Options = this.options.map(function (option) {
      var active = option.value === _this2.value;
      return h(_cell["default"], {
        "attrs": {
          "clickable": true,
          "title": option.text,
          "titleStyle": {
            color: active ? activeColor : ''
          }
        },
        "key": option.value,
        "on": {
          "click": function click() {
            _this2.showPopup = false;

            if (option.value !== _this2.value) {
              _this2.$emit('input', option.value);

              _this2.$emit('change', option.value);
            }
          }
        }
      }, [active && h(_icon["default"], {
        "class": bem('icon'),
        "attrs": {
          "color": activeColor,
          "name": "success"
        }
      })]);
    });

    var emit = function emit(eventName) {
      return function () {
        return _this2.$emit(eventName);
      };
    };

    var style = {
      zIndex: zIndex
    };

    if (direction === 'down') {
      style.top = offset + "px";
    } else {
      style.bottom = offset + "px";
    }

    return h("div", {
      "directives": [{
        name: "show",
        value: this.showWrapper
      }],
      "style": style,
      "class": bem([direction])
    }, [h(_popup["default"], {
      "attrs": {
        "position": direction === 'down' ? 'top' : 'bottom',
        "duration": this.transition ? duration : 0,
        "overlay": overlay,
        "closeOnClickOverlay": closeOnClickOverlay,
        "overlayStyle": {
          position: 'absolute'
        }
      },
      "class": bem('content'),
      "on": {
        "open": emit('open'),
        "opened": emit('opened'),
        "close": emit('close'),
        "closed": function closed() {
          _this2.transition = true;
          _this2.showWrapper = false;

          _this2.$emit('closed');
        }
      },
      "model": {
        value: _this2.showPopup,
        callback: function callback($$v) {
          _this2.showPopup = $$v;
        }
      }
    }, [Options, this.slots('default')])]);
  }
});

exports["default"] = _default;