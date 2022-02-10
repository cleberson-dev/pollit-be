import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { PollsService } from './polls.service'
import { CreatePollDto } from './dto/create-poll.dto'
import { UpdatePollDto } from './dto/update-poll.dto'

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  getUserPolls() {
    return this.pollsService.getUserPolls('asasd')
  }

  @Get(':id')
  getPoll(@Param('id') id: string) {
    return this.pollsService.getPoll(id)
  }

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.createPoll(createPollDto, 'sdqweqwe')
  }

  @Patch(':id')
  updatePoll(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollsService.updatePoll(+id, updatePollDto)
  }

  @Delete(':id')
  removePoll(@Param('id') id: string) {
    return this.pollsService.removePoll(id)
  }
}
