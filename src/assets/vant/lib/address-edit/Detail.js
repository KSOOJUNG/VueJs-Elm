"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _system = require("../utils/validate/system");

var _cell = _interopRequireDefault(require("../cell"));

var _field = _interopRequireDefault(require("../field"));

var _use = (0, _utils.use)('address-edit-detail'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var android = (0, _system.isAndroid)();

var _default = sfc({
  props: {
    value: String,
    error: Boolean,
    focused: Boolean,
    detailRows: Number,
    searchResult: Array,
    showSearchResult: Boolean
  },
  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    },
    onFinish: function onFinish() {
      this.$refs.field.blur();
    },
    renderFinish: function renderFinish() {
      var h = this.$createElement;
      var show = this.value && this.focused && android;

      if (show) {
        return h("div", {
          "class": bem('finish'),
          "on": {
            "click": this.onFinish
          }
        }, [t('complete')]);
      }
    },
    renderSearchResult: function renderSearchResult() {
      var _this = this;

      var h = this.$createElement;
      var searchResult = this.searchResult;
      var show = this.focused && searchResult && this.showSearchResult;

      if (show) {
        return searchResult.map(function (express) {
          return h(_cell["default"], {
            "key": express.name + express.address,
            "attrs": {
              "title": express.name,
              "label": express.address,
              "icon": "location-o",
              "clickable": true
            },
            "on": {
              "click": function click() {
                _this.onSelect(express);
              }
            }
          });
        });
      }
    }
  },
  render: function render(h) {
    return h(_cell["default"], {
      "class": bem()
    }, [h(_field["default"], {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "maxlength": "200",
        "value": this.value,
        "error": this.error,
        "label": t('label'),
        "placeholder": t('placeholder')
      },
      "ref": "field",
      "scopedSlots": {
        icon: this.renderFinish
      },
      "on": (0, _extends2["default"])({}, this.$listeners)
    }), this.renderSearchResult()]);
  }
});

exports["default"] = _default;