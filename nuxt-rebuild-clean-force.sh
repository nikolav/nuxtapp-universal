#! /usr/bin/bash

# remove Nuxt & build artifacts
# remove dependencies & lockfile
rm -rf node_modules .nuxt .output dist package-lock.json pnpm-lock.yaml yarn.lock

# clear npm cache (safe)
npm cache clean --force

# reinstall deps
npm install

# regenerate Nuxt internals
npx nuxt prepare

# start dev server
# npm run dev
echo 'Done.'
