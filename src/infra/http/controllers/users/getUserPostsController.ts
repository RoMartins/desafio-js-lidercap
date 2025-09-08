import { Request, Response } from 'express';
import { GetUserPostsUseCase } from '@application/usecases/users/getUserPostsUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { BadRequest } from '@application/errors/Http/BadRequest';
import { ResourceNotFound } from '@application/errors/application/ResourceNotFound';

@Injectable()
export class GetUserPostsController {
    constructor(private readonly getUserPostsUseCase: GetUserPostsUseCase) {}

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                throw new BadRequest('Invalid user ID.');
            }

            const posts = await this.getUserPostsUseCase.execute(userId);
            return res.json(posts);
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
