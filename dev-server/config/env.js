import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

export function setEnviroment(app) {
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    } else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = 'mongodb+srv://dharper:ggxUODk17jR4Y92r@cluster0.kien1.mongodb.net/compukitch-dev-db?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'my-development-secret'
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    console.log("##### running production #####")
    process.env.DB_URL = 'mongodb+srv://dharper:ggxUODk17jR4Y92r@cluster0.kien1.mongodb.net/compukitch-prod-db?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'my-production-secret'
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
}
