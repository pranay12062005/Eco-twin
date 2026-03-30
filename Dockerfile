FROM node:20-alpine

# Install OpenSSL for Prisma's Rust Engine
RUN apk add --no-cache openssl

WORKDIR /app

# Copy root workspace configs
COPY package.json ./

# Copy packages
COPY packages/shared/ ./packages/shared/
COPY eco-twin-api/ ./eco-twin-api/

# Fresh install (no lockfile needed - resolves correct prisma@5.22.0)
RUN npm install --ignore-scripts

# Generate Prisma Client using the safe v5.22.0
RUN npx prisma@5.22.0 generate --schema=eco-twin-api/prisma/schema.prisma

# Build the shared package first (compiles schemas.ts -> dist/schemas.js)
RUN npm run build --workspace=@eco-twin/shared

# Build the Typescript API
RUN npm run build --workspace=eco-twin-api

# Start the Express server
EXPOSE 7860
CMD ["npm", "start", "--workspace=eco-twin-api"]
