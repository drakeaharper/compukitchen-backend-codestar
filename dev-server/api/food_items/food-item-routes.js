import express from 'express'
import * as controller from './food-item-controller'

const router = express.Router()

router.post('/food_item', controller.create)
router.get('/food_item', controller.index)
router.get('/food_item/:id', controller.getById)
router.put('/food_item/:id', controller.update)
router.delete('/food_item/:id', controller.deleteItem)

// router.post('/checkout', controller.checkout)
// router.get('/order/user/:user_id', controller.user_orders)

export default router