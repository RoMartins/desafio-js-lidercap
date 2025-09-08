import { Injectable } from '@kernel/decorators/Injectable';
import { Comment } from '../../../domain/entities/comment';
import { ICommentRepository } from '@domain/repositories/ICommentRepository';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound';

@Injectable()
export class GetPostCommentsUseCase {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(postId: number): Promise<Comment[]> {
        const comments = await this.commentRepository.findByPostId(postId);
        if (!comments) {
            throw new ResourceNotFound('Comentários não encontrados');
        }
        return comments;
    }
}
