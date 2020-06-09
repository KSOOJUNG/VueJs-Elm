"use strict";

exports.__esModule = true;
exports.getScrollEventTarget = getScrollEventTarget;
exports.getScrollTop = getScrollTop;
exports.setScrollTop = setScrollTop;
exports.getRootScrollTop = getRootScrollTop;
exports.getElementTop = getElementTop;
exports.getVisibleHeight = getVisibleHeight;

// get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
function getScrollEventTarget(element, rootParent) {
  if (rootParent === void 0) {
    rootParent = window;
  }

  var node = element;

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== rootParent) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (overflowY === 'scroll' || overflowY === 'auto') {
      return node;
    }

    node = node.parentNode;
  }

  return rootParent;
}

function getScrollTop(element) {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}

function setScrollTop(element, value) {
  'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
}

function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
} // get distance from element top to page top


function getElementTop(element) {
  return (element === window ? 0 : element.getBoundingClientRect().top) + getScrollTop(window);
}

function getVisibleHeight(element) {
  return element === window ? element.innerHeight : element.getBoundingClientRect().height;
}