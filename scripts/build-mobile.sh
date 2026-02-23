#!/bin/bash
# Genie - Mobile Build Script
# This script builds the Next.js app for static export and syncs with Capacitor

set -e

echo "🧞 Genie Mobile Build Script"
echo "=============================="

# Step 1: Enable static export in next.config.ts
echo "📦 Step 1: Configuring Next.js for static export..."
cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
EOF

# Step 2: Build the Next.js app
echo "🔨 Step 2: Building Next.js app..."
pnpm build

# Step 3: Sync with Capacitor
echo "📱 Step 3: Syncing with Capacitor..."
npx cap sync

echo ""
echo "✅ Build complete!"
echo ""
echo "To open in Xcode (iOS):"
echo "  npx cap open ios"
echo ""
echo "To open in Android Studio:"
echo "  npx cap open android"
echo ""
echo "To run on device:"
echo "  npx cap run ios"
echo "  npx cap run android"

# Step 4: Restore server config for development
echo ""
echo "🔄 Restoring development config..."
cat > next.config.ts << 'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
EOF

echo "✅ Development config restored. Run 'pnpm dev' for local development."
