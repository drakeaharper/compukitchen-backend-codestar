import { StringUtil } from '../../utilities/string-util'
import Item from '../../model/item_model'

export function index(req, res) {
    Item.find({}, (error, food_items) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ food_items: food_items })
    })
}

export function getById(req, res) {
    Item.findOne({_id: req.params.id}, (error, food_item) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json({ food_item: food_item })
    })
}

export function deleteItem(req, res) {
    Item.deleteOne({_id: req.params.id}, (error, food_item) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json()
    })
}

export function update(req, res) {
    const validation = validateItem(req.body.updated_item)

    if (!validation.isValid) {
        return res.status(400).json({message: validation.message})
    }

    Item.updateOne({_id: req.params.id}, req.body.updated_item, (error, food_item) => {
        if (error) {
            return res.status(500).json()
        }

        return res.status(200).json()
    })
}

export function create(req, res) {
    const validation = validateItem(req.body)

    if (!validation.isValid) {
        return res.status(400).json({message: validation.message})
    }

    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })

    item.save(error => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: error })
        }

        return res.status(201).json()
    })
}

function validateItem(body) {
    let errors = '';
    if(StringUtil.isEmpty(body.name)) {
        errors += 'Item name is required. '
    }

    if (typeof(Number.parseFloat(body.price)) !== "number" && Number.parseFloat(body.price) !== NaN) {
        errors += 'Price must be a number. '
    }

    if (typeof(Number.parseFloat(body.quantity)) !== "number" && Number.parseFloat(body.quantity) !== NaN) {
        errors += 'Quantity must be a numner. '
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
