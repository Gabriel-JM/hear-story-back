import { User } from '../models'
import { Repository } from './repository'

export interface LoginRepository extends Repository<User> {
  findByUsername(username: string): Promise<User | null>
}
