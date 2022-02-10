import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const db = new PrismaClient();
@Injectable()
export class UsersService {
  async findUser(emailOrUsername: string): Promise<User | undefined> {
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    return user;
  }

  async create({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username?: string;
  }) {
    const createdUser = await db.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return createdUser;
  }
}
