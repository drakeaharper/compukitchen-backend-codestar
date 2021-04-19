import authRoutes from './api/auth/auth-routes.js'
import regRoutes from './api/register/register-routes.js'
import userRoutes from './api/user/user-routes.js'
import foodItemRoutes from './api/food_items/food-item-routes.js'
import orderItemRoutes from './api/order/order-item-routes.js'
import submissionRoutes from './api/submission/submission-routes'

export function registerRoutes(app) {
    app.use('/api', authRoutes)
    app.use('/api', regRoutes)
    app.use('/api', userRoutes)
    app.use('/api', foodItemRoutes)
    app.use('/api', orderItemRoutes)
    app.use('/api', submissionRoutes)
}
