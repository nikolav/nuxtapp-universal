# syntax=docker/dockerfile:1

#build>        docker build -t nuxtapp .
#build:clean>  docker build --no-cache --pull -t nuxtapp .

# build stage
FROM node:20-alpine AS build
WORKDIR /usr/app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build


# runtime stage
FROM node:20-alpine AS runner
WORKDIR /usr/app

ENV ENV=production
ENV NODE_ENV=production
ENV NUXT_SITE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# install wget
RUN apk add --no-cache wget

# copy runtime output only
COPY --from=build /usr/app/.output ./.output
COPY --from=build /usr/app/package.json ./package.json

# non-root user
RUN addgroup -S nodejs && adduser -S nuxt -G nodejs
USER nuxt

# healthcheck inside container
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1:3000/healthz || exit 1

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
