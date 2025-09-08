import { ICommentRepository } from '@domain/repositories/ICommentRepository';
import { Comment } from '@domain/entities/comment';
import { Injectable } from '@kernel/decorators/Injectable';
import db from '../db.json';
import { CommentMapper } from '../mappers/CommentMapper';

@Injectable()
export class CommentRepository implements ICommentRepository {
  async findByPostId(postId: number): Promise<Comment[]> {
    const comments = db.comments.filter(comment => comment.postId === postId);
    return comments.map(CommentMapper.toDomain);
  }
}