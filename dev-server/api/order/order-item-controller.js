import Order from '../../model/order_model'
import Item from '../../model/item_model'

export function checkout(req, res) {

    let cart = []

    Object.keys(req.body.shopping_cart).forEach(key => {
        cart.push(req.body.shopping_cart[key])
    })

    const order = new Order({
        items: cart,
        total_cost: req.body.total_cost,
        user_id: req.body.user_id
    })

    let errors = '';

    cart.forEach(item => {
        Item.findOne({_id: item.id}, (error, bought_item) => {
            if (error) {
                errors += `Unable to find ${item.name}. `
            }

            bought_item.quantity -= item.amount

            Item.updateOne({_id: item.id}, bought_item, (error, food_item) => {
                if (error) {
                    errors += `Unable to update ${item.name}. `
                }

                console.log(food_item)
            })
        })
    })

    order.save(error => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: error })
        }

        return res.status(201).json()
    })

    return res.status(200).json()
}

export function user_orders(req, res) {
    Order.find({user_id: req.params.user_id}, (error, orders) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json({ order_history: orders })
    })
}
