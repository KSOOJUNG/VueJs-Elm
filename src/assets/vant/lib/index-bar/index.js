"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _touch = require("../mixins/touch");

var _relation = require("../mixins/relation");

var _bindEvent = require("../mixins/bind-event");

var _color = require("../utils/color");

var _scroll = require("../utils/dom/scroll");

var _use = (0, _utils.use)('index-bar'),
    sfc = _use[0],
    bem = _use[1];

var _default2 = sfc({
  mixins: [_touch.TouchMixin, (0, _relation.ParentMixin)('vanIndexBar'), (0, _bindEvent.BindEventMixin)(function (bind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScrollEventTarget)(this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll);
  })],
  props: {
    sticky: {
      type: Boolean,
      "default": true
    },
    zIndex: {
      type: Number,
      "default": 1
    },
    highlightColor: {
      type: String,
      "default": _color.GREEN
    },
    indexList: {
      type: Array,
      "default": function _default() {
        var indexList = [];
        var charCodeOfA = 'A'.charCodeAt(0);

        for (var i = 0; i < 26; i++) {
          indexList.push(String.fromCharCode(charCodeOfA + i));
        }

        return indexList;
      }
    }
  },
  data: function data() {
    return {
      activeAnchorIndex: null
    };
  },
  computed: {
    highlightStyle: function highlightStyle() {
      var highlightColor = this.highlightColor;

      if (highlightColor) {
        /* istanbul ignore else */
        return {
          color: highlightColor
        };
      }
    }
  },
  methods: {
    onScroll: function onScroll() {
      if (!this.sticky) {
        return;
      }

      var scrollTop = (0, _scroll.getScrollTop)(this.scroller);
      var rects = this.children.map(function (item) {
        return {
          height: item.height,
          top: (0, _scroll.getElementTop)(item.$el)
        };
      });
      var active = this.getActiveAnchorIndex(scrollTop, rects);
      this.activeAnchorIndex = this.indexList[active];
      this.children.forEach(function (item, index) {
        if (index === active) {
          item.active = true;
          item.top = Math.max(0, rects[index].top - scrollTop);
        } else if (index === active - 1) {
          var activeItemTop = rects[active].top - scrollTop;
          item.active = activeItemTop > 0;
          item.top = activeItemTop - item.height;
        } else {
          item.active = false;
        }
      });
    },
    getActiveAnchorIndex: function getActiveAnchorIndex(scrollTop, rects) {
      for (var i = this.children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;

        if (scrollTop + prevHeight >= rects[i].top) {
          return i;
        }
      }

      return -1;
    },
    onClick: function onClick(event) {
      this.scrollToElement(event.target);
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction === 'vertical') {
        /* istanbul ignore else */
        if (event.cancelable) {
          event.preventDefault();
        }

        var _event$touches$ = event.touches[0],
            clientX = _event$touches$.clientX,
            clientY = _event$touches$.clientY;
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var index = target.dataset.index;
          /* istanbul ignore else */

          if (this.touchActiveIndex !== index) {
            this.touchActiveIndex = index;
            this.scrollToElement(target);
          }
        }
      }
    },
    scrollToElement: function scrollToElement(element, setActive) {
      var index = element.dataset.index;

      if (!index) {
        return;
      }

      var match = this.children.filter(function (item) {
        return String(item.index) === index;
      });

      if (match[0]) {
        match[0].scrollIntoView();
        this.$emit('select', match[0].index);
      }
    },
    onTouchEnd: function onTouchEnd() {
      this.active = null;
    }
  },
  render: function render(h) {
    var _this = this;

    return h("div", {
      "class": bem()
    }, [h("div", {
      "class": bem('sidebar'),
      "style": {
        zIndex: this.zIndex
      },
      "on": {
        "click": this.onClick,
        "touchstart": this.touchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [this.indexList.map(function (index) {
      return h("span", {
        "class": bem('index'),
        "style": index === _this.activeAnchorIndex ? _this.highlightStyle : null,
        "attrs": {
          "data-index": index
        }
      }, [index]);
    })]), this.slots('default')]);
  }
});

exports["default"] = _default2;