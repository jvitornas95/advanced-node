
import { FacebookAuthenticationService } from '@/data/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJWTTokenGenerator } from '@/main/factories/crypto/token-generator'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(makeFacebookApi(), makePgUserAccountRepo(), makeJWTTokenGenerator())
}
