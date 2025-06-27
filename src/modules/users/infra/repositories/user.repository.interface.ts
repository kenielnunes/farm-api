import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | undefined>;
  findById(id: string): Promise<UserEntity | undefined>;
  create(user: UserEntity): Promise<UserEntity>;
} 