"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../../utils");

var _skuHelper = require("../utils/skuHelper");

var _use = (0, _utils.use)('sku-row-item'),
    sfc = _use[0];

var _default = sfc({
  props: {
    skuList: Array,
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedSku: Object
  },
  computed: {
    choosable: function choosable() {
      return (0, _skuHelper.isSkuChoosable)(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect() {
      if (this.choosable) {
        this.skuEventBus.$emit('sku:select', (0, _extends2["default"])({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    }
  },
  render: function render(h) {
    var choosed = this.skuValue.id === this.selectedSku[this.skuKeyStr];
    return h("span", {
      "class": ['van-sku-row__item', {
        'van-sku-row__item--active': choosed,
        'van-sku-row__item--disabled': !this.choosable
      }],
      "on": {
        "click": this.onSelect
      }
    }, [this.skuValue.name]);
  }
});

exports["default"] = _default;