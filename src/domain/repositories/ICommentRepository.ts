import { Comment } from '../entities/comment';

export interface ICommentRepository {
    findByPostId(postId: number): Promise<Comment[]>;
}
