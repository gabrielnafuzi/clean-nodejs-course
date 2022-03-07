import { Router } from 'express'

import { adaptRoute } from '../../adapters/express/express-route-adapter'
import { makeSignUpController } from '../../factories/signup'

const signupRoutes = (router: Router) => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}

export default signupRoutes
