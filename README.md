# TanStack + Fastify Notes App

Full-stack notes CRUD app built as a monorepo with:

- `frontend/`: TanStack Start + React app (port `3000`)
- `backend/`: Fastify + Drizzle + PostgreSQL API (port `3002`)

This project supports creating, listing, updating, and deleting notes.

## Demo

![App Demo](./Demo.gif)

## Stack

### Frontend (`frontend/`)

- React 19
- TanStack Start + TanStack Router
- TanStack Query
- Vite
- Tailwind CSS 4
- shadcn/ui + Radix UI primitives

### Backend (`backend/`)

- Fastify 5
- Zod + `fastify-type-provider-zod`
- Drizzle ORM
- PostgreSQL (`postgres` driver)
- Bun runtime (scripts are Bun-oriented)

## Monorepo Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── db/schema.ts
│   │   └── modules/notes/
│   │       ├── notes.routes.ts
│   │       ├── notes.controller.ts
│   │       ├── notes.service.ts
│   │       └── notes.schema.ts
│   └── drizzle/
└── frontend/
		└── src/
				├── routes/
				│   ├── __root.tsx
				│   ├── index.tsx
				│   └── notes/
				│       ├── index.tsx
				│       └── $noteId.tsx
				├── services/notes.ts
				└── schema/notes.ts
```

## Prerequisites

- Bun (recommended)
- PostgreSQL

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DB_NAME
```

### Frontend (`frontend/.env.local`)

```env
API_URL=http://localhost:3002
```

`API_URL` is used by `createServerFn` handlers in `frontend/src/services/notes.ts`.

## Setup

1. Install backend dependencies:

```bash
cd backend
bun install
```

2. Install frontend dependencies:

```bash
cd ../frontend
bun install
```

3. Create env files:

- `backend/.env` with `DATABASE_URL`
- `frontend/.env.local` with `API_URL`

4. Apply database schema/migrations from `backend/`:

```bash
bunx drizzle-kit push
```

## Run In Development

Start both apps in separate terminals.

Backend:

```bash
cd backend
bun run dev
```

Frontend:

```bash
cd frontend
bun run dev
```

App URL: `http://localhost:3000`

## Available Scripts

### Backend (`backend/package.json`)

```bash
bun run start   # bun src/app
bun run dev     # nodemon src/app
```

### Frontend (`frontend/package.json`)

```bash
bun run dev
bun run build
bun run preview
bun run test
bun run lint
bun run format
bun run check
```

## API

All note routes are mounted under `/api/notes`.

### `GET /api/notes`

Returns all notes ordered by `updatedAt DESC`.

### `GET /api/notes/:id`

Returns a single note by id.

### `POST /api/notes`

Creates a note.

Request body:

```json
{
  "title": "New Note",
  "content": "Optional content"
}
```

### `PATCH /api/notes/:id`

Updates a note.

Request body:

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

### `DELETE /api/notes/:id`

Deletes a note and returns the deleted row.

### Backend Validation (Zod)

- `params.id`: string (converted to number in service layer)
- `body.title`: required string
- `body.content`: optional string

## Frontend Routes

- `/` - empty landing route
- `/notes/` - notes list + create/delete UI
- `/notes/$noteId` - note detail + update content

## Data Model

Table: `notes`

- `id`: serial primary key
- `title`: text, not null, default `New Note`
- `content`: text, default `Hellow!`
- `createdAt`: timestamp, default now
- `updatedAt`: timestamp, default now (set to `NOW()` on update)

## Notes

- Backend currently imports `@fastify/cors` but does not register it in `server.ts`.
- Frontend `NotesGenerated` type defines `id` as `string`, while backend returns numeric `id`.
- Root route (`/`) is intentionally empty in current implementation.
