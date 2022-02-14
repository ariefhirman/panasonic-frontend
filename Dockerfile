# Stage 1 (named "builder"): Production React Build
FROM node:14-alpine AS dependencies
WORKDIR /app
COPY package.json .
RUN npm install --no-package-lock

FROM node:14-alpine AS builder
WORKDIR /app
COPY . ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
