import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
      paymentId:{
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      surname:{
        type: String,
        required: true,
      },
      email:{
        type: String,
        required: true,
      },
      country:{
        type: String,
        required: true,
      },
      city:{
        type: String,
        required: true,
      },
      number:{
        type: String,
        required: true,
      },
      region:{
        type: String,
        required: true,
      },
      zipcode:{
        type: String,
        required: true,
      },
      street:{
        type: String,
        required: false,
      },
      homeNumber:{
        type: String,
        required: false,
      },
      postNum:{
        type: String,
        required: false,
      },
      products:[
        {
          _id:{
            required: true,
            type: String
          },
          quantity:{
            required: true,
            type: Number
          },
        }
      ],
      deliveryPrice:{
        required: true,
        type: Number,
      },
      result: {
        required: true,
        type: Number,
      },
      priceValue: {
        required: true,
        type: String,
      },
      orderStatus:{
        required: true,
        type: Object,
      },
      trackNumber:{
        required: true,
        type: String,
      }
    },
    { timestamps: true },
)

export default mongoose.model('Order', OrderSchema)