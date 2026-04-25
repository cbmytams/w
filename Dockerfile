FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
# `npm ci` is strict on lockfile/registry parity. We use `npm install` so a
# Dockerfile build does not break when the lockfile was last regenerated on a
# slightly different npm version (Mac vs Alpine had drift).
RUN npm install --no-audit --no-fund --ignore-scripts

FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
