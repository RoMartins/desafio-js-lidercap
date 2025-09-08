import { Injectable } from '@kernel/decorators/Injectable';
import { Post } from '../../../domain/entities/post';
import { IPostRepository } from '@domain/repositories/IPostRepository';

@Injectable()
export class GetUserPostsUseCase {
    constructor(private postRepository: IPostRepository) {}

    async execute(userId: number): Promise<Post[]> {
        const posts = await this.postRepository.findByUserId(userId);
        return posts;
    }
}
