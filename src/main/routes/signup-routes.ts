import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    console.log(router)
    res.json('ok')
  })
}
