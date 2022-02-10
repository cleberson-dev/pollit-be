import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  email: string

  @MinLength(8)
  @MaxLength(16)
  password: string

  @MinLength(8)
  @MaxLength(16)
  repeat_password: string

  @MinLength(8)
  @MaxLength(16)
  @IsOptional()
  username?: string
}
