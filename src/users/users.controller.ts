import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  login(@Body() createUserDto: LoginUserDto) {
    return this.usersService.login(createUserDto);
  }

  @Post()
  register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }
}
