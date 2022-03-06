import { ObjectOf } from '../../utils/type-utils'

export interface Validation {
  validate: <T extends ObjectOf<T>>(input: T) => Error | null
}
