import { Express } from 'express'

import { bodyParser, cors, contentType } from '../middleware'

export const setupMiddleware = (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
