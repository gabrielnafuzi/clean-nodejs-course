import { ObjectOf } from '../../../../utils/type-utils'
import { MissingParamError } from '../../../errors'
import { Validation } from '../validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate<T extends ObjectOf<T>>(input: T) {
      return new MissingParamError('field')
    }
  }

  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  const validationStub = makeValidation()

  return new ValidationComposite([validationStub])
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
