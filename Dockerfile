# syntax=docker/dockerfile:1

#build>        docker build -t 0imbn7v6rkw/nuxtapp .
#build:clean>  docker build --no-cache --pull -t 0imbn7v6rkw/nuxtapp .

# build stage
FROM node:20-alpine AS build
WORKDIR /usr/app

# dependency manifests first (best cache hit-rate)
COPY package.json package-lock.json* ./

# prefer deterministic installs when lockfile exists
# buildkit cache mount speeds up installs across builds
RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then npm ci; else npm install; fi

# copy app, build
COPY . .
RUN npm run build

# sanity check entry file exists
RUN test -f .output/server/index.mjs

# Prune dev deps AFTER build, so runtime doesn't need a second install
RUN --mount=type=cache,target=/root/.npm \
  npm prune --omit=dev && npm cache clean --force


# runtime stage
FROM node:20-alpine AS runner
WORKDIR /usr/app

ENV \
  ENV=production \
  NODE_ENV=production \
  NUXT_SITE_ENV=production \
  NITRO_HOST=0.0.0.0 \
  NITRO_PORT=3000

# only runtime deps (wget for healthcheck)
RUN apk add --no-cache wget

# Copy runtime artifacts + pruned node_modules
COPY --from=build /usr/app/.output ./.output
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package.json ./package.json

# Install production deps (again from package.json only)
RUN npm install --omit=dev && npm cache clean --force

# Non-root user (use built-in node user if you want, but this is fine)
RUN addgroup -S nodejs && adduser -S nuxt -G nodejs
USER nuxt

# healthcheck inside container
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:3000/healthz || exit 1

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
