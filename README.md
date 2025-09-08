# Desafio de Arquitetura de Código - Lidercap

Olá! Este é um projeto de desafio de arquitetura de código, projetado para ser simples de configurar e executar usando Docker.

## Documentação

Para mais detalhes sobre a arquitetura e as decisões de design do projeto, consulte os seguintes documentos:

- [Documentação da Arquitetura](./ARCHITECTURE.md)
- [Documentação Geral](./documentation.md)

## Como Executar o Projeto com Docker

**Requisito:** Para executar este projeto, você precisará ter o [Docker](https://docs.docker.com/get-docker/) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina. Caso não tenha, basta seguir os links para a documentação oficial e instalá-los.

Com o Docker e o Docker Compose instalados, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone <https://github.com/RoMartins/desafio-js-lidercap.git>
    cd desafio-js-lidercap
    ```

2.  **Execute o Docker Compose:**

    O comando a seguir irá construir a imagem Docker e iniciar o contêiner da aplicação. A flag `--build` garante que a imagem será reconstruída, refletindo quaisquer alterações no código.

    ```bash
    docker compose up --build
    ```

    Após a conclusão, a aplicação estará rodando e acessível em `http://localhost:3000`.

## Entendendo o Dockerfile

O `Dockerfile` é uma receita para criar a imagem Docker da nossa aplicação. Aqui está o que cada passo faz:

| Comando                 | Descrição                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `FROM node:22-alpine`   | Define a imagem base para nossa aplicação, que é uma versão leve do Node.js.                   |
| `WORKDIR /usr/src/app`  | Cria um diretório de trabalho dentro do contêiner para organizar nosso código.                 |
| `COPY package*.json ./` | Copia os arquivos de definição de pacotes para o contêiner.                                    |
| `RUN npm install`       | Instala as dependências do projeto definidas no `package.json`.                                |
| `COPY . .`              | Copia todo o código-fonte do projeto para o diretório de trabalho no contêiner.                |
| `RUN npm run lint`      | Executa o linter para garantir que o código siga as diretrizes de estilo.                      |
| `RUN npm run test`      | Executa os testes automatizados para garantir a qualidade e o funcionamento correto do código. |
| `RUN npm run build`     | Compila o código TypeScript para JavaScript, que é o que o Node.js executa.                    |
| `EXPOSE 3000`           | Informa ao Docker que o contêiner escutará na porta 3000 em tempo de execução.                 |
| `CMD [...]`             | Define o comando padrão para executar a aplicação quando o contêiner for iniciado.             |
