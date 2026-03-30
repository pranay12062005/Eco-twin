FROM node:20-alpine

# Install OpenSSL for Prisma's Rust Engine
RUN apk add --no-cache openssl

WORKDIR /app

# Copy root workspace configs
COPY package*.json ./
COPY tsconfig.json ./

# Copy packages
COPY packages/shared/ ./packages/shared/
COPY eco-twin-api/ ./eco-twin-api/

# Install dependencies (ignoring scripts to strictly install local Prisma safely)
RUN npm ci

# Generate Prisma Client specifically reading from the api schema
RUN npx prisma generate --schema=eco-twin-api/prisma/schema.prisma

# Build the Typescript API
RUN npm run build --workspace=eco-twin-api

# Start the Express server
EXPOSE 3000
CMD ["npm", "start", "--workspace=eco-twin-api"]
