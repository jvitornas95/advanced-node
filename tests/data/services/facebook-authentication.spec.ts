import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUser: loadFacebookUserApi) { }

  async perform(params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUser.loadUser(params)
  }
}

interface loadFacebookUserApi {
  loadUser: (params: loadFacebookUser.Params) => Promise<void>
}

namespace loadFacebookUser {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserSpy implements loadFacebookUserApi {
  token?: string
  async loadUser(params: loadFacebookUser.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUser = new LoadFacebookUserSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUser)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUser.token).toBe('any_token')
  })
})
