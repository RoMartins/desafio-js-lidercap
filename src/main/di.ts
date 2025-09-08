
import { GetPostCommentsUseCase } from '@application/usecases/posts/getPostCommentsUseCase';
import { GetUserPostsUseCase } from '@application/usecases/users/getUserPostsUseCase';
import { GetUserUseCase } from '@application/usecases/users/getUserUseCase';
import { CommentRepository } from '@infra/database/DBJson/repositories/CommentRepository';
import { PostRepository } from '@infra/database/DBJson/repositories/PostRepository';
import { UserRepository } from '@infra/database/DBJson/repositories/UserRepository';
import { GetFullUserController } from '@infra/http/controllers/users/getFullUserController';
import { GetUserController } from '@infra/http/controllers/users/getUserController';
import { GetUserPostsController } from '@infra/http/controllers/users/getUserPostsController';
import { GetPostCommentsController } from '@infra/http/controllers/posts/getPostCommentsController';
import { Registry } from '@kernel/di/Registry';

// Get DI container instance
const registry = Registry.getInstance();

// Register Repositories (mapping interface tokens to concrete classes)
registry.register('ICommentRepository', CommentRepository);
registry.register('IPostRepository', PostRepository);
registry.register('IUserRepository', UserRepository);

// Register Use Cases (specifying their dependency tokens)
registry.register(GetUserUseCase, GetUserUseCase, ['IUserRepository']);

registry.register(GetUserPostsUseCase, GetUserPostsUseCase, [
  'IPostRepository',
]);

registry.register(GetPostCommentsUseCase, GetPostCommentsUseCase, [
  'ICommentRepository',
]);

// Register Controllers
registry.register(GetPostCommentsController, GetPostCommentsController, [
  GetPostCommentsUseCase,
]);

registry.register(GetUserController, GetUserController, [GetUserUseCase]);

registry.register(GetUserPostsController, GetUserPostsController, [
  GetUserPostsUseCase,
]);

registry.register(GetFullUserController, GetFullUserController, [
  GetUserUseCase,
  GetUserPostsUseCase,
  GetPostCommentsUseCase,
]);

export const container = registry;
