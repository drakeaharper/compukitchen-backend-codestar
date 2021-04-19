import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    items: [],
    total_cost: String,
    user_id: String
})
orderSchema.set('timestamps', true)

export default mongoose.model('order', orderSchema)