# Install local pnpm
npm install -D pnpm

# Install & build
npx pnpm install --filter cha-cha-chat-fe --shamefully-hoist
npx pnpm build --filter cha-cha-chat-fe

# Start server
PORT=8080 node apps/frontend/.output/server/index.mjs