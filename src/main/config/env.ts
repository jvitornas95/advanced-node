export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '865695254653303',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'e61b3fe3fbf0b209d587ea8c1e998043'
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'asdsadas5438sda'
}
