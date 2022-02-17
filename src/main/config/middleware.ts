import { Express } from 'express'

import { bodyParser } from '../middleware/body-parser/body-parser'
import { cors } from '../middleware/cors/cors'

export const setupMiddleware = (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
}
