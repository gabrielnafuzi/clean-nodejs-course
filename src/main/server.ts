import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { env } from './config/env'

const init = async () => {
  try {
    await MongoHelper.connect(env.mongoUrl)

    const { app } = await import('./config/app')

    app.listen(env.port, () =>
      console.log(`Server is listening on port http://localhost:${env.port}`)
    )
  } catch (error) {
    console.log(error)
  }
}

init()
