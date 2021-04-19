"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _stringUtil = require("../../utilities/string-util");

var _user_model = _interopRequireDefault(require("../../model/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  const validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  const user = new _user_model.default({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last,
    role: req.body.role
  });
  user.save(error => {
    if (error) {
      console.log(error);

      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is taken'
        });
      }

      return res.status(500).json({
        message: error
      });
    }

    return res.status(201).json();
  });
}

function validateIndex(body) {
  let errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Username is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Password is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.first)) {
    errors += 'A first name is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.last)) {
    errors += 'A last name is required.';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}