"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.getById = getById;
exports.deleteItem = deleteItem;
exports.update = update;
exports.create = create;

var _stringUtil = require("../../utilities/string-util");

var _item_model = _interopRequireDefault(require("../../model/item_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  _item_model.default.find({}, (error, food_items) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      food_items: food_items
    });
  });
}

function getById(req, res) {
  _item_model.default.findOne({
    _id: req.params.id
  }, (error, food_item) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      food_item: food_item
    });
  });
}

function deleteItem(req, res) {
  _item_model.default.deleteOne({
    _id: req.params.id
  }, (error, food_item) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json();
  });
}

function update(req, res) {
  const validation = validateItem(req.body.updated_item);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  _item_model.default.updateOne({
    _id: req.params.id
  }, req.body.updated_item, (error, food_item) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json();
  });
}

function create(req, res) {
  const validation = validateItem(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  const item = new _item_model.default({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  });
  item.save(error => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: error
      });
    }

    return res.status(201).json();
  });
}

function validateItem(body) {
  let errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.name)) {
    errors += 'Item name is required. ';
  }

  if (typeof Number.parseFloat(body.price) !== "number" && Number.parseFloat(body.price) !== NaN) {
    errors += 'Price must be a number. ';
  }

  if (typeof Number.parseFloat(body.quantity) !== "number" && Number.parseFloat(body.quantity) !== NaN) {
    errors += 'Quantity must be a numner. ';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}