## Visão Geral

O projeto é uma API RESTful construída com TypeScript e Node.js, seguindo princípios de Arquitetura Limpa. Ele expõe endpoints para interagir com dados de usuários, posts e comentários. A aplicação utiliza um banco de dados JSON para persistência de dados.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Express**: Framework web para Node.js.
- **Jest**: Framework de teste para JavaScript.
- **ESLint**: Ferramenta de linting para identificar e corrigir problemas no código.
- **Prettier**: Formatador de código.
- **Docker:** Plataforma de contêineres para empacotar e distribuir a aplicação.
- **Database:** Banco de dados em JSON com persistência automática.

### Rotas

| Método | Rota                  | Descrição                            | Controller                  |
| :----- | :-------------------- | :----------------------------------- | :-------------------------- |
| GET    | `/users/:id`          | Busca os dados de um usuário.        | `getUserController`         |
| GET    | `/users/:id/full`     | Busca dados completos de um usuário. | `getFullUserController`     |
| GET    | `/users/:id/posts`    | Busca os posts de um usuário.        | `getUserPostsController`    |
| GET    | `/posts/:id/comments` | Busca os comentários de um post.     | `getPostCommentsController` |

### Entidades

- **User**
- **Post**
- **Comment**

### Casos de Uso (Use Cases)

- **GetPostCommentsUseCase**
- **GetUserPostsUseCase**
- **GetUserUseCase**

### Controllers

- **GetPostCommentsController**
- **GetFullUserController**
- **GetUserController**
- **GetUserPostsController**

### Repositórios (Interfaces)

- **ICommentRepository**
- **IPostRepository**
- **IUserRepository**

### Repositórios (Implementações)

- **CommentRepository**
- **PostRepository**
- **UserRepository**

### Mappers

- **CommentMapper**
- **PostMapper**
- **UserMapper**

## Testes

Os testes de integração estão localizados na pasta `tests/integration` e garantem o funcionamento correto das rotas da API.

### Testes de Posts (`tests/integration/posts/post.test.ts`)

- **`should return comments for a valid post ID`**: Verifica se a rota `GET /api/posts/:postId/comments` retorna uma lista de comentários (código 200) para um ID de post válido.
- **`should return 404 for a post with no comments`**: Verifica se a rota `GET /api/posts/:postId/comments` retorna um erro 404 para um post que não existe ou não tem comentários.
- **`should return 400 for an invalid post ID`**: Verifica se a rota `GET /api/posts/:postId/comments` retorna um erro 400 (Bad Request) quando o ID do post é inválido (não numérico).

### Testes de Usuários (`tests/integration/users/user.test.ts`)

#### Rota `GET /users/:userId`

- **`should return a user for a valid user ID`**: Verifica se a rota `GET /api/users/:userId` retorna os dados de um usuário (código 200) para um ID válido.
- **`should return 404 for a non-existent user ID`**: Verifica se a rota `GET /api/users/:userId` retorna um erro 404 para um usuário que não existe.
- **`should return 400 for an invalid user ID`**: Verifica se a rota `GET /api/users/:userId` retorna um erro 400 quando o ID do usuário é inválido.

#### Rota `GET /users/:userId/posts`

- **`should return posts for a valid user ID`**: Verifica se a rota `GET /api/users/:userId/posts` retorna uma lista de posts (código 200) para um ID de usuário válido.
- **`should return an empty array for a user with no posts`**: Verifica se a rota `GET /api/users/:userId/posts` retorna uma lista vazia para um usuário que não possui posts.
- **`should return 400 for an invalid user ID`**: Verifica se a rota `GET /api/users/:userId/posts` retorna um erro 400 quando o ID do usuário é inválido.

#### Rota `GET /users/:userId/full`

- **`should return full user data for a valid user ID`**: Verifica se a rota `GET /api/users/:userId/full` retorna os dados completos de um usuário (usuário, posts e comentários) para um ID válido.
- **`should return 404 for a non-existent user ID`**: Verifica se a rota `GET /api/users/:userId/full` retorna um erro 404 para um usuário que não existe.
- **`should return 400 for an invalid user ID`**: Verifica se a rota `GET /api/users/:userId/full` retorna um erro 400 quando o ID do usuário é inválido.
