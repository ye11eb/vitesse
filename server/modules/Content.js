import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema(
    {
      firstVideo: {        
        type: String,
        required: true,
      },
      secondVideo: {        
        type: String,
        required: true,
      },
    },
    { timestamps: true },
)

export default mongoose.model('Content', ContentSchema)