"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _utils2 = require("./utils");

var _event = require("../utils/dom/event");

var _touch = require("../mixins/touch");

var _relation = require("../mixins/relation");

var _bindEvent = require("../mixins/bind-event");

var _scroll = require("../utils/dom/scroll");

var _use = (0, _utils.use)('tabs'),
    sfc = _use[0],
    bem = _use[1];

var tabBem = (0, _utils.use)('tab')[1];

var _default = sfc({
  mixins: [_touch.TouchMixin, (0, _relation.ParentMixin)('vanTabs'), (0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    this.bindScrollEvent(isBind);
    bind(window, 'resize', this.setLine, true);
  })],
  model: {
    prop: 'active'
  },
  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    offsetTop: Number,
    swipeable: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    titleActiveColor: String,
    titleInactiveColor: String,
    border: {
      type: Boolean,
      "default": true
    },
    ellipsis: {
      type: Boolean,
      "default": true
    },
    lazyRender: {
      type: Boolean,
      "default": true
    },
    active: {
      type: [Number, String],
      "default": 0
    },
    type: {
      type: String,
      "default": 'line'
    },
    duration: {
      type: Number,
      "default": 0.3
    },
    swipeThreshold: {
      type: Number,
      "default": 4
    }
  },
  data: function data() {
    this.scrollEvent = false;
    return {
      position: '',
      curActive: null,
      lineStyle: {
        backgroundColor: this.color
      }
    };
  },
  computed: {
    // whether the nav is scrollable
    scrollable: function scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    wrapStyle: function wrapStyle() {
      switch (this.position) {
        case 'top':
          return {
            top: this.offsetTop + 'px',
            position: 'fixed'
          };

        case 'bottom':
          return {
            top: 'auto',
            bottom: 0
          };

        default:
          return null;
      }
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color,
        background: this.background
      };
    },
    trackStyle: function trackStyle() {
      if (this.animated) {
        return {
          transform: "translate3d(" + -1 * this.curActive * 100 + "%, 0, 0)",
          transitionDuration: this.duration + "s"
        };
      }
    }
  },
  watch: {
    active: function active(val) {
      if (val !== this.curActive) {
        this.correctActive(val);
      }
    },
    color: function color() {
      this.setLine();
    },
    children: function children() {
      this.correctActive(this.curActive || this.active);
      this.scrollIntoView();
      this.setLine();
    },
    curActive: function curActive() {
      this.scrollIntoView();
      this.setLine(); // scroll to correct position

      if (this.position === 'top' || this.position === 'bottom') {
        (0, _scroll.setScrollTop)(window, (0, _scroll.getElementTop)(this.$el) - this.offsetTop);
      }
    },
    sticky: function sticky(val) {
      this.bindScrollEvent(val);
    }
  },
  mounted: function mounted() {
    this.onShow();
  },
  activated: function activated() {
    this.onShow();
    this.setLine();
  },
  methods: {
    onShow: function onShow() {
      var _this = this;

      this.$nextTick(function () {
        _this.inited = true;

        _this.scrollIntoView(true);
      });
    },
    bindScrollEvent: function bindScrollEvent(isBind) {
      var sticky = this.sticky && isBind;

      if (this.scrollEvent !== sticky) {
        this.scrollEvent = sticky;
        this.scrollEl = this.scrollEl || (0, _scroll.getScrollEventTarget)(this.$el);
        (sticky ? _event.on : _event.off)(this.scrollEl, 'scroll', this.onScroll, true);
        this.onScroll();
      }
    },
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      var direction = this.direction,
          deltaX = this.deltaX,
          curActive = this.curActive;
      var minSwipeDistance = 50;
      /* istanbul ignore else */

      if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
        /* istanbul ignore else */
        if (deltaX > 0 && curActive !== 0) {
          this.setCurActive(curActive - 1);
        } else if (deltaX < 0 && curActive !== this.children.length - 1) {
          this.setCurActive(curActive + 1);
        }
      }
    },
    // adjust tab position
    onScroll: function onScroll() {
      var scrollTop = (0, _scroll.getScrollTop)(window) + this.offsetTop;
      var elTopToPageTop = (0, _scroll.getElementTop)(this.$el);
      var elBottomToPageTop = elTopToPageTop + this.$el.offsetHeight - this.$refs.wrap.offsetHeight;

      if (scrollTop > elBottomToPageTop) {
        this.position = 'bottom';
      } else if (scrollTop > elTopToPageTop) {
        this.position = 'top';
      } else {
        this.position = '';
      }

      var scrollParams = {
        scrollTop: scrollTop,
        isFixed: this.position === 'top'
      };
      this.$emit('scroll', scrollParams);
    },
    // update nav bar style
    setLine: function setLine() {
      var _this2 = this;

      var shouldAnimate = this.inited;
      this.$nextTick(function () {
        var tabs = _this2.$refs.tabs;

        if (!tabs || !tabs[_this2.curActive] || _this2.type !== 'line') {
          return;
        }

        var tab = tabs[_this2.curActive];
        var lineWidth = _this2.lineWidth,
            lineHeight = _this2.lineHeight;
        var width = (0, _utils.isDef)(lineWidth) ? lineWidth : tab.offsetWidth / 2;
        var left = tab.offsetLeft + tab.offsetWidth / 2;
        var lineStyle = {
          width: (0, _utils.suffixPx)(width),
          backgroundColor: _this2.color,
          transform: "translateX(" + left + "px) translateX(-50%)"
        };

        if (shouldAnimate) {
          lineStyle.transitionDuration = _this2.duration + "s";
        }

        if ((0, _utils.isDef)(lineHeight)) {
          var height = (0, _utils.suffixPx)(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        _this2.lineStyle = lineStyle;
      });
    },
    // correct the value of active
    correctActive: function correctActive(active) {
      active = +active;
      var exist = this.children.some(function (tab) {
        return tab.index === active;
      });
      var defaultActive = (this.children[0] || {}).index || 0;
      this.setCurActive(exist ? active : defaultActive);
    },
    setCurActive: function setCurActive(active) {
      active = this.findAvailableTab(active, active < this.curActive);

      if ((0, _utils.isDef)(active) && active !== this.curActive) {
        this.$emit('input', active);

        if (this.curActive !== null) {
          this.$emit('change', active, this.children[active].title);
        }

        this.curActive = active;
      }
    },
    findAvailableTab: function findAvailableTab(active, reverse) {
      var diff = reverse ? -1 : 1;
      var index = active;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    // emit event when clicked
    onClick: function onClick(index) {
      var _this$children$index = this.children[index],
          title = _this$children$index.title,
          disabled = _this$children$index.disabled;

      if (disabled) {
        this.$emit('disabled', index, title);
      } else {
        this.setCurActive(index);
        this.$emit('click', index, title);
      }
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var tabs = this.$refs.tabs;

      if (!this.scrollable || !tabs || !tabs[this.curActive]) {
        return;
      }

      var nav = this.$refs.nav;
      var active = tabs[this.curActive];
      var to = active.offsetLeft - (nav.offsetWidth - active.offsetWidth) / 2;
      (0, _utils2.scrollLeftTo)(nav, to, immediate ? 0 : this.duration);
    },
    // render title slot of child tab
    renderTitle: function renderTitle(el, index) {
      var _this3 = this;

      this.$nextTick(function () {
        var title = _this3.$refs.title[index];
        title.parentNode.replaceChild(el, title);
      });
    },
    getTabStyle: function getTabStyle(item, index) {
      var style = {};
      var color = this.color;
      var active = index === this.curActive;
      var isCard = this.type === 'card'; // theme color

      if (color) {
        if (!item.disabled && isCard && !active) {
          style.color = color;
        }

        if (!item.disabled && isCard && active) {
          style.backgroundColor = color;
        }

        if (isCard) {
          style.borderColor = color;
        }
      }

      var titleColor = active ? this.titleActiveColor : this.titleInactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      if (this.scrollable && this.ellipsis) {
        style.flexBasis = 88 / this.swipeThreshold + '%';
      }

      return style;
    }
  },
  render: function render(h) {
    var _this4 = this;

    var type = this.type,
        ellipsis = this.ellipsis,
        animated = this.animated,
        scrollable = this.scrollable;
    var Nav = this.children.map(function (tab, index) {
      return h("div", {
        "ref": "tabs",
        "refInFor": true,
        "attrs": {
          "role": "tab",
          "aria-selected": index === _this4.curActive
        },
        "class": tabBem({
          active: index === _this4.curActive,
          disabled: tab.disabled,
          complete: !ellipsis
        }),
        "style": _this4.getTabStyle(tab, index),
        "on": {
          "click": function click() {
            _this4.onClick(index);
          }
        }
      }, [h("span", {
        "ref": "title",
        "refInFor": true,
        "class": {
          'van-ellipsis': ellipsis
        }
      }, [tab.title])]);
    });
    var contentListeners;

    if (this.swipeable) {
      contentListeners = {
        touchstart: this.touchStart,
        touchmove: this.touchMove,
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchEnd
      };
    }

    return h("div", {
      "class": bem([type])
    }, [h("div", {
      "ref": "wrap",
      "style": this.wrapStyle,
      "class": [bem('wrap', {
        scrollable: scrollable
      }), {
        'van-hairline--top-bottom': type === 'line' && this.border
      }]
    }, [h("div", {
      "ref": "nav",
      "attrs": {
        "role": "tablist"
      },
      "class": bem('nav', [type]),
      "style": this.navStyle
    }, [this.slots('nav-left'), type === 'line' && h("div", {
      "class": bem('line'),
      "style": this.lineStyle
    }), Nav, this.slots('nav-right')])]), h("div", {
      "class": bem('content', {
        animated: animated
      }),
      "on": (0, _extends2["default"])({}, contentListeners)
    }, [animated ? h("div", {
      "class": bem('track'),
      "style": this.trackStyle
    }, [this.slots()]) : this.slots()])]);
  }
});

exports["default"] = _default;