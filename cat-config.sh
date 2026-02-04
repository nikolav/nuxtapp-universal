#!/usr/bin/env bash
set -euo pipefail

echo '@@ ./.env'
cat ./.env

echo '@@ ./app/config/vars.env.ts'
cat ./app/config/vars.env.ts
