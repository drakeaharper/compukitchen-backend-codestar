"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _authRoutes = _interopRequireDefault(require("./api/auth/auth-routes.js"));

var _registerRoutes = _interopRequireDefault(require("./api/register/register-routes.js"));

var _userRoutes = _interopRequireDefault(require("./api/user/user-routes.js"));

var _foodItemRoutes = _interopRequireDefault(require("./api/food_items/food-item-routes.js"));

var _orderItemRoutes = _interopRequireDefault(require("./api/order/order-item-routes.js"));

var _submissionRoutes = _interopRequireDefault(require("./api/submission/submission-routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerRoutes(app) {
  app.use('/api', _authRoutes.default);
  app.use('/api', _registerRoutes.default);
  app.use('/api', _userRoutes.default);
  app.use('/api', _foodItemRoutes.default);
  app.use('/api', _orderItemRoutes.default);
  app.use('/api', _submissionRoutes.default);
}