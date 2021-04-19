"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnviroment = setEnviroment;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setEnviroment(app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = 'mongodb+srv://dharper:ggxUODk17jR4Y92r@cluster0.kien1.mongodb.net/compukitch-dev-db?retryWrites=true&w=majority';
  process.env.TOKEN_SECRET = 'my-development-secret';
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use((0, _morgan.default)('dev'));
  app.use((0, _cors.default)());
}

function setProdEnv(app) {
  console.log("##### running production #####");
  process.env.DB_URL = 'mongodb+srv://dharper:ggxUODk17jR4Y92r@cluster0.kien1.mongodb.net/compukitch-prod-db?retryWrites=true&w=majority';
  process.env.TOKEN_SECRET = 'my-production-secret';
  app.use((0, _cors.default)());
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
}