import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();
@Injectable()
export class UsersService {
  async login({ emailOrUsername, password }: LoginUserDto) {
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) throw new Error('User or password invalid');

    const { password: hashedPassword } = user;
    const isSamePassword = await bcrypt.compare(password, hashedPassword);

    if (!isSamePassword) throw new Error('User or password invalid');

    return {
      id: user.id,
    };
  }

  async register({
    email,
    password,
    repeat_password,
    username,
  }: RegisterUserDto) {
    if (password !== repeat_password) throw new Error('Passwords dont match');

    const hashedPassword = await bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt));

    const newUser = await db.user.create({
      data: { email, password: hashedPassword, username },
    });

    return {
      id: newUser.id,
    };
  }
}
