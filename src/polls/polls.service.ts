import { GetPollDto } from './dto/get-poll.dto';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

const db = new PrismaClient();
@Injectable()
export class PollsService {
  getUserPolls() {
    return `This action returns all polls`;
  }

  getPoll(id: number) {
    return `This action returns a #${id} poll`;
  }

  async createPoll(
    { title, expiresAt, options }: CreatePollDto,
    userId: string,
  ): Promise<GetPollDto> {
    const createdPoll = await db.poll.create({
      data: {
        title,
        expiresAt,
        userId,
        options: {
          create: options.map((op) => ({ title: op })),
        },
      },
      include: {
        options: true,
      },
    });

    return {
      id: createdPoll.id,
      title: createdPoll.title,
      expiresAt: createdPoll.expiresAt.toISOString(),
      createdAt: createdPoll.createdAt.toISOString(),
      modifiedAt: createdPoll.modifiedAt.toISOString(),
      votes: 0,
      options: createdPoll.options.map((op) => ({
        id: op.id,
        title: op.title,
        votes: 0,
      })),
    };
  }

  updatePoll(id: number, updatePollDto: UpdatePollDto) {
    return `This action updates a #${id} poll`;
  }

  async removePoll(id: string) {
    await db.poll.delete({ where: { id } });
  }
}
