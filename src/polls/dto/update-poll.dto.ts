export type UpdatePollTypes = 'vote'

export class UpdatePollDto {
  type: UpdatePollTypes
  payload: any
}
