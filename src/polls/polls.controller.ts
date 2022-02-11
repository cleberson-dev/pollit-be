import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { PollsService } from './polls.service'
import { CreatePollDto } from './dto/create-poll.dto'
import { UpdatePollDto } from './dto/update-poll.dto'

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserPolls(@Req() req) {
    return this.pollsService.getUserPolls(req.user.id as string)
  }

  @Get(':id')
  getPoll(@Param('id') id: string, @Req() req) {
    return this.pollsService.getPoll(id, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPollDto: CreatePollDto, @Req() req) {
    return this.pollsService.createPoll(createPollDto, req.user.id as string)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePoll(
    @Param('id') id: string,
    @Body() { type, payload }: UpdatePollDto,
    @Req() req,
  ) {
    return this.pollsService.updatePoll(id, { type, payload }, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removePoll(@Param('id') id: string, @Req() req) {
    return this.pollsService.removePoll(id, req.user.id as string)
  }
}
