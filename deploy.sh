#!/usr/bin/env bash
set -euo pipefail

IMAGE="0imbn7v6rkw/nuxtapp"
NAME="nuxtapp"

# drop old container if exists before deploy
docker rm -f "$NAME" >/dev/null 2>&1 || true \
&& docker run -d \
  --name "$NAME" \
  --env-file ./.env \
  -e ENV=production \
  -e NODE_ENV=production \
  -e NUXT_SITE_ENV=production \
  -e NITRO_HOST=0.0.0.0 \
  -e NITRO_PORT=3000 \
  -p 127.0.0.1:3000:3000 \
  --restart unless-stopped \
  --health-cmd 'wget -qO- http://127.0.0.1:3000/healthz >/dev/null || exit 1' \
  --health-interval 122s \
  --health-timeout 3s \
  --health-retries 3 \
  --health-start-period 10s \
  "$IMAGE"

# --pull=always \

# docker ps -a --filter "name=$NAME"
# docker logs --tail=122 "$NAME"

# docker rm -f nuxt-app
# docker system prune --all --volumes --force
# docker volume rm nuxt_node_modules nuxt_npm_cache
# docker volume rm vdata

## search fs for file; contains 'foo' or has 'foo' in filename
# find . -type f -not -path "*/node_modules/*" \( -iname "*foo*" -o -exec grep -il "foo" {} \; \)
