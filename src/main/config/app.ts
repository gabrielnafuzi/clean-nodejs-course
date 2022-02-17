import express from 'express'

import { setupMiddleware } from './middleware'

const app = express()

setupMiddleware(app)

export { app }
