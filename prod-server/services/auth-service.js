"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;
exports.getUsername = getUsername;
exports.getUserId = getUserId;
exports.getUserRole = getUserRole;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _stringUtil = require("../utilities/string-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateJWT(user) {
  const full_name = _stringUtil.StringUtil.capitalize(user.first) + " " + _stringUtil.StringUtil.capitalize(user.last);

  const tokenData = {
    username: user.username,
    id: user._id,
    role: user.role,
    full_name: full_name
  };
  return _jsonwebtoken.default.sign({
    user: tokenData
  }, process.env.TOKEN_SECRET);
}

function requireLogin(req, res, next) {
  const token = decodeToken(req);

  if (!token) {
    return res.status(401).json({
      message: 'You must be logged in.'
    });
  }

  next();
}

function decodeToken(req) {
  const token = req.headers.authorization || req.headers['authorization'];

  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

function getUsername(req) {
  const token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.username;
}

function getUserId(req) {
  const token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.id;
}

function getUserRole(req) {
  const token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.role;
}