import { Router } from 'express'
import { CreateOrder, GetOrder } from '../controlers/Order.js';

const router = new Router()

//GetOrders
// router.get('/getOrders', GetOrders

//post order
router.post ('/orders/order', CreateOrder)

router.get ('/orders/order/:id', GetOrder)

export default router