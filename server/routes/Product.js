import { Router } from 'express';
import { GetFilterOpts, GetFilteredProducts, GetProduct, GetProducts } from '../controlers/Product.js';


const router = new Router()

// router.post('/product', CreateProduct)

router.get('/products/:nums', GetProducts)

router.get('/product/:id', GetProduct)

router.get('/products/:opt/:nums', GetFilteredProducts)

router.get('/filterOpts/:opt', GetFilterOpts)

// router.delete('/product/:id', DeleteProduct)

// router.patch('/product/:id', ChangeProduct)


export default router