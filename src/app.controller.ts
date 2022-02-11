import { AuthService } from 'src/auth/auth.service'
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { Response } from 'express'
import { RegisterUserDto } from './users/dto/register-user.dto'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req, @Res() response: Response) {
    const result = this.authService.login(req.user)

    return response.status(HttpStatus.OK).json(result)
  }

  @Post('auth/register')
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

    const { user, token } = await this.authService.register({
      email,
      password,
      username,
    })

    return response.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User successfully registered',
      data: {
        user,
        token,
      },
    })
  }
}
