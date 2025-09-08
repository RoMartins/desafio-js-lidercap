import { Post } from '../entities/post';

export interface IPostRepository {
    findByUserId(userId: number): Promise<Post[]>;
}
