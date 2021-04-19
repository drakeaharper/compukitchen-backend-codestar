"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.update = update;

var _user_model = _interopRequireDefault(require("../../model/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  _user_model.default.find({}, (error, user) => {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    return res.status(200).json({
      user: user
    });
  });
}

function show(req, res) {
  _user_model.default.findOne({
    _id: req.params.id
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    return res.status(200).json({
      user: user
    });
  });
}

function update(req, res) {
  _user_model.default.findOne({
    _id: req.params.id
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    return res.status(200).json({
      user: user
    });
  });
}