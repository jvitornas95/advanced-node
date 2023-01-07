import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUser: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUser = mock<LoadFacebookUserApi>()
    sut = new FacebookAuthenticationService(loadFacebookUser)
  })
  it('should call loadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
