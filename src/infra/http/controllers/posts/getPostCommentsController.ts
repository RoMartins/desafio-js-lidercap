
import { Request, Response } from 'express';
import { GetPostCommentsUseCase } from '@application/usecases/posts/getPostCommentsUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { BadRequest } from '@application/errors/Http/BadRequest';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound';

@Injectable()
export class GetPostCommentsController {
  constructor(private readonly getPostCommentsUseCase: GetPostCommentsUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const postId = parseInt(req.params.postId, 10);
      if (isNaN(postId)) {
        throw new BadRequest('Invalid post ID.');
      }

      const comments = await this.getPostCommentsUseCase.execute(postId);
      if (!comments || comments.length === 0) {
        throw new ResourceNotFound('No comments found for this post');
      }

      return res.json(comments);
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

