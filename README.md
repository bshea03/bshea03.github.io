# Brady Shea Portfolio - Monorepo

A monorepo containing Brady Shea's portfolio website with a Vue 3 client and Express server.

## Project Structure

```
.
├── packages/
│   ├── client/         # Vue 3 frontend application
│   ├── server/         # Express REST API
│   └── shared/         # Shared TypeScript types
├── package.json        # Root workspace configuration
└── pnpm-workspace.yaml # pnpm workspace config
```

## Getting Started

### Prerequisites

- Node.js (^20.19.0 || >=22.12.0)
- pnpm

### Installation

Install all dependencies across all packages:

```bash
pnpm install
```

### Development

Start both client and server in development mode:

```bash
pnpm dev
```

Or run them individually:

```bash
# Client only (runs on http://localhost:5173)
pnpm dev:client

# Server only (runs on http://localhost:8080)
pnpm dev:server
```

### Building

Build all packages:

```bash
pnpm build
```

Build individual packages:

```bash
pnpm build:client
pnpm build:server
```

### Type Checking

Run type checking across all packages:

```bash
pnpm type-check
```

### Linting & Formatting

```bash
pnpm lint
pnpm format
```

## Packages

### Client (`packages/client`)

Vue 3 portfolio website with:

- Tailwind CSS for styling
- Vue Router for navigation
- Pinia for state management
- TypeScript support

### Server (`packages/server`)

Express REST API providing:

- Portfolio data endpoints (`/v1/portfolio`)
- Individual resource endpoints (`/v1/jobs`, `/v1/projects`, etc.)
- CORS enabled
- TypeScript support

### Shared (`packages/shared`)

Shared TypeScript types used by both client and server:

- `Job`, `Project`, `Award`, `Skill` types
- Portfolio data structures

## Environment Variables

### Client

Create `packages/client/.env.development`:

```
VITE_API_URL=http://localhost:8080/
```

For production, create `packages/client/.env.production`:

```
VITE_API_URL=https://your-production-api.com/
```

## External Services

The portfolio uses an external Go-based WebSocket service for the chat feature. This service is separate from the monorepo.

## Deployment

The client is deployed to GitHub Pages, while the server can be deployed to any Node.js hosting platform.

## License

Private
