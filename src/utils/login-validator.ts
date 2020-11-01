import validator from 'validator'
import { ContentValidator } from '../protocols/utils'

export class LoginValidator implements ContentValidator {

  isEmail(email: string) {
    return validator.isEmail(email)
  }

  isDate(date: string) {
    const regex = /(19[2-9][0-9]|20(0[0-9]|1[0-3]))-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g
    const [dateToCompare] = new Date(date).toISOString().split('T')

    return regex.test(date) && date === dateToCompare
  }

}
