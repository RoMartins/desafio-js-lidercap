import { IPostRepository } from '@domain/repositories/IPostRepository';
import { Post } from '@domain/entities/post';
import { Injectable } from '@kernel/decorators/Injectable';
import db from '../db.json';
import { PostMapper } from '../mappers/PostMapper';

@Injectable()
export class PostRepository implements IPostRepository {
  async findByUserId(userId: number): Promise<Post[]> {
    const posts = db.posts.filter(post => post.userId === userId);
    return posts.map(PostMapper.toDomain);
  }
}