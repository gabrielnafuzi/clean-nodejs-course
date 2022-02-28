import { Validation } from '../../../../presentation/protocols/validation'
import { ObjectOf } from '../../../../utils/type-utils'
import { InvalidParamError } from '../../../errors'
import { EmailValidator } from '../../../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate<T extends ObjectOf<T>>(input: T) {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isEmailValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
