import { ObjectOf } from '../../../../utils/type-utils'
import { Validation } from '../validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate<T extends ObjectOf<T>>(input: T) {
    for (const validation of this.validations) {
      const error = validation.validate(input)

      if (error) {
        return error
      }
    }

    return null
  }
}
