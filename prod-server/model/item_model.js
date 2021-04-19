"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itemSchema = new _mongoose.default.Schema({
  name: String,
  price: Number,
  quantity: Number
});
itemSchema.set('timestamps', true);

var _default = _mongoose.default.model('food_item', itemSchema);

exports.default = _default;