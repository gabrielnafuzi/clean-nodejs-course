import { Request, Response } from 'express'

import {
  Controller,
  HttpRequest,
  StatusCode,
} from '../../presentation/protocols'

const successStatusCodes: StatusCode[] = [200, 201]

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (successStatusCodes.includes(httpResponse.statusCode)) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).json({
      error: (httpResponse.body as Error).message,
    })
  }
}
