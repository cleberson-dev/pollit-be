import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  login(loginUserDto: LoginUserDto) {
    return 'This action adds a new user';
  }

  register(register: RegisterUserDto) {
    return `This action registers a user`;
  }
}
