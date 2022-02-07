import { GetUserPollsDto } from './dto/get-user-polls.dto';
import { GetPollDto } from './dto/get-poll.dto';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

const db = new PrismaClient();
@Injectable()
export class PollsService {
  async getUserPolls(userId: string): Promise<GetUserPollsDto[]> {
    const userPolls = await db.poll.findMany({
      where: { userId },
      include: { votes: true, options: true },
    });

    return userPolls.map((poll) => ({
      id: poll.id,
      title: poll.title,
      expiresAt: poll.expiresAt.toISOString(),
      createdAt: poll.createdAt.toISOString(),
      modifiedAt: poll.modifiedAt.toISOString(),
      options: poll.options.length,
      votes: poll.votes.length,
    }));
  }

  async getPoll(id: string): Promise<GetPollDto> {
    const poll = await db.poll.findFirst({
      where: { id },
      include: {
        options: {
          include: {
            votes: true,
          },
        },
      },
    });
    const votes = await db.vote.count({ where: { pollId: poll.id } });

    return {
      id: poll.id,
      title: poll.title,
      expiresAt: poll.expiresAt.toISOString(),
      createdAt: poll.createdAt.toISOString(),
      modifiedAt: poll.modifiedAt.toISOString(),
      options: poll.options.map((op) => ({
        id: op.id,
        title: op.title,
        votes: op.votes.length,
      })),
      votes,
    };
  }

  async createPoll(
    { title, expiresAt, options }: CreatePollDto,
    userId: string,
  ): Promise<GetPollDto> {
    // Check if expiration date is in future, with at least one day of duration
    const expirationDateInMs = new Date(expiresAt).getTime();
    const minimumHours = 24;
    const minDuration = minimumHours * 60 * 60 * 1000;

    if (expirationDateInMs <= Date.now() + minDuration)
      throw new Error(
        `Poll should be in future and have at least ${minimumHours} hours of duration.`,
      );

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

  async voteOnPoll(pollId: string, userId: string, optionId: string) {
    const poll = await db.poll.findFirst({ where: { id: pollId } });

    if (poll.expiresAt.getTime() <= Date.now())
      throw new Error('Already expired');

    await db.vote.create({ data: { pollId, userId, optionId } });
  }

  async removePoll(id: string) {
    await db.poll.delete({ where: { id } });
  }
}
