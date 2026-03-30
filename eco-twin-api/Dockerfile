FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy root configurations
COPY package*.json ./
COPY tsconfig.json ./

# Copy shared package
COPY packages/shared/package*.json ./packages/shared/
COPY packages/shared/ ./packages/shared/

# Copy API package
COPY eco-twin-api/package*.json ./eco-twin-api/
COPY eco-twin-api/src/prisma ./eco-twin-api/src/prisma

# Install all dependencies
RUN npm ci

# Generate Prisma Client
WORKDIR /app/eco-twin-api
RUN npx prisma generate

# Copy the rest of the API source and build
COPY eco-twin-api/src ./src
COPY eco-twin-api/tsconfig.json ./
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared ./packages/shared

WORKDIR /app/eco-twin-api
COPY --from=builder /app/eco-twin-api/package*.json ./
COPY --from=builder /app/eco-twin-api/node_modules ./node_modules
COPY --from=builder /app/eco-twin-api/dist ./dist
COPY --from=builder /app/eco-twin-api/src/prisma ./src/prisma

EXPOSE 3001
ENV NODE_ENV=production

CMD ["npm", "start"]
