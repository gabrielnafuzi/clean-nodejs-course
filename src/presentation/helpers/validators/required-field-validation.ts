import { ObjectOf } from '../../../utils/type-utils'
import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate<T extends ObjectOf<T>>(input: T) {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
