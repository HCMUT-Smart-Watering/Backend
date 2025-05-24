import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
