import { Router } from 'express'
import { GetBestSellers } from '../controlers/Bestsellers.js'

const router = new Router()

//GetOrders
router.get('/products', GetBestSellers)

export default router
