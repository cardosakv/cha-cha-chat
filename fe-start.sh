# Clear output directory
find /home/site/wwwroot -mindepth 1 ! -name start.sh -exec rm -rf {} +

# Install local pnpm
npm install -D pnpm

# Clean node_modules
rm -rf node_modules
pnpm store prune

# Install & build
npx pnpm install --filter cha-cha-chat-fe --shamefully-hoist
npx pnpm build --filter cha-cha-chat-fe

# Start server
PORT=8080 node apps/frontend/.output/server/index.mjs