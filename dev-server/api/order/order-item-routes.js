import express from 'express'
import * as controller from './order-item-controller'

const router = express.Router()

router.post('/checkout', controller.checkout)
router.get('/order/user/:user_id', controller.user_orders)

export default router