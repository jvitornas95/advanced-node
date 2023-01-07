import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const loadFacebookUser = mock<LoadFacebookUserApi>()
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
