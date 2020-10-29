export interface Hasher {
  hash(text: string): Promise<string>
  compare(toCompare: string, toBeCompared: string): Promise<boolean>
}
