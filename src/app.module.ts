import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PollsModule } from './polls/polls.module';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [UsersModule, PollsModule],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
