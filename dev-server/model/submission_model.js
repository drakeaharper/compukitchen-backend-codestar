import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
    month: String,
    workflow_status: String,
    user_id: String,
    month_total: Number,
    user_name: String
})
submissionSchema.set('timestamps', true)

export default mongoose.model('submission', submissionSchema)