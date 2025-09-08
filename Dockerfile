# Usa uma imagem oficial do Node.js como base
FROM node:22-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependência e os instala
COPY package*.json ./
RUN npm install

# Copia todo o código fonte
COPY . .

#linter
RUN npm run lint

#testes
RUN npm run test

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Define o comando para rodar a aplicação
CMD ["node", "dist/main/app.js"]
