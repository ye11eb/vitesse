import mongoose from 'mongoose'

const StatsSchema = new mongoose.Schema(
    {
      UserId: {        
        type: String,
        default: ''
      },
      UserBrowserId: {        
        type: String,
        required: true,
      },
      EntriesNumber: {
        type: Number,
        required: true,
      },
      byMonth:{
        type: Array,
        required: true,
      }
    },
    { timestamps: true },
)

export default mongoose.model('Stats', StatsSchema)