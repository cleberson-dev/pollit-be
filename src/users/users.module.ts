import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EncryptionService } from '../encryption/encryption.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EncryptionService],
})
export class UsersModule {}
