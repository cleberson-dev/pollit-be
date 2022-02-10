import { EncryptionService } from './../encryption/encryption.service'
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private encryptionService: EncryptionService,
  ) {}

  @Post('login')
  async login(
    @Body() { emailOrUsername, password: plainPassword }: LoginUserDto,
    @Res() response: Response,
  ) {
    const { password: encryptedPassword, ...user } =
      await this.usersService.findUser(emailOrUsername)
    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'User or password invalid',
      })
    }
    const doPasswordsMatch = await this.encryptionService.verify(
      encryptedPassword,
      plainPassword,
    )

    if (!doPasswordsMatch) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'User or password invalid',
      })
    }

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'User successfully logged in',
      data: user,
    })
  }

  @Post('register')
  async register(
    @Body() { email, username, password, repeat_password }: RegisterUserDto,
    @Res() response: Response,
  ) {
    if (password !== repeat_password) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Passwords dont match',
      })
    }

    const encryptedPassword = await this.encryptionService.encrypt(password)
    const { password: _, ...createdUser } = await this.usersService.create({
      email,
      password: encryptedPassword,
      username,
    })

    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'User created with success',
      data: createdUser,
    })
  }
}
