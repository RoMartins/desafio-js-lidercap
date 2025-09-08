import { Router } from 'express';
import { GetPostCommentsController } from '../controllers/posts/getPostCommentsController';
import { container } from '@main/di';

export const postRoutes = () => {
  const router = Router();
  const getPostCommentsController = container.resolver<GetPostCommentsController>(
    GetPostCommentsController,
  );

  router.get('/posts/:postId/comments', (req, res) =>
    getPostCommentsController.handle(req, res),
  );

  return router;
};

