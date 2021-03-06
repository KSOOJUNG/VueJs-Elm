"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../utils");

var _checkbox = require("../mixins/checkbox");

var _use = (0, _utils.use)('radio'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _checkbox.CheckboxMixin)({
    bem: bem,
    role: 'radio',
    parent: 'vanRadio'
  })],
  computed: {
    currentValue: {
      get: function get() {
        return this.parent ? this.parent.value : this.value;
      },
      set: function set(val) {
        (this.parent || this).$emit('input', val);
      }
    },
    checked: function checked() {
      return this.currentValue === this.name;
    }
  },
  methods: {
    onClickIcon: function onClickIcon() {
      if (!this.isDisabled) {
        this.currentValue = this.name;
      }
    },
    onClickLabel: function onClickLabel() {
      if (!this.isDisabled && !this.labelDisabled) {
        this.currentValue = this.name;
      }
    }
  }
});

exports["default"] = _default;