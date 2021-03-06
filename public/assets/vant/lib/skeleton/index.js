"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _use = (0, _utils.use)('skeleton'),
    sfc = _use[0],
    bem = _use[1];

var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';

function Skeleton(h, props, slots, ctx) {
  if (!props.loading) {
    return slots["default"] && slots["default"]();
  }

  function Title() {
    if (props.title) {
      return h("h3", {
        "class": bem('title'),
        "style": {
          width: (0, _utils.suffixPx)(props.titleWidth)
        }
      });
    }
  }

  function Rows() {
    var Rows = [];
    var rowWidth = props.rowWidth;

    function getRowWidth(index) {
      if (rowWidth === DEFAULT_ROW_WIDTH && index === props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    }

    for (var i = 0; i < props.row; i++) {
      Rows.push(h("div", {
        "class": bem('row'),
        "style": {
          width: (0, _utils.suffixPx)(getRowWidth(i))
        }
      }));
    }

    return Rows;
  }

  function Avatar() {
    if (props.avatar) {
      var size = (0, _utils.suffixPx)(props.avatarSize);
      return h("div", {
        "class": bem('avatar', props.avatarShape),
        "style": {
          width: size,
          height: size
        }
      });
    }
  }

  return h("div", (0, _babelHelperVueJsxMergeProps["default"])([{
    "class": bem({
      animate: props.animate
    })
  }, (0, _functional.inherit)(ctx)]), [Avatar(), h("div", {
    "class": bem('content')
  }, [Title(), Rows()])]);
}

Skeleton.props = {
  row: Number,
  title: Boolean,
  avatar: Boolean,
  loading: {
    type: Boolean,
    "default": true
  },
  animate: {
    type: Boolean,
    "default": true
  },
  avatarSize: {
    type: String,
    "default": '32px'
  },
  avatarShape: {
    type: String,
    "default": 'round'
  },
  titleWidth: {
    type: [Number, String],
    "default": '40%'
  },
  rowWidth: {
    type: [Number, String, Array],
    "default": DEFAULT_ROW_WIDTH
  }
};

var _default = sfc(Skeleton);

exports["default"] = _default;