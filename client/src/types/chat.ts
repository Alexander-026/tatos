

export enum ChatType {
  Group = "group",
  Duel = "duel",
}

export interface IChat {
  id: string
  companyId: string
  type: ChatType
  participants: string[]
  messages: string[]
  createdAt: Date
  updatedAt: Date
}
