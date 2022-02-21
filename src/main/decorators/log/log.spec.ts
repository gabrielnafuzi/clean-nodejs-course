import { LogErrorRepository } from '../../../data/protocols/log-error'
import { serverError } from '../../../presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'John Doe',
        },
      }

      return await new Promise((resolve) => resolve(httpResponse))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  }
}

describe('LogControllerDecorator', () => {
  it('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'John Doe',
      },
    })
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)))

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
