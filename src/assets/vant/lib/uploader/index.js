"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _utils2 = require("./utils");

var _icon = _interopRequireDefault(require("../icon"));

var _image = _interopRequireDefault(require("../image"));

var _use = (0, _utils.use)('uploader'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  inheritAttrs: false,
  model: {
    prop: 'fileList'
  },
  props: {
    fileList: Array,
    disabled: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    previewSize: [Number, String],
    previewImage: {
      type: Boolean,
      "default": true
    },
    accept: {
      type: String,
      "default": 'image/*'
    },
    resultType: {
      type: String,
      "default": 'dataUrl'
    },
    maxSize: {
      type: Number,
      "default": Number.MAX_VALUE
    },
    maxCount: {
      type: Number,
      "default": Number.MAX_VALUE
    }
  },
  computed: {
    detail: function detail() {
      return {
        name: this.$attrs.name || ''
      };
    }
  },
  methods: {
    onChange: function onChange(event) {
      var _this = this;

      var files = event.target.files;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead && !this.beforeRead(files, this.detail)) {
        this.resetInput();
        return;
      }

      var oversize = (0, _utils2.isOversize)(files, this.maxSize);

      if (Array.isArray(files)) {
        var maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(function (file) {
          return (0, _utils2.readFile)(file, _this.resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            return {
              file: file,
              content: contents[index]
            };
          });

          _this.onAfterRead(fileList, oversize);
        });
      } else {
        (0, _utils2.readFile)(files, this.resultType).then(function (content) {
          _this.onAfterRead({
            file: files,
            content: content
          }, oversize);
        });
      }
    },
    onAfterRead: function onAfterRead(files, oversize) {
      if (oversize) {
        this.$emit('oversize', files, this.detail);
        return;
      }

      this.resetInput();
      this.$emit('input', [].concat(this.fileList, (0, _utils2.toArray)(files)));

      if (this.afterRead) {
        this.afterRead(files, this.detail);
      }
    },
    onDelete: function onDelete(file, index) {
      var fileList = this.fileList.slice(0);
      fileList.splice(index, 1);
      this.$emit('input', fileList);
      this.$emit('delete', file);
    },
    resetInput: function resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },
    renderPreview: function renderPreview() {
      var _this2 = this;

      var h = this.$createElement;

      if (!this.previewImage) {
        return;
      }

      return this.fileList.map(function (file, index) {
        return h("div", {
          "class": bem('preview')
        }, [h(_image["default"], {
          "attrs": {
            "fit": "cover",
            "src": file.content,
            "width": _this2.previewSize,
            "height": _this2.previewSize
          },
          "class": bem('preview-image')
        }), h(_icon["default"], {
          "attrs": {
            "name": "delete"
          },
          "class": bem('preview-delete'),
          "on": {
            "click": function click() {
              _this2.onDelete(file, index);
            }
          }
        })]);
      });
    },
    renderUpload: function renderUpload() {
      var h = this.$createElement;

      if (this.fileList.length >= this.maxCount) {
        return;
      }

      var slot = this.slots();
      var Input = h("input", {
        "attrs": (0, _extends2["default"])({}, this.$attrs, {
          "type": "file",
          "accept": this.accept,
          "disabled": this.disabled
        }),
        "ref": "input",
        "class": bem('input'),
        "on": {
          "change": this.onChange
        }
      });

      if (slot) {
        return h("div", {
          "class": bem('input-wrapper')
        }, [slot, Input]);
      }

      var style;

      if (this.previewSize) {
        var size = (0, _utils.suffixPx)(this.previewSize);
        style = {
          width: size,
          height: size
        };
      }

      return h("div", {
        "class": bem('upload'),
        "style": style
      }, [h(_icon["default"], {
        "attrs": {
          "name": "plus"
        },
        "class": bem('upload-icon')
      }), this.uploadText && h("span", {
        "class": bem('upload-text')
      }, [this.uploadText]), Input]);
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem()
    }, [h("div", {
      "class": bem('wrapper')
    }, [this.renderPreview(), this.renderUpload()])]);
  }
});

exports["default"] = _default;