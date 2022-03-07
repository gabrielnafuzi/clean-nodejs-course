import { Router } from 'express'

import { adaptRoute } from '../../adapters/express/express-route-adapter'
import { makeLoginController } from '../../factories/login'
import { makeSignUpController } from '../../factories/signup'

const loginRoutes = (router: Router) => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}

export default loginRoutes
