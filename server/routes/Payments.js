import { Router } from 'express'
import { Payments, FinalResponse, CallBack } from '../controlers/Payments.js'
import bodyParser from 'body-parser'

const router = new Router()

//payments
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/payments/payment', Payments)

router.post('/payments/payment/:id', urlencodedParser, CallBack)

router.post('/payments/payment/res', urlencodedParser, FinalResponse)


export default router