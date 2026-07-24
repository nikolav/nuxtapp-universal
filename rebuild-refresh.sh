#!/usr/bin/env bash
set -euo pipefail

echo "🧹 Cleaning build artifacts..."
rm -rf .nuxt .output dist node_modules/.vite node_modules/.cache node_modules

echo "🧾 Re-resolving deps + regenerating package-lock..."
rm -f package-lock.json
npm install --no-audit --no-fund

echo "⚙️ Preparing Nuxt..."
npm run postinstall

echo "✅ Done."
