import { Injectable } from '@kernel/decorators/Injectable';
import { User } from '../../../domain/entities/user';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound';

@Injectable()
export class GetUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: number): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (user) {
            return user;
        } else {
            throw new ResourceNotFound('User not found');
        }
    }
}
