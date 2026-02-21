#!/bin/bash

# Graphitube PWA - Setup Verification Script
# This script verifies that all PWA configurations are correct

echo "═══════════════════════════════════════════════════════"
echo "🔍 Graphitube PWA Setup Verification"
echo "═══════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ Found:${NC} $1"
        return 0
    else
        echo -e "${RED}❌ Missing:${NC} $1"
        return 1
    fi
}

check_content() {
    if grep -q "$2" "$1"; then
        echo -e "${GREEN}✅ Verified:${NC} $3"
        return 0
    else
        echo -e "${RED}❌ Missing:${NC} $3 in $1"
        return 1
    fi
}

# Counter for errors
errors=0

echo "📁 1. Checking Project Structure..."
echo "─────────────────────────────────────────────────────"

check_file "package.json" || ((errors++))
check_file "vite.config.ts" || ((errors++))
check_file "index.html" || ((errors++))
check_file "src/main.tsx" || ((errors++))
check_file "src/app/App.tsx" || ((errors++))

echo ""
echo "🖼️ 2. Checking PWA Icons..."
echo "─────────────────────────────────────────────────────"

check_file "public/icon-192.png" || ((errors++))
check_file "public/icon-512.png" || ((errors++))
check_file "public/icon.svg" || ((errors++))

echo ""
echo "📄 3. Checking PWA Pages..."
echo "─────────────────────────────────────────────────────"

check_file "public/offline.html" || ((errors++))
check_file "public/404.html" || ((errors++))

echo ""
echo "⚙️ 4. Checking Vite Configuration..."
echo "─────────────────────────────────────────────────────"

check_content "vite.config.ts" "base: '/Graphitube/'" "Base path set to /Graphitube/" || ((errors++))
check_content "vite.config.ts" "VitePWA" "PWA plugin configured" || ((errors++))
check_content "vite.config.ts" "registerType: 'autoUpdate'" "Service Worker auto-update enabled" || ((errors++))

echo ""
echo "🧭 5. Checking React Router Configuration..."
echo "─────────────────────────────────────────────────────"

check_content "src/app/App.tsx" "BrowserRouter" "BrowserRouter imported" || ((errors++))
check_content "src/app/App.tsx" "basename={import.meta.env.BASE_URL}" "Router basename configured" || ((errors++))

echo ""
echo "🔧 6. Checking Service Worker Registration..."
echo "─────────────────────────────────────────────────────"

check_content "src/main.tsx" "registerSW" "Service Worker registration found" || ((errors++))
check_content "src/main.tsx" "virtual:pwa-register" "PWA virtual module imported" || ((errors++))

echo ""
echo "📦 7. Checking Dependencies..."
echo "─────────────────────────────────────────────────────"

if [ -f "package.json" ]; then
    if grep -q "\"vite-plugin-pwa\"" package.json; then
        echo -e "${GREEN}✅ Installed:${NC} vite-plugin-pwa"
    else
        echo -e "${RED}❌ Missing:${NC} vite-plugin-pwa"
        ((errors++))
    fi
    
    if grep -q "\"workbox-window\"" package.json; then
        echo -e "${GREEN}✅ Installed:${NC} workbox-window"
    else
        echo -e "${RED}❌ Missing:${NC} workbox-window"
        ((errors++))
    fi
    
    if grep -q "\"react-router-dom\"" package.json; then
        echo -e "${GREEN}✅ Installed:${NC} react-router-dom"
    else
        echo -e "${RED}❌ Missing:${NC} react-router-dom"
        ((errors++))
    fi
    
    if grep -q "\"gh-pages\"" package.json; then
        echo -e "${GREEN}✅ Installed:${NC} gh-pages"
    else
        echo -e "${YELLOW}⚠️  Optional:${NC} gh-pages (only needed for manual deploy)"
    fi
fi

echo ""
echo "🚀 8. Checking GitHub Actions..."
echo "─────────────────────────────────────────────────────"

check_file ".github/workflows/deploy.yml" || ((errors++))

if [ -f ".github/workflows/deploy.yml" ]; then
    check_content ".github/workflows/deploy.yml" "npm run build" "Build command present" || ((errors++))
    check_content ".github/workflows/deploy.yml" "actions/deploy-pages" "GitHub Pages deploy action" || ((errors++))
fi

echo ""
echo "📝 9. Checking Documentation..."
echo "─────────────────────────────────────────────────────"

check_file ".gitignore" || ((errors++))
check_file "README-DEPLOYMENT.md" || echo -e "${YELLOW}⚠️  Optional:${NC} README-DEPLOYMENT.md"
check_file "SETUP_COMPLETE.md" || echo -e "${YELLOW}⚠️  Optional:${NC} SETUP_COMPLETE.md"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "📊 Verification Results"
echo "═══════════════════════════════════════════════════════"

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Your Graphitube PWA is ready for deployment! 🎉"
    echo ""
    echo "Next steps:"
    echo "  1. git add ."
    echo "  2. git commit -m 'Ready for deployment'"
    echo "  3. git push origin main"
    echo ""
    echo "Live URL: https://YOUR_USERNAME.github.io/Graphitube/"
else
    echo -e "${RED}❌ Found $errors error(s)${NC}"
    echo ""
    echo "Please fix the errors above before deploying."
    echo "Refer to SETUP_COMPLETE.md for guidance."
fi

echo "═══════════════════════���═══════════════════════════════"
