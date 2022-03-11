import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = async (app: Express) => {
  const router = Router()

  app.use('/api', router)

  const createRoute = async (folderName: string) => {
    const folderPath = path.resolve(__dirname, '..', 'routes', folderName)

    readdirSync(folderPath).map(async (fileName) => {
      if (!fileName.includes('.test.') && !fileName.endsWith('.map')) {
        ;(await import(path.resolve(folderPath, fileName))).default(router)
      }
    })
  }

  readdirSync(path.resolve(__dirname, '..', 'routes'))
    .map((folderName) => folderName)
    .forEach(createRoute)
}
