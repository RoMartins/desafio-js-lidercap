
import { Request, Response } from 'express';
import { GetUserUseCase } from '@application/usecases/users/getUserUseCase';
import { GetUserPostsUseCase } from '@application/usecases/users/getUserPostsUseCase';
import { GetPostCommentsUseCase } from '@application/usecases/posts/getPostCommentsUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { Comment } from '@domain/entities/comment';
import { BadRequest } from '@application/errors/Http/BadRequest';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound';

@Injectable()
export class GetFullUserController {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUserPostsUseCase: GetUserPostsUseCase,
    private readonly getPostCommentsUseCase: GetPostCommentsUseCase,
  ) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) {
        throw new BadRequest('Invalid user ID.');
      }

      const user = await this.getUserUseCase.execute(userId);
      const posts = await this.getUserPostsUseCase.execute(user.id);
      let commentsOnFirstPost: Comment[] = [];

      if (posts && posts.length > 0) {
        commentsOnFirstPost = await this.getPostCommentsUseCase.execute(
          posts[0].id,
        );
      }

      return res.json({
        user,
        posts,
        commentsOnFirstPost,
      });
    } catch (error: any) {
      if (error instanceof ResourceNotFound) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof BadRequest) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
}

