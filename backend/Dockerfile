# --- Étape 1 : Build TypeScript ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

# Compilation TypeScript
RUN npx tsc && \
    echo "👍 Compilation TS terminée" && \
    ls -la dist

# --- Étape 2 : Exécution en production ---
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

# Copier les certificats et le script d'initialisation DB
COPY certs ./certs
COPY db ./db

EXPOSE 4000

CMD ["node", "dist/server.js"]