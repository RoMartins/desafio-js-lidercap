import { Post } from '@domain/entities/post';

type PostPersistence = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export class PostMapper {
  static toDomain(raw: PostPersistence): Post {
    return new Post({
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      body: raw.body,
    });
  }

  static toPersistence(post: Post): PostPersistence {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    };
  }
}
