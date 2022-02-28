import { Validation } from '../../../../presentation/protocols/validation'
import { ObjectOf } from '../../../../utils/type-utils'
import { MissingParamError } from '../../../errors'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate<T extends ObjectOf<T>>(input: T) {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
