# Estágio 1: Builder - Onde a mágica de build, teste e lint acontece
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependência e instala TUDO (incluindo devDependencies)
COPY package*.json ./
RUN npm install

# Copia todo o resto do código fonte
COPY . .

# --- Validação ---
# Roda o linter. Se falhar, o build para aqui.
RUN npm run lint

# Roda os testes. Se falhar, o build para aqui.
RUN npm run test

# --- Build ---
# Compila o TypeScript para JavaScript. O resultado vai para a pasta /dist
RUN npm run build

# Estágio 2: Production - A imagem final e enxuta
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala APENAS as dependências de produção
RUN npm install --omit=dev

# Copia o código compilado e o db.json do estágio 'builder'
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/infra/database/DBJson/db.json ./dist/infra/database/DBJson/db.json

# Expõe a porta que a aplicação vai usar (ajuste se for diferente)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main/app.js"]
