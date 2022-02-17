import { Express } from 'express'

import { bodyParser } from '../middleware/body-parser/body-parser'

export const setupMiddleware = (app: Express) => {
  app.use(bodyParser)
}
