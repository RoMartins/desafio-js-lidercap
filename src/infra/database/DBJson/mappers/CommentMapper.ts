import { Comment } from '@domain/entities/comment';

type CommentPersistence = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export class CommentMapper {
  static toDomain(raw: CommentPersistence): Comment {
    return new Comment({
      id: raw.id,
      postId: raw.postId,
      name: raw.name,
      email: raw.email,
      body: raw.body,
    });
  }

  static toPersistence(comment: Comment): CommentPersistence {
    return {
      id: comment.id,
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    };
  }
}
