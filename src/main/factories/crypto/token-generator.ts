import { JwtTokenGenerator } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJWTTokenGenerator = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(env.jwtSecret)
}
