#! /usr/bin/bash

# remove Nuxt & build artifacts
rm -rf .nuxt
rm -rf .output
rm -rf dist

# remove dependencies & lockfile
rm -rf node_modules
rm -f package-lock.json yarn.lock pnpm-lock.yaml

# clear npm cache (safe)
npm cache clean --force

# reinstall deps
npm install

# regenerate Nuxt internals
npx nuxt prepare

# start dev server
# npm run dev
echo 'Done.'
