#!/usr/bin/env bash
set -euo pipefail

# Git Bash / MSYS fix: do NOT convert /app -> C:/Program Files/Git/app
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

docker run --rm -it \
  -w /app \
  -v "$(pwd):/app" \
  -v nuxt_node_modules_et3bhpu:/app/node_modules \
  -v nuxt_cache_et3bhpu:/root/.cache/nuxt \
  -v nuxt_npm_cache_et3bhpu:/root/.npm \
  node:22-slim bash -c "npm i && npm run generate:nuxt "
