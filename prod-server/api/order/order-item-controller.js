"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkout = checkout;
exports.user_orders = user_orders;

var _order_model = _interopRequireDefault(require("../../model/order_model"));

var _item_model = _interopRequireDefault(require("../../model/item_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkout(req, res) {
  let cart = [];
  Object.keys(req.body.shopping_cart).forEach(key => {
    cart.push(req.body.shopping_cart[key]);
  });
  const order = new _order_model.default({
    items: cart,
    total_cost: req.body.total_cost,
    user_id: req.body.user_id
  });
  let errors = '';
  cart.forEach(item => {
    _item_model.default.findOne({
      _id: item.id
    }, (error, bought_item) => {
      if (error) {
        errors += `Unable to find ${item.name}. `;
      }

      bought_item.quantity -= item.amount;

      _item_model.default.updateOne({
        _id: item.id
      }, bought_item, (error, food_item) => {
        if (error) {
          errors += `Unable to update ${item.name}. `;
        }

        console.log(food_item);
      });
    });
  });
  order.save(error => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: error
      });
    }

    return res.status(201).json();
  });
  return res.status(200).json();
}

function user_orders(req, res) {
  _order_model.default.find({
    user_id: req.params.user_id
  }, (error, orders) => {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      order_history: orders
    });
  });
}