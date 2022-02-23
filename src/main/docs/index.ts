import { loginPath } from './paths'
import { accountSchema, loginParamsSchema } from './schemas'

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
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
