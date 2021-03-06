"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _stringUtil = require("../../utilities/string-util.js");

var _user_model = _interopRequireDefault(require("../../model/user_model"));

var _authService = require("../../services/auth-service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  const validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  _user_model.default.findOne({
    username: req.body.username.toLowerCase()
  }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(401).json();
    }

    const passwordMatch = _user_model.default.passwordMatches(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json();
    }

    const token = (0, _authService.generateJWT)(user);
    return res.status(200).json({
      token: token
    });
  });
}

function validateIndex(body) {
  let errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors = +'Username is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors = +'Password is required.';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}