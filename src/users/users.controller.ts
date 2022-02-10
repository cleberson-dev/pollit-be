import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() createUserDto: LoginUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }
}
