import { Router } from 'express'
import { addContent } from '../controlers/Content.js'

const router = new Router()

//GetOrders
router.post('/', addContent)

export default router
