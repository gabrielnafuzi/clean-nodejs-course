import { ObjectOf } from '../../../../utils/type-utils'
import { InvalidParamError } from '../../../errors'
import { Validation } from '../validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName
  ) {}

  validate<T extends ObjectOf<T>>(input: T) {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
