export interface ContentValidator {
  isEmail(email: string): boolean
  isDate(date: string): boolean
}
