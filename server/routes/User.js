import { Router } from 'express';
import { Register, Login, GetMe } from '../controlers/User.js';


const router = new Router()

router.post('/user', Register)

router.get('/user/:id', GetMe)

router.post('/user/:email', Login)



export default router