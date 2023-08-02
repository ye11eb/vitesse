import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
      images: {        
        type: Array,
        default: ''
      },
      imagesEng: {        
        type: Array,
        default: ''
      },
      title: {
        type: String,
        required: true,
      },
      titleEng: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      subtitleEng: {
        type: String,
        required: true,
      },
      capacity:{
        type: String,
        required: true,
      },
      capacityValue:{
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      priceEng: {
        type: Number,
        required: true,
      },
      info: {
        type: Array,
        required: true,
      },
      infoEng: {
        type: Array,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      typeEng: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
)

export default mongoose.model('Product', ProductSchema)