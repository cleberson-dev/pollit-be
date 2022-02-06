import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Injectable()
export class PollsService {
  getUserPolls() {
    return `This action returns all polls`;
  }

  getPoll(id: number) {
    return `This action returns a #${id} poll`;
  }

  createPoll(createPollDto: CreatePollDto) {
    return 'This action adds a new poll';
  }

  updatePoll(id: number, updatePollDto: UpdatePollDto) {
    return `This action updates a #${id} poll`;
  }

  removePoll(id: number) {
    return `This action removes a #${id} poll`;
  }
}
