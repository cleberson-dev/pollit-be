export class GetPollOptions {
  id: string
  title: string
  votes: number
}

export class GetPollDto {
  id: string
  title: string
  expiresAt: string
  createdAt: string
  modifiedAt: string
  options: GetPollOptions[]
  votes: number
}
