import { User } from '@domain/entities/user';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { UserMapper } from '../mappers/UserMapper';
import db from '../db.json';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly users = db.users;

  async findById(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id === id);

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
}
