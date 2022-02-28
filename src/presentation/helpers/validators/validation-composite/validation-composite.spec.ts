import { ObjectOf } from '../../../../utils/type-utils'
import { MissingParamError } from '../../../errors'
import { Validation } from '../validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate<T extends ObjectOf<T>>(input: T) {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])

  return {
    sut,
    validationStub,
  }
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
