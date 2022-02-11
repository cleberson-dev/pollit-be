export class GetUserPollsDto {
  id: string
  title: string
  expiresAt: string
  createdAt: string
  modifiedAt: string
  options: number
  votes: number
  votedOption?: string
}
