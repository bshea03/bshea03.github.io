# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@11.1.1

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY app/frontend/package.json ./app/frontend/
COPY app/shared/ ./app/shared/

RUN pnpm install --frozen-lockfile --ignore-scripts --filter frontend

COPY app/frontend/ ./app/frontend/

ENV VITE_API_URL=/
ENV VITE_RESUME_URL=https://storage.googleapis.com/portfolio-blob/resumes/brady-shea-resume.pdf

RUN pnpm --filter frontend build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/app/frontend/dist /usr/share/nginx/html
COPY app/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
