import { MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
  emailOrUsername: string

  @MinLength(8)
  @MaxLength(16)
  password: string
}
