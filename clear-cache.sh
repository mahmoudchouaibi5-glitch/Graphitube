#!/bin/bash

# 🧹 Graphitube Cache Cleaner
# حذف جميع ملفات Cache والبناء

echo "🧹 بدء تنظيف Cache..."

# حذف node_modules
if [ -d "node_modules" ]; then
  echo "🗑️ حذف node_modules..."
  rm -rf node_modules
fi

# حذف .vite cache
if [ -d ".vite" ]; then
  echo "🗑️ حذف .vite..."
  rm -rf .vite
fi

# حذف dist
if [ -d "dist" ]; then
  echo "🗑️ حذف dist..."
  rm -rf dist
fi

# حذف package-lock.json
if [ -f "package-lock.json" ]; then
  echo "🗑️ حذف package-lock.json..."
  rm -f package-lock.json
fi

echo "✅ تم التنظيف بنجاح!"
echo ""
echo "📦 الآن قم بتشغيل:"
echo "   npm install"
echo "   npm run dev"
