import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
      name: {        
        type: String,
        default: ''
      },
      surname: {        
        type: String,
        default: ''
      },
      email: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
      post: {
        type: String,
        required: false,
      },
      index: {
        type: String,
        required: false,
      },
      houseNum: {
        type: String,
        required: false,
      },
      number: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      Orders: {
        type: Array,
        required: true,
      },
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)