import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ].map((field) => {
      return new RequiredFieldValidation(field)
    })

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation')
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
