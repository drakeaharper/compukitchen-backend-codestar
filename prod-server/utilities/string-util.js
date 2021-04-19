"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringUtil = void 0;

class StringUtil {
  static isEmpty(value) {
    return !value || !value.trim();
  }

  static capitalize(word) {
    let capped = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    return capped;
  }

}

exports.StringUtil = StringUtil;