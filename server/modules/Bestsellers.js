import mongoose from 'mongoose'

const BestSellersSchema = new mongoose.Schema(
    {
      productID: {        
        type: String,
        required: true,
      },
    },
    { timestamps: true },
)

export default mongoose.model('BestSellers', BestSellersSchema)