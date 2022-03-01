import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/load-surveys-controller-factory'
import { authAdmin } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', authAdmin, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
