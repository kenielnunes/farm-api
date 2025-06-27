import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { UserEntity } from './infra/entities/user.entity';
import { UserRepository } from './infra/repositories/user.repository';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserRepository,
    CreateUserUseCase,
  ],
  exports: [UserRepository],
})
export class UsersModule { } 