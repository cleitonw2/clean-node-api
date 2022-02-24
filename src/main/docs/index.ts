import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'
import { loginPath, signUpPath, surveyPath } from './paths'
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema,
  addSurveyParamsSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Enquetes para Programadores',
    description: 'Essa é a documentação da Api construida usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '3.0.0',
    contact: {
      name: 'Cleiton',
      email: 'cleitonwoycik@outlook.com'
    }
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    error: errorSchema
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
