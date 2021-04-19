import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
})
itemSchema.set('timestamps', true)

export default mongoose.model('food_item', itemSchema)