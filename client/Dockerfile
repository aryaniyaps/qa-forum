# Base stage with Node.js and pnpm enabled
FROM node:20-slim AS base

# Set pnpm environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack (which includes pnpm)
RUN corepack enable
COPY . /app/

WORKDIR /app/

# Install production dependencies
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

# Install all dependencies and build the application
FROM base AS build
COPY --from=prod-deps /app/node_modules /app/node_modules
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Final stage
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000

# Start the application
CMD [ "pnpm", "start" ]