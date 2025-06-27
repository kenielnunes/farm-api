import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) { }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.repo.findOne({ where: { email } });
    return user || undefined;
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.repo.findOne({ where: { id } });
    return user || undefined;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }
} 