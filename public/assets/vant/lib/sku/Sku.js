"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _vue = _interopRequireDefault(require("vue"));

var _popup = _interopRequireDefault(require("../popup"));

var _toast = _interopRequireDefault(require("../toast"));

var _imagePreview = _interopRequireDefault(require("../image-preview"));

var _SkuHeader = _interopRequireDefault(require("./components/SkuHeader"));

var _SkuRow = _interopRequireDefault(require("./components/SkuRow"));

var _SkuRowItem = _interopRequireDefault(require("./components/SkuRowItem"));

var _SkuStepper = _interopRequireDefault(require("./components/SkuStepper"));

var _SkuMessages = _interopRequireDefault(require("./components/SkuMessages"));

var _SkuActions = _interopRequireDefault(require("./components/SkuActions"));

var _utils = require("../utils");

var _skuHelper = require("./utils/skuHelper");

var _constants = require("./constants");

/* eslint-disable camelcase */
var _use = (0, _utils.use)('sku'),
    sfc = _use[0];

var QUOTA_LIMIT = _constants.LIMIT_TYPE.QUOTA_LIMIT;

var _default2 = sfc({
  props: {
    sku: Object,
    goods: Object,
    quota: Number,
    value: Boolean,
    buyText: String,
    quotaUsed: Number,
    goodsId: [Number, String],
    hideStock: Boolean,
    hideQuotaText: Boolean,
    stepperTitle: String,
    getContainer: Function,
    customSkuValidator: Function,
    closeOnClickOverlay: Boolean,
    disableStepperInput: Boolean,
    resetStepperOnHide: Boolean,
    resetSelectedSkuOnHide: Boolean,
    initialSku: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    showSoldoutSku: {
      type: Boolean,
      "default": true
    },
    showAddCartBtn: {
      type: Boolean,
      "default": true
    },
    bodyOffsetTop: {
      type: Number,
      "default": 200
    },
    messageConfig: {
      type: Object,
      "default": function _default() {
        return {
          placeholderMap: {},
          uploadImg: function uploadImg() {
            return Promise.resolve();
          },
          uploadMaxSize: 5
        };
      }
    },
    customStepperConfig: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      selectedSku: {},
      selectedNum: 1,
      show: this.value
    };
  },
  watch: {
    show: function show(val) {
      this.$emit('input', val);

      if (!val) {
        var selectedSkuValues = (0, _skuHelper.getSelectedSkuValues)(this.sku.tree, this.selectedSku);
        this.$emit('sku-close', {
          selectedSkuValues: selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });

        if (this.resetStepperOnHide) {
          this.resetStepper();
        }

        if (this.resetSelectedSkuOnHide) {
          this.resetSelectedSku(this.skuTree);
        }
      }
    },
    value: function value(val) {
      this.show = val;
    },
    skuTree: function skuTree(val) {
      this.resetSelectedSku(val);
    }
  },
  computed: {
    skuGroupClass: function skuGroupClass() {
      return ['van-sku-group-container', 'van-hairline--bottom', {
        'van-sku-group-container--hide-soldout': !this.showSoldoutSku
      }];
    },
    bodyStyle: function bodyStyle() {
      if (this.$isServer) {
        return;
      } // header高度82px, sku actions高度50px，如果改动了样式自己传下bodyOffsetTop调整下


      var maxHeight = window.innerHeight - this.bodyOffsetTop;
      return {
        maxHeight: maxHeight + 'px'
      };
    },
    isSkuCombSelected: function isSkuCombSelected() {
      return (0, _skuHelper.isAllSelected)(this.sku.tree, this.selectedSku);
    },
    isSkuEmpty: function isSkuEmpty() {
      return Object.keys(this.sku).length === 0;
    },
    hasSku: function hasSku() {
      return !this.sku.none_sku;
    },
    selectedSkuComb: function selectedSkuComb() {
      if (!this.hasSku) {
        return {
          id: this.sku.collection_id,
          price: Math.round(this.sku.price * 100),
          stock_num: this.sku.stock_num
        };
      }

      if (this.isSkuCombSelected) {
        return (0, _skuHelper.getSkuComb)(this.sku.list, this.selectedSku);
      }

      return null;
    },
    price: function price() {
      if (this.selectedSkuComb) {
        return (this.selectedSkuComb.price / 100).toFixed(2);
      } // sku.price是一个格式化好的价格区间


      return this.sku.price;
    },
    skuTree: function skuTree() {
      return this.sku.tree || [];
    },
    imageList: function imageList() {
      var imageList = [this.goods.picture];

      if (this.skuTree.length > 0) {
        var treeItem = this.skuTree.filter(function (item) {
          return item.k_s === 's1';
        })[0] || {};

        if (!treeItem.v) {
          return;
        }

        treeItem.v.forEach(function (vItem) {
          var img = vItem.imgUrl || vItem.img_url;

          if (img) {
            imageList.push(img);
          }
        });
      }

      return imageList;
    }
  },
  created: function created() {
    var skuEventBus = new _vue["default"]();
    this.skuEventBus = skuEventBus;
    skuEventBus.$on('sku:close', this.onClose);
    skuEventBus.$on('sku:select', this.onSelect);
    skuEventBus.$on('sku:numChange', this.onNumChange);
    skuEventBus.$on('sku:previewImage', this.onPreviewImage);
    skuEventBus.$on('sku:overLimit', this.onOverLimit);
    skuEventBus.$on('sku:addCart', this.onAddCart);
    skuEventBus.$on('sku:buy', this.onBuy);
    this.resetStepper();
    this.resetSelectedSku(this.skuTree); // 组件初始化后的钩子，抛出skuEventBus

    this.$emit('after-sku-create', skuEventBus);
  },
  methods: {
    resetStepper: function resetStepper() {
      var skuStepper = this.$refs.skuStepper;
      var selectedNum = this.initialSku.selectedNum;
      var num = (0, _utils.isDef)(selectedNum) ? selectedNum : 1;

      if (skuStepper) {
        skuStepper.setCurrentNum(num);
      } else {
        this.selectedNum = num;
      }
    },
    resetSelectedSku: function resetSelectedSku(skuTree) {
      var _this = this;

      this.selectedSku = {}; // 重置 selectedSku

      skuTree.forEach(function (item) {
        _this.selectedSku[item.k_s] = _this.initialSku[item.k_s] || _constants.UNSELECTED_SKU_VALUE_ID;
      }); // 只有一个 sku 规格值时默认选中

      skuTree.forEach(function (item) {
        var key = item.k_s;
        var valueId = item.v[0].id;

        if (item.v.length === 1 && (0, _skuHelper.isSkuChoosable)(_this.sku.list, _this.selectedSku, {
          key: key,
          valueId: valueId
        })) {
          _this.selectedSku[key] = valueId;
        }
      });
    },
    getSkuMessages: function getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages: function getSkuCartMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getCartMessages() : {};
    },
    validateSkuMessages: function validateSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : '';
    },
    validateSku: function validateSku() {
      if (this.selectedNum === 0) {
        return '商品已经无法购买啦';
      }

      if (this.isSkuCombSelected) {
        return this.validateSkuMessages();
      } // 自定义sku校验


      if (this.customSkuValidator) {
        var err = this.customSkuValidator(this);
        if (err) return err;
      }

      return '请先选择商品规格';
    },
    onClose: function onClose() {
      this.show = false;
    },
    onSelect: function onSelect(skuValue) {
      var _extends2, _extends3;

      // 点击已选中的sku时则取消选中
      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id ? (0, _extends4["default"])({}, this.selectedSku, (_extends2 = {}, _extends2[skuValue.skuKeyStr] = _constants.UNSELECTED_SKU_VALUE_ID, _extends2)) : (0, _extends4["default"])({}, this.selectedSku, (_extends3 = {}, _extends3[skuValue.skuKeyStr] = skuValue.id, _extends3));
      this.$emit('sku-selected', {
        skuValue: skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onNumChange: function onNumChange(num) {
      this.selectedNum = num;
    },
    onPreviewImage: function onPreviewImage(indexImage) {
      var _this2 = this;

      var index = this.imageList.findIndex(function (image) {
        return image === indexImage;
      });
      var params = {
        index: index,
        imageList: this.imageList,
        indexImage: indexImage
      };
      this.$emit('open-preview', params);
      (0, _imagePreview["default"])({
        images: this.imageList,
        startPosition: index,
        onClose: function onClose() {
          _this2.$emit('close-preview', params);
        }
      });
    },
    onOverLimit: function onOverLimit(data) {
      var action = data.action,
          limitType = data.limitType,
          quota = data.quota,
          quotaUsed = data.quotaUsed;
      var handleOverLimit = this.customStepperConfig.handleOverLimit;

      if (handleOverLimit) {
        handleOverLimit(data);
        return;
      }

      if (action === 'minus') {
        (0, _toast["default"])('至少选择一件');
      } else if (action === 'plus') {
        if (limitType === QUOTA_LIMIT) {
          var msg = "\u9650\u8D2D" + quota + "\u4EF6";
          if (quotaUsed > 0) msg += "\uFF0C" + ("\u4F60\u5DF2\u8D2D\u4E70" + quotaUsed + "\u4EF6");
          (0, _toast["default"])(msg);
        } else {
          (0, _toast["default"])('库存不足');
        }
      }
    },
    onAddCart: function onAddCart() {
      this.onBuyOrAddCart('add-cart');
    },
    onBuy: function onBuy() {
      this.onBuyOrAddCart('buy-clicked');
    },
    onBuyOrAddCart: function onBuyOrAddCart(type) {
      var error = this.validateSku();

      if (error) {
        (0, _toast["default"])(error);
      } else {
        this.$emit(type, this.getSkuData());
      }
    },
    getSkuData: function getSkuData() {
      return {
        goodsId: this.goodsId,
        selectedNum: this.selectedNum,
        selectedSkuComb: this.selectedSkuComb,
        messages: this.getSkuMessages(),
        cartMessages: this.getSkuCartMessages()
      };
    }
  },
  render: function render(h) {
    var _this3 = this;

    if (this.isSkuEmpty) {
      return;
    }

    var sku = this.sku,
        goods = this.goods,
        price = this.price,
        skuEventBus = this.skuEventBus,
        selectedSku = this.selectedSku,
        selectedNum = this.selectedNum,
        stepperTitle = this.stepperTitle,
        hideQuotaText = this.hideQuotaText,
        selectedSkuComb = this.selectedSkuComb;
    var slotsProps = {
      price: price,
      selectedNum: selectedNum,
      skuEventBus: skuEventBus,
      selectedSku: selectedSku,
      selectedSkuComb: selectedSkuComb
    };

    var slots = function slots(name) {
      return _this3.slots(name, slotsProps);
    };

    var Header = slots('sku-header') || h(_SkuHeader["default"], {
      "attrs": {
        "sku": sku,
        "goods": goods,
        "skuEventBus": skuEventBus,
        "selectedSku": selectedSku
      }
    }, [slots('sku-header-price') || h("div", {
      "class": "van-sku__goods-price"
    }, [h("span", {
      "class": "van-sku__price-symbol"
    }, ["\uFFE5"]), h("span", {
      "class": "van-sku__price-num"
    }, [price])])]);
    var Group = slots('sku-group') || this.hasSku && h("div", {
      "class": this.skuGroupClass
    }, [this.skuTree.map(function (skuTreeItem) {
      return h(_SkuRow["default"], {
        "attrs": {
          "skuRow": skuTreeItem
        }
      }, [skuTreeItem.v.map(function (skuValue) {
        return h(_SkuRowItem["default"], {
          "attrs": {
            "skuList": sku.list,
            "skuValue": skuValue,
            "selectedSku": selectedSku,
            "skuEventBus": skuEventBus,
            "skuKeyStr": skuTreeItem.k_s
          }
        });
      })]);
    })]);
    var Stepper = slots('sku-stepper') || h(_SkuStepper["default"], {
      "ref": "skuStepper",
      "attrs": {
        "quota": this.quota,
        "hideStock": this.hideStock,
        "quotaUsed": this.quotaUsed,
        "skuEventBus": skuEventBus,
        "selectedNum": selectedNum,
        "selectedSku": selectedSku,
        "stepperTitle": stepperTitle,
        "skuStockNum": sku.stock_num,
        "hideQuotaText": hideQuotaText,
        "selectedSkuComb": selectedSkuComb,
        "disableStepperInput": this.disableStepperInput,
        "customStepperConfig": this.customStepperConfig
      },
      "on": {
        "change": function change(event) {
          _this3.$emit('stepper-change', event);
        }
      }
    });
    var Messages = slots('sku-messages') || h(_SkuMessages["default"], {
      "ref": "skuMessages",
      "attrs": {
        "goodsId": this.goodsId,
        "messageConfig": this.messageConfig,
        "messages": sku.messages
      }
    });
    var Actions = slots('sku-actions') || h(_SkuActions["default"], {
      "attrs": {
        "buyText": this.buyText,
        "skuEventBus": skuEventBus,
        "showAddCartBtn": this.showAddCartBtn
      }
    });
    return h(_popup["default"], {
      "attrs": {
        "position": "bottom",
        "getContainer": this.getContainer,
        "closeOnClickOverlay": this.closeOnClickOverlay
      },
      "class": "van-sku-container",
      "model": {
        value: _this3.show,
        callback: function callback($$v) {
          _this3.show = $$v;
        }
      }
    }, [Header, h("div", {
      "class": "van-sku-body",
      "style": this.bodyStyle
    }, [slots('sku-body-top'), Group, slots('extra-sku-group'), Stepper, Messages]), Actions]);
  }
});

exports["default"] = _default2;