"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _use = (0, _utils.use)('notice-bar'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    delay: {
      type: [String, Number],
      "default": 1
    },
    scrollable: {
      type: Boolean,
      "default": true
    },
    speed: {
      type: Number,
      "default": 50
    }
  },
  data: function data() {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: ''
    };
  },
  watch: {
    text: {
      handler: function handler() {
        var _this = this;

        this.$nextTick(function () {
          var _this$$refs = _this.$refs,
              wrap = _this$$refs.wrap,
              content = _this$$refs.content;

          if (!wrap || !content) {
            return;
          }

          var wrapWidth = wrap.getBoundingClientRect().width;
          var offsetWidth = content.getBoundingClientRect().width;

          if (_this.scrollable && offsetWidth > wrapWidth) {
            _this.wrapWidth = wrapWidth;
            _this.offsetWidth = offsetWidth;
            _this.duration = offsetWidth / _this.speed;
            _this.animationClass = bem('play');
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    onClickIcon: function onClickIcon() {
      if (this.mode === 'closeable') {
        this.showNoticeBar = false;
        this.$emit('close');
      }
    },
    onAnimationEnd: function onAnimationEnd() {
      var _this2 = this;

      this.firstRound = false;
      this.$nextTick(function () {
        _this2.duration = (_this2.offsetWidth + _this2.wrapWidth) / _this2.speed;
        _this2.animationClass = bem('play--infinite');
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    var slots = this.slots,
        mode = this.mode,
        leftIcon = this.leftIcon,
        onClickIcon = this.onClickIcon;
    var barStyle = {
      color: this.color,
      background: this.background
    };
    var contentStyle = {
      paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
      animationDelay: (this.firstRound ? this.delay : 0) + 's',
      animationDuration: this.duration + 's'
    };

    function LeftIcon() {
      var slot = slots('left-icon');

      if (slot) {
        return slot;
      }

      if (leftIcon) {
        return h(_icon["default"], {
          "class": bem('left-icon'),
          "attrs": {
            "name": leftIcon
          }
        });
      }
    }

    function RightIcon() {
      var slot = slots('right-icon');

      if (slot) {
        return slot;
      }

      var iconName = mode === 'closeable' ? 'cross' : mode === 'link' ? 'arrow' : '';

      if (iconName) {
        return h(_icon["default"], {
          "class": bem('right-icon'),
          "attrs": {
            "name": iconName
          },
          "on": {
            "click": onClickIcon
          }
        });
      }
    }

    return h("div", {
      "attrs": {
        "role": "alert"
      },
      "directives": [{
        name: "show",
        value: this.showNoticeBar
      }],
      "class": bem({
        wrapable: this.wrapable
      }),
      "style": barStyle,
      "on": {
        "click": function click() {
          _this3.$emit('click');
        }
      }
    }, [LeftIcon(), h("div", {
      "ref": "wrap",
      "class": bem('wrap'),
      "attrs": {
        "role": "marquee"
      }
    }, [h("div", {
      "ref": "content",
      "class": [bem('content'), this.animationClass, {
        'van-ellipsis': !this.scrollable && !this.wrapable
      }],
      "style": contentStyle,
      "on": {
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [this.slots() || this.text])]), RightIcon()]);
  }
});

exports["default"] = _default;