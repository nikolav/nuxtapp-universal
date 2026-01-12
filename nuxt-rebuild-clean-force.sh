#!/usr/bin/env bash
set -euo pipefail

echo "🧹 Cleaning dependencies and build artifacts..."

rm -rf \
  node_modules \
  .nuxt \
  .output \
  dist \
  package-lock.json \
  pnpm-lock.yaml \
  yarn.lock

echo "🗑️  Clearing npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
npm install --no-audit --no-fund

echo "⚙️  Preparing Nuxt..."
npm run postinstall

echo "✅ Done."
