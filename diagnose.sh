#!/bin/bash

# Graphitube - Diagnostic Script
# يشخص المشاكل ويعطيك الحل

echo "═══════════════════════════════════════════════════════"
echo "🔍 تشخيص شامل - Graphitube PWA"
echo "═══════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        return 0
    else
        echo -e "${RED}❌ $1${NC}"
        ((ERRORS++))
        return 1
    fi
}

warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Check Git
echo "1️⃣  فحص Git Repository"
echo "─────────────────────────────────────────────────────"

if git rev-parse --git-dir > /dev/null 2>&1; then
    check "Git repository موجود"
    
    # Get remote URL
    REMOTE_URL=$(git remote get-url origin 2>/dev/null)
    if [ -n "$REMOTE_URL" ]; then
        info "Remote URL: $REMOTE_URL"
        
        # Extract repo name
        REPO_NAME=$(echo "$REMOTE_URL" | sed -E 's/.*[:/]([^/]+)\/([^/.]+)(\.git)?$/\2/')
        echo -e "${BLUE}📦 اسم الريبو المكتشف: ${YELLOW}$REPO_NAME${NC}"
    else
        warn "لم يتم العثور على remote origin"
    fi
else
    check "Git repository موجود" && false
    echo ""
    echo -e "${RED}❌ هذا المجلد ليس Git repository${NC}"
    echo "قم بتهيئة Git:"
    echo "  git init"
    echo "  git remote add origin https://github.com/USERNAME/REPO.git"
    exit 1
fi

echo ""

# 2. Check vite.config.ts
echo "2️⃣  فحص vite.config.ts"
echo "─────────────────────────────────────────────────────"

if [ -f "vite.config.ts" ]; then
    check "vite.config.ts موجود"
    
    # Get base path from vite.config.ts
    BASE_PATH=$(grep "base:" vite.config.ts | sed -E "s/.*base: '(.*)'.*/\1/")
    echo -e "${BLUE}📍 Base path الحالي: ${YELLOW}$BASE_PATH${NC}"
    
    # Compare with repo name
    if [ -n "$REPO_NAME" ]; then
        EXPECTED_BASE="/$REPO_NAME/"
        
        if [ "$BASE_PATH" = "$EXPECTED_BASE" ]; then
            check "base path مطابق لاسم الريبو"
        else
            warn "base path غير مطابق!"
            echo -e "   ${RED}الحالي: $BASE_PATH${NC}"
            echo -e "   ${GREEN}المتوقع: $EXPECTED_BASE${NC}"
            echo ""
            echo -e "${YELLOW}💡 هل تريد التصحيح؟${NC}"
            read -p "اكتب 'yes' للتصحيح: " -r
            if [[ $REPLY = "yes" ]]; then
                sed -i.backup "s|base: '[^']*'|base: '$EXPECTED_BASE'|g" vite.config.ts
                sed -i.backup "s|scope: '[^']*'|scope: '$EXPECTED_BASE'|g" vite.config.ts
                sed -i.backup "s|start_url: '[^']*'|start_url: '$EXPECTED_BASE'|g" vite.config.ts
                sed -i.backup "s|id: '[^']*'|id: '$EXPECTED_BASE'|g" vite.config.ts
                check "تم تصحيح vite.config.ts"
            fi
        fi
    fi
else
    check "vite.config.ts موجود" && false
fi

echo ""

# 3. Check package.json
echo "3️⃣  فحص package.json"
echo "─────────────────────────────────────────────────────"

if [ -f "package.json" ]; then
    check "package.json موجود"
    
    # Check for required packages
    if grep -q "vite-plugin-pwa" package.json; then
        check "vite-plugin-pwa مثبت"
    else
        warn "vite-plugin-pwa غير مثبت"
    fi
    
    if grep -q "react-router-dom" package.json; then
        check "react-router-dom مثبت"
    else
        warn "react-router-dom غير مثبت"
    fi
else
    check "package.json موجود" && false
fi

echo ""

# 4. Check node_modules
echo "4️⃣  فحص node_modules"
echo "─────────────────────────────────────────────────────"

if [ -d "node_modules" ]; then
    check "node_modules موجود"
