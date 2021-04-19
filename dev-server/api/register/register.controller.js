import { StringUtil } from '../../utilities/string-util'
import User from '../../model/user_model'

export function index(req, res) {
    const validation = validateIndex(req.body)
    if (!validation.isValid) {
        return res.status(400).json({message: validation.message})
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last,
        role: req.body.role
    })
    user.save(error => {
        if (error) {
            console.log(error)
            if (error.code === 11000) {
                return res.status(403).json({ message: 'Username is taken'})
            }
            return res.status(500).json({ message: error })
        }
        return res.status(201).json()
    })
}

function validateIndex(body) {
    let errors = '';
    if(StringUtil.isEmpty(body.username)) {
        errors += 'Username is required.'
    }

    if(StringUtil.isEmpty(body.password)) {
        errors += 'Password is required.'
    }

    if(StringUtil.isEmpty(body.first)) {
        errors += 'A first name is required.'
    }

    if(StringUtil.isEmpty(body.last)) {
        errors += 'A last name is required.'
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}