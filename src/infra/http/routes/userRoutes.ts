import { Router } from 'express';
import { GetUserController } from '../controllers/users/getUserController';
import { GetUserPostsController } from '../controllers/users/getUserPostsController';
import { GetFullUserController } from '../controllers/users/getFullUserController';
import { container } from '@main/di';

export const userRoutes = () => {
  const router = Router();
  const getUserController = container.resolver<GetUserController>(
    GetUserController,
  );
  const getUserPostsController = container.resolver<GetUserPostsController>(
    GetUserPostsController,
  );
  const getFullUserController = container.resolver<GetFullUserController>(
    GetFullUserController,
  );

  router.get('/users/:userId', (req, res) => getUserController.handle(req, res));
  router.get('/users/:userId/posts', (req, res) =>
    getUserPostsController.handle(req, res),
  );
  router.get('/users/:userId/full', (req, res) =>
    getFullUserController.handle(req, res),
  );

  return router;
};

