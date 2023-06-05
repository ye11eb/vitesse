import express  from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'

//Routes
import UsersRote from './routes/User.js'
import ProductsRote from './routes/Product.js'
import OrdersRote from './routes/Orders.js'
import PaymentsRote from "./routes/Payments.js"

const app = express()
dotenv.config()

// Constants

// const PORT = process.env.PORT || 5000
const DB_LOGIN = process.env.DB_LOGIN
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Middleware

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))


//Routes
app.use('/api/usersRoute', UsersRote)
app.use('/api/productsRoute', ProductsRote)
app.use('/api/ordersRoute', OrdersRote)
app.use('/api/paymentsRoute', PaymentsRote)


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