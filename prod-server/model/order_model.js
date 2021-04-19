"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderSchema = new _mongoose.default.Schema({
  items: [],
  total_cost: String,
  user_id: String
});
orderSchema.set('timestamps', true);

var _default = _mongoose.default.model('order', orderSchema);

exports.default = _default;