#!/usr/bin/env bash
set -euo pipefail

# Git Bash / MSYS fix: do NOT convert /app -> C:/Program Files/Git/app
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

docker run --rm -it \
  -w /app \
  -v "$(pwd):/app" \
  -v nuxt_node_modules:/app/node_modules \
  -v nuxt_npm_cache:/root/.npm \
  node:20-bullseye bash  -lc "npm ci && rm -rf .nuxt .output node_modules/.cache && npm run generate:nuxt "


# node:20-bullseye bash  -lc "rm -rf .nuxt .output node_modules/.cache && npm i && npx nuxt prepare && npx nuxt generate "
