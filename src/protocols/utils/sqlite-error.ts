export interface SqliteError extends Error {
  errno: number
  code: string
}
