import jwt from 'jsonwebtoken'
import { StringUtil } from '../utilities/string-util'

export function generateJWT(user) {
    const full_name = StringUtil.capitalize(user.first) + " " + StringUtil.capitalize(user.last)
    const tokenData = { username: user.username, id: user._id, role: user.role, full_name: full_name }
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET)
}

export function requireLogin(req, res, next) {
   const token = decodeToken(req)
   if (!token) {
       return res.status(401).json({ message: 'You must be logged in.' })
   }
   next()
}

export function decodeToken(req) {
    const token = req.headers.authorization || req.headers['authorization']

    if (!token) {
        return null
    }

    try {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        return null
    }
}

export function getUsername(req) {
    const token = decodeToken(req)
    if (!token) {
        return null
    }
    return token.user.username
}

export function getUserId(req) {
    const token = decodeToken(req)
    if (!token) {
        return null
    }
    return token.user.id
}

export function getUserRole(req) {
    const token = decodeToken(req)
    if (!token) {
        return null
    }
    return token.user.role
}
