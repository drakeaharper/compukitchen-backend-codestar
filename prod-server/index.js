"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes.js");

var _env = require("./config/env.js");

var _db = require("./config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
(0, _env.setEnviroment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || 8080 : 3000;
app.get('/', (req, res) => {
  res.json({
    message: `Welcome to the compukitchen api. Running in ${process.env.NODE_ENV} mode.`
  });
});
app.listen(PORT, () => {
  console.log(`CompuKitchen listening at http://localhost:${PORT}. Running in ${process.env.NODE_ENV} mode.`);
});