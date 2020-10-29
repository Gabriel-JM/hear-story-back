import express from 'express'
import routes from '../config/routes'
import setup from '../config/setup'

const app = express()

setup(app)
routes(app)

export { app }
