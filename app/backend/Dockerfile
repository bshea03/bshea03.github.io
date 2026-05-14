# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@11.1.1

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY app/backend/package.json ./app/backend/
COPY app/shared/ ./app/shared/

RUN pnpm install --frozen-lockfile --ignore-scripts --filter backend

COPY app/backend/ ./app/backend/

RUN pnpm --filter backend build

# Production stage
FROM node:22-alpine
WORKDIR /app

COPY app/backend/package.json ./

RUN npm install --omit=dev

COPY --from=builder /app/app/backend/dist ./dist
COPY app/backend/cors.json ./dist/backend/cors.json
COPY app/backend/src/data ./dist/backend/src/data

EXPOSE 8080
CMD ["node", "dist/backend/src/index.js"]
