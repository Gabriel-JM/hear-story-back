import { RepositoryDeleteMessage } from './repository-delete-message'

export interface Repository<TEntry, TReturn = TEntry> {
  findAll?(): Promise<TReturn[]>
  find?(id: number): Promise<TReturn>
  save?(content: TEntry): Promise<TReturn>
  update?(content: TEntry): Promise<TReturn>
  delete?(id: number): Promise<RepositoryDeleteMessage>
}