else
    warn "node_modules غير موجود"
    echo -e "${YELLOW}قم بتشغيل: npm install${NC}"
fi

echo ""

# 5. Check build
echo "5️⃣  فحص البناء"
echo "─────────────────────────────────────────────────────"

if [ -d "dist" ]; then
    info "dist/ موجود"
    
    if [ -f "dist/index.html" ]; then
        check "dist/index.html موجود"
        
        # Check if assets are referenced correctly
        if grep -q "$BASE_PATH" dist/index.html; then
            check "المسارات في index.html صحيحة"
        else
            warn "المسارات في index.html قد تكون خاطئة"
        fi
    else
        warn "dist/index.html غير موجود"
    fi
    
    # Check manifest
    if [ -f "dist/manifest.webmanifest" ]; then
        check "manifest.webmanifest موجود"
    else
        warn "manifest.webmanifest غير موجود"
    fi
else
    warn "dist/ غير موجود - لم يتم البناء بعد"
    echo -e "${YELLOW}قم بتشغيل: npm run build${NC}"
fi

echo ""

# 6. Check GitHub Actions
echo "6️⃣  فحص GitHub Actions"
echo "─────────────────────────────────────────────────────"

if [ -f ".github/workflows/deploy.yml" ]; then
    check ".github/workflows/deploy.yml موجود"
else
    warn ".github/workflows/deploy.yml غير موجود"
    echo -e "${YELLOW}قد تحتاج لإنشائه للنشر التلقائي${NC}"
fi

echo ""

# 7. Check important files
echo "7️⃣  فحص الملفات المهمة"
echo "─────────────────────────────────────────────────────"

[ -f "index.html" ] && check "index.html" || warn "index.html غير موجود"
[ -f "src/main.tsx" ] && check "src/main.tsx" || warn "src/main.tsx غير موجود"
[ -f "src/app/App.tsx" ] && check "src/app/App.tsx" || warn "src/app/App.tsx غير موجود"
[ -f "public/404.html" ] && check "public/404.html" || warn "public/404.html غير موجود"

echo ""

# Summary
echo "═══════════════════════════════════════════════════════"
echo "📊 ملخص التشخيص"
echo "═══════════════════════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ كل شيء يبدو على ما يرام!${NC}"
    echo ""
    echo "الخطوات التالية:"
    echo "1. تأكد من البناء: npm run build"
    echo "2. ارفع على GitHub: git push origin main"
    echo "3. افتح: https://USERNAME.github.io/$REPO_NAME/"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  وجدنا $WARNINGS تحذير(ات)${NC}"
    echo ""
    echo "التحذيرات لن تمنع عمل التطبيق، لكن يُفضل إصلاحها."
else
    echo -e "${RED}❌ وجدنا $ERRORS خطأ و $WARNINGS تحذير${NC}"
    echo ""
    echo "يجب إصلاح الأخطاء قبل المتابعة."
fi

echo ""

# Recommendations
echo "═══════════════════════════════════════════════════════"
echo "💡 توصيات"
echo "═══════════════════════════════════════════════════════"
echo ""

if [ -n "$REPO_NAME" ] && [ -n "$BASE_PATH" ]; then
    EXPECTED="/$REPO_NAME/"
    if [ "$BASE_PATH" != "$EXPECTED" ]; then
        echo -e "${YELLOW}🔧 يجب تصحيح base path:${NC}"
        echo "   افتح vite.config.ts"
        echo "   غير السطر 9 إلى:"
        echo -e "   ${GREEN}base: '$EXPECTED',${NC}"
        echo ""
    fi
fi

if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo -e "${YELLOW}🔨 قم بالبناء:${NC}"
    echo "   npm run build"
    echo ""
fi

if [ $ERRORS -gt 0 ] || [ $WARNINGS -gt 0 ]; then
    echo -e "${BLUE}📚 للمزيد من المساعدة:${NC}"
    echo "   - اقرأ: DIAGNOSE.md"
    echo "   - اقرأ: حل_الصفحة_البيضاء.md"
    echo "   - اقرأ: ابدأ_هنا_الإصلاح.md"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
