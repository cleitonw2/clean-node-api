import { loginPath, signUpPath, surveyPath, saveSurveyPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': saveSurveyPath
}
