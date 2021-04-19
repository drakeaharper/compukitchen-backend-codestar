"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const submissionSchema = new _mongoose.default.Schema({
  month: String,
  workflow_status: String,
  user_id: String,
  month_total: Number,
  user_name: String
});
submissionSchema.set('timestamps', true);

var _default = _mongoose.default.model('submission', submissionSchema);

exports.default = _default;