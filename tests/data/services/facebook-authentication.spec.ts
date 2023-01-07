import { AuthenticationError } from '@/domain/errors'

import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { FacebookAuthenticationService } from '@/data/services'

class LoadFacebookUserSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token

    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUser.token).toBe('any_token')
  })

  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    loadFacebookUser.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
