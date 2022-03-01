import env from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(bcryptAdapter, accountMongoRepository)
}
