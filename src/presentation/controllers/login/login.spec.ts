import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { LoginController } from './login'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 if no password is provided', async () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
