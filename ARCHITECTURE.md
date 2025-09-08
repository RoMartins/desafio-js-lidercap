# Arquitetura do Projeto

## Tecnologias Utilizadas

- 🔷 **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- 🟢 **Node.js**: Ambiente de execução para JavaScript no servidor.
- ⚫ **Express.js**: Framework para aplicações web em Node.js.
- 🃏 **Jest**: Framework de testes para JavaScript.
- 🔵 **ESLint**: Ferramenta para identificar e relatar padrões encontrados no código ECMAScript/JavaScript.
- ⚫ **Prettier**: Ferramenta para formatação de código.

## Padrões de Projeto (Design Patterns)

- **Padrão de Repositório**: Usado para abstrair a camada de acesso a dados.
- **Padrão de Injeção de Dependência**: Usado para gerenciar as dependências entre as classes.
- **Padrão de Mapeador (Mapper)**: Usado para converter dados entre diferentes representações (por exemplo, entidades de domínio e modelos de banco de dados).
- **Padrão de Decorator**: O decorador `@Injectable` é usado para marcar classes que podem ser gerenciadas pelo contêiner de injeção de dependência.

## Princípios SOLID

A arquitetura do projeto segue os princípios SOLID:

- **Princípio da Responsabilidade Única (SRP)**: Cada classe tem uma única responsabilidade. Por exemplo, os controladores lidam com as requisições HTTP, os casos de uso executam a lógica de negócio e os repositórios acessam os dados.
- **Princípio do Aberto/Fechado (OCP)**: A arquitetura é aberta para extensão, mas fechada para modificação. Novas funcionalidades podem ser adicionadas criando novos casos de uso, repositórios, etc., sem alterar o código existente.
- **Princípio da Substituição de Liskov (LSP)**: O uso de interfaces para os repositórios permite que diferentes implementações sejam usadas de forma intercambiável.
- **Princípio da Segregação de Interfaces (ISP)**: As interfaces dos repositórios são específicas para as necessidades do domínio, evitando que as classes dependam de métodos que não usam.
- **Princípio da Inversão de Dependência (DIP)**: A camada de aplicação depende de abstrações (interfaces) na camada de domínio, não de implementações concretas na camada de infraestrutura. A injeção de dependência é usada para fornecer as implementações concretas em tempo de execução.

## Arquitetura Hexagonal (Portas e Adaptadores)

A Arquitetura Hexagonal divide o sistema em camadas, com a camada de domínio no centro. As camadas externas se comunicam com o domínio através de "portas" (interfaces) e "adaptadores" (implementações).

- **Domínio (`src/domain`)**: O coração da aplicação. Contém as entidades de negócio e as interfaces dos repositórios (portas). Não depende de nenhuma outra camada.
- **Aplicação (`src/application`)**: Contém a lógica de negócio da aplicação (casos de uso). Depende da camada de domínio, mas não da camada de infraestrutura.
- **Infraestrutura (`src/infra`)**: Contém os detalhes de implementação, como o banco de dados, o framework HTTP e outros serviços externos. Depende das camadas de aplicação e domínio.
- **Main (`src/main`)**: Responsável por compor a aplicação, incluindo a injeção de dependências e a inicialização do servidor web.

## Separação de Responsabilidades

A arquitetura do projeto promove uma clara separação de responsabilidades:

- **Entidades (`src/domain/entities`)**: Representam os objetos de negócio da aplicação.
- **Repositórios (`src/domain/repositories`)**: Definem as interfaces para acesso a dados, abstraindo a fonte de dados.
- **Casos de Uso (`src/application/usecases`)**: Orquestram o fluxo de negócio, utilizando as entidades e os repositórios.
- **Controladores (`src/infra/http/controllers`)**: Recebem as requisições HTTP, chamam os casos de uso e retornam as respostas.
- **Mappers (`src/infra/database/DBJson/mappers`)**: Convertem os dados entre o formato do banco de dados e as entidades de domínio.

## Estrutura de Pastas

A estrutura de pastas reflete a arquitetura do projeto:

- `src/domain`: Contém as entidades e as interfaces dos repositórios.
- `src/application`: Contém os casos de uso e os erros da aplicação.
- `src/infra`: Contém a implementação dos repositórios, os controladores HTTP e as rotas.
- `src/main`: Contém a configuração da aplicação e a injeção de dependências.
- `tests`: Contém os testes de integração e unitários.

## Injeção de Dependências

O projeto utiliza um container de injeção de dependências (`src/kernel/di/Registry.ts`) para gerenciar as dependências entre as camadas. Isso facilita a substituição de implementações e a escrita de testes.

## Modularização e Escalabilidade

A arquitetura utilizada permite uma alta modularização e escalabilidade:

- **Módulos de Domínio**: Novos módulos de domínio podem ser adicionados sem impactar o restante da aplicação.
- **Adaptadores**: Novos adaptadores podem ser criados para suportar diferentes tipos de bancos de dados, frameworks web ou outros serviços externos.
- **Casos de Uso**: Novos casos de uso podem ser adicionados para estender a funcionalidade da aplicação.
