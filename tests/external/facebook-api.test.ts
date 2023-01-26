import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })
  it('should return a facebook user if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAMTWGIjKXcBALVwAP5kr6psH8qz6Nvmd26It9oJhw2Sc6WmrRZCJhLGWrFmY7AODk85frfb6SScyl4kQhE3F6GvMjzKtqksWwxy5OFZASHxJDZCA1JAxkkYExKQh8DHe6vBraWKZBJOTFBFIm9MAX9CNoPiE1fABufZAT0c2cgvhULHlVe7uOzRijUeSCJbF7tyh4aA85AZDZD' })

    expect(fbUser).toEqual({
      facebookId: '107598812237310',
      email: 'joao_tpfogzu_teste@tfbnw.net',
      name: 'Joao Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
