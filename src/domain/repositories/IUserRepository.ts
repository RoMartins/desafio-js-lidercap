import { User } from '../entities/user';

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
}
