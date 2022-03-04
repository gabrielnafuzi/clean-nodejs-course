import { AuthenticationModel } from '../../../../domain/use-cases/authentication'
import { HashComparer } from '../../../protocols/cryptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../../protocols/db/load-account-by-email-repository'
import { AccountModel } from './../../../../domain/models/account'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
  }
}

const makeFakeAuthentication = (): AuthenticationModel => {
  return {
    email: 'any_email@mail.com',
    password: 'any_password',
  }
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
  }
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    async load(email: string): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promise = sut.auth(makeFakeAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()

    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    await sut.auth(makeFakeAuthentication())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
})
