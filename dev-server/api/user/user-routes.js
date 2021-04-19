import express from 'express'
const router = express.Router()
import * as controller from './user-controller'

router.get('/user', controller.index)
router.get('/user/:id', controller.show)
router.put('/user/:id', controller.update)

export default router