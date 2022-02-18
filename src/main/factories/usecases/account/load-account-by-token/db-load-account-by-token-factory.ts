import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(bcryptAdapter, accountMongoRepository)
}
