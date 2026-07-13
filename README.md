# Portfolio - Monorepo

A monorepo containing my portfolio website with a Vue 3 frontend and Express/Mongo backend.

## Project Structure

```
.
├── app/
│   ├── frontend/         # Vue 3 frontend application
│   ├── backend/         # Express REST API
│   └── shared/         # Shared TypeScript types
├── package.json        # Root workspace configuration
└── pnpm-workspace.yaml # pnpm workspace config
```

## Features

### Admin Page

The admin page allows for dynamic data manipulation and reordering. From here, I can create, update, or delete:

#### Skills
<img width="2558" height="928" alt="image" src="https://github.com/user-attachments/assets/002c4f27-b145-40b9-be55-cc4e3a090ff7" />
<img width="400" height="650" alt="brave_RNBmzXrL8Z" src="https://github.com/user-attachments/assets/7171defd-7108-462c-9fb6-c0913c1d4fec" />

#### Jobs
<img width="2515" height="689" alt="brave_ftF5v9toC9" src="https://github.com/user-attachments/assets/b3a28481-fc90-419f-8bd6-0de4233172a1" />

- Includes image upload to Google Cloud blob storage

#### Awards
<img width="2547" height="707" alt="brave_OLuCI0KPCz" src="https://github.com/user-attachments/assets/3d4dcfda-b72d-49a4-96fd-b2dc5b372809" />

#### Projects
<img width="2545" height="966" alt="image" src="https://github.com/user-attachments/assets/4ea7c076-4285-47d5-83cc-3d701e53c95a" />
<img width="2513" height="902" alt="image" src="https://github.com/user-attachments/assets/eb31ca9c-5d86-422f-855f-dd9a7eadebea" />

- Includes image and README upload to Google Cloud blob storage; READMEs will then be rendered into the HTML like [this](https://bradyshea.dev/readme/celebi).

#### Resume
<img width="524" height="188" alt="image" src="https://github.com/user-attachments/assets/33271bb7-fe52-4dd3-b982-cfbf8cb5abdd" />

- Upload and replace the resume currently displayed from Google Cloud.

## Packages

### Frontend (`app/frontend`)

Vue 3 portfolio website with:

- Tailwind CSS for styling
- Vue Router for navigation
- Pinia for state management
- TypeScript support

### Backend (`app/backend`)

Express REST API providing:

- Portfolio data endpoints (`/v1/portfolio`)
- Individual resource endpoints (`/v1/jobs`, `/v1/projects`, etc.)
- CORS enabled
- TypeScript support

### Shared (`app/shared`)

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

The portfolio uses an external Go-based WebSocket service for the (in-progress) chat feature. This service is separate from the monorepo.

## Deployment

Both the frontend and backend are now being deployed to a DigitalOcean droplet via GitHub Actions.

## License

Private
