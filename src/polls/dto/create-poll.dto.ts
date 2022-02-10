import {
  IsDateString,
  MaxLength,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator'

export class CreatePollDto {
  @MinLength(3)
  @MaxLength(32)
  title: string

  @IsDateString()
  expiresAt: string

  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @MaxLength(32, { each: true })
  options: string[]
}
