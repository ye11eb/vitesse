import express  from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

//Routes
import UsersRoute from './routes/User.js'
import ProductsRoute from './routes/Product.js'
import OrdersRoute from './routes/Orders.js'
import PaymentsRoute from "./routes/Payments.js"
import StatsRoute from "./routes/Stats.js"
import BestSellersRoute from './routes/Bestsellers.js'
import ContentRoute from './routes/Content.js'

const app = express()
dotenv.config()

// Constants

// const PORT = process.env.PORT || 5000
const DB_LOGIN = process.env.DB_LOGIN
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Middleware

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//api/usersRoute/user
//Routes
app.use('/api/usersRoute', UsersRoute)
app.use('/api/productsRoute', ProductsRoute)
app.use('/api/ordersRoute', OrdersRoute)
app.use('/api/statsRoute', StatsRoute)
app.use('/api/paymentsRoute', PaymentsRoute)
app.use('/api/BestSellersRoute', BestSellersRoute)
app.use('/api/ContentRoute', ContentRoute)



async function start() {
  try{
    // mortaleest
    await mongoose.connect(`mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@${DB_USER}.65x77t2.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(5000, () => console.log(`server started on port: ${5000}`))
  }
  catch (error){
    console.log(error);
  }
}


start()