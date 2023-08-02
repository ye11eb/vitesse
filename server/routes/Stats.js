import { Router } from 'express';
import  {UserEntrie}  from '../controlers/Stats.js';

const router = new Router()

router.post('/user/:id', UserEntrie)


export default router