import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUser: MockProxy<LoadFacebookUserApi>
}
const makeSut = (): SutTypes => {
  const loadFacebookUser = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(loadFacebookUser)

  return {
    sut,
    loadFacebookUser
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const { loadFacebookUser, sut } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const { loadFacebookUser, sut } = makeSut()
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
