import { Router } from 'express'

const signupRoutes = (router: Router) => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}

export default signupRoutes
