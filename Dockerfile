FROM node:20-alpine

# Install OpenSSL for Prisma's Rust Engine
RUN apk add --no-cache openssl

WORKDIR /app

# Copy root workspace configs
COPY package*.json ./

# Copy packages
COPY packages/shared/ ./packages/shared/
COPY eco-twin-api/ ./eco-twin-api/

# Install dependencies but SKIP postinstall scripts
# (This prevents the broken prisma v7 from auto-running)
RUN npm ci --ignore-scripts

# Explicitly generate Prisma Client using the SAFE v5.22.0
RUN npx prisma@5.22.0 generate --schema=eco-twin-api/prisma/schema.prisma

# Build the Typescript API
RUN npm run build --workspace=eco-twin-api

# Start the Express server
EXPOSE 7860
CMD ["npm", "start", "--workspace=eco-twin-api"]
