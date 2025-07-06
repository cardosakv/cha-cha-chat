# Cha-Cha-Chat

**Cha-Cha-Chat** is public chat where everyone's invited to chill and chit-chat. It is a real-time web chat application using websockets built for learning.

> 🌐 Try it live: [cha-cha-chat.site](https://cha-cha-chat.site)

## 🛠️ Tech Stack

### Frontend (Nuxt 3)

- **Nuxt 3** – Vue-powered full-stack framework
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Vite** – Lightning-fast bundler and dev server
- **ESLint & Prettier** – Code linting and formatting
- **pnpm** – Fast, disk-efficient package manager

### Backend (NestJS)

- **NestJS** – Scalable server-side framework for Node.js
- **TypeScript** – Strongly typed JavaScript
- **PostgreSQL** – Relational database for data storage
- **Prisma** – Type-safe ORM for PostgreSQL (or any supported DB)
- **Socket.IO** – Real-time communication via WebSockets
- **ESLint & Prettier** – Code linting and formatting
- **pnpm** – Shared workspace package manager

## 🚀 Getting Started

This repo is structured as a Turborepo monorepo using `pnpm` workspaces.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A PostgreSQL instance (local or cloud)
- Vercel (for deployment, optional)

### 1. Clone the repository

```bash
git clone https://github.com/cardosakv/cha-cha-chat.git
cd cha-cha-chat
pnpm install
```

### 2. Configure Environment Variables

Each app has its own `.env` file.

#### For Backend (`/apps/backend/.env`)

```env
PORT=your_backend_app_port
DATABASE_URL=your_postgres_db_url
```

#### For Frontend (`/apps/frontend/.env`)

```env
NUXT_API_BASE_URL=your_backend_api_url
```

### 3. Setup the Database

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
```

### 4. Run Locally

In the root directory:

```bash
pnpm dev
```

This will start on localhost both frontend (port 3000) and backend (port in env or 3001 by default).
