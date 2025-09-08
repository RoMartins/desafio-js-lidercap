# Arquitetura do Projeto

## Tecnologias Utilizadas

- 🔷 **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- 🟢 **Node.js**: Ambiente de execução para JavaScript no servidor.
- ⚫ **Express.js**: Framework para aplicações web em Node.js.
- 🃏 **Jest**: Framework de testes para JavaScript.
- 🔵 **ESLint**: Ferramenta para identificar e relatar padrões encontrados no código ECMAScript/JavaScript.
- ⚫ **Prettier**: Ferramenta para formatação de código.

## Estrutura de Pastas

```
.
├── ARCHITECTURE.md            # Documentação da arquitetura do projeto
├── Dockerfile                 # Configuração para criar uma imagem Docker da aplicação
├── jest.config.js             # Configuração do Jest para testes
├── package.json               # Metadados do projeto e dependências
├── tsconfig.json              # Configuração do compilador TypeScript
├── src/                       # Código-fonte da aplicação
│   ├── application/           # Camada de aplicação (casos de uso)
│   │   ├── errors/            # Erros específicos da aplicação
│   │   └── usecases/          # Casos de uso do sistema
│   │       ├── posts/
│   │       └── users/
│   ├── domain/                # Camada de domínio (entidades e regras de negócio)
│   │   ├── entities/          # Entidades de negócio
│   │   └── repositories/      # Interfaces dos repositórios
│   ├── infra/                 # Camada de infraestrutura (detalhes de implementação)
│   │   ├── database/          # Configuração e acesso ao banco de dados
│   │   │   └── DBJson/        # Implementação do banco de dados com um arquivo JSON
│   │   │       ├── mappers/     # Mapeadores de dados entre domínio e persistência
│   │   │       └── repositories/ # Implementações dos repositórios
│   │   └── http/              # Configuração do servidor HTTP (Express)
│   │       ├── controllers/   # Controladores das rotas
│   │       └── routes/        # Definição das rotas da API
│   ├── kernel/                # Núcleo da aplicação (DI, etc.)
│   │   └── di/                # Injeção de dependência
│   ├── main/                  # Ponto de entrada da aplicação
│   └── shared/                # Código compartilhado
│       └── types/             # Tipos e interfaces compartilhados
└── tests/                     # Testes da aplicação
    └── integration/           # Testes de integração
        ├── posts/
        └── users/
```

## Arquitetura Hexagonal E Separação de Responsabilidades

A Arquitetura Hexagonal divide o sistema em camadas, com a camada de domínio no centro. As camadas externas se comunicam com o domínio através de "portas" (interfaces) e "adaptadores", segregando responsabilidades.

- **Domínio (`src/domain`)**: O coração da aplicação. Contém as entidades de negócio e as interfaces dos repositórios (portas). Não depende de nenhuma outra camada.
- **Aplicação (`src/application`)**: Contém a lógica de negócio da aplicação (casos de uso). Depende da camada de domínio, mas não da camada de infraestrutura.
- **Infraestrutura (`src/infra`)**: Contém os detalhes de implementação, como o banco de dados, o framework HTTP e outros serviços externos. Depende das camadas de aplicação e domínio.
- **Main (`src/main`)**: Responsável por compor a aplicação, incluindo a injeção de dependências e a inicialização do servidor web.

## Padrões de Projeto (Design Patterns) e Princípios SOLID

- **Padrão de Repositório**: Usado para abstrair a camada de acesso a dados.
- **Padrão de Injeção de Dependência**: O projeto utiliza um container de injeção de dependências (`src/kernel/di/Registry.ts`) para gerenciar as dependências entre as camadas.
- **Padrão de Mapeador (Mapper)**: Convertem os dados entre o formato do banco de dados e as entidades de domínio.
- **Padrão de Decorator**: O decorador `@Injectable` é usado para marcar classes que podem ser gerenciadas pelo contêiner de injeção de dependência.

- **Princípio da Responsabilidade Única (SRP)**: Cada classe tem uma única responsabilidade. Por exemplo, os controladores lidam com as requisições HTTP, os casos de uso executam a lógica de negócio e os repositórios acessam os dados.
- **Princípio do Aberto/Fechado (OCP)**: A arquitetura é aberta para extensão, mas fechada para modificação. Novas funcionalidades podem ser adicionadas criando novos casos de uso, repositórios, etc., sem alterar o código existente.
- **Princípio da Substituição de Liskov (LSP)**: O uso de interfaces para os repositórios permite que diferentes implementações sejam usadas de forma intercambiável.
- **Princípio da Segregação de Interfaces (ISP)**: As interfaces dos repositórios são específicas para as necessidades do domínio, evitando que as classes dependam de métodos que não usam.
- **Princípio da Inversão de Dependência (DIP)**: A camada de aplicação depende de abstrações (interfaces) na camada de domínio, não de implementações concretas na camada de infraestrutura. A injeção de dependência é usada para fornecer as implementações concretas em tempo de execução.
