import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    'name',
    'email',
    'password',
    'passwordConfirmation',
  ].map((field) => new RequiredFieldValidation(field))

  return new ValidationComposite(validations)
}
