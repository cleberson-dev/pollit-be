class CreatePollOption {
  title: string;
}

export class CreatePollDto {
  title: string;
  expiresAt: string;
  options: CreatePollOption[];
}
