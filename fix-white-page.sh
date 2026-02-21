#!/bin/bash

# Script لإصلاح مشكلة الصفحة البيضاء - Graphitube PWA
# Fix White Page Issue - GitHub Pages

echo "═══════════════════════════════════════════════════════"
echo "🔧 إصلاح مشكلة الصفحة البيضاء | Fix White Page Issue"
echo "═══════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check current repository name from git remote
echo -e "${BLUE}📍 الخطوة 1: فحص اسم الريبو${NC}"
echo "─────────────────────────────────────────────────────"

if git remote -v &> /dev/null; then
    REMOTE_URL=$(git remote get-url origin 2>/dev/null)
    
    if [ -n "$REMOTE_URL" ]; then
        # Extract repo name from URL
        REPO_NAME=$(echo "$REMOTE_URL" | sed -E 's/.*[:/]([^/]+)\/([^/.]+)(\.git)?$/\2/')
        
        echo -e "${GREEN}✅ اسم الريبو المكتشف:${NC} $REPO_NAME"
        echo ""
        
        # Check if it matches vite.config.ts
        if grep -q "base: '/$REPO_NAME/'" vite.config.ts; then
            echo -e "${GREEN}✅ الإعدادات صحيحة!${NC}"
            echo "   base path في vite.config.ts مطابق لاسم الريبو"
            echo ""
        else
            echo -e "${YELLOW}⚠️  تحذير: عدم تطابق!${NC}"
            echo "   اسم الريبو: $REPO_NAME"
            
            CURRENT_BASE=$(grep "base:" vite.config.ts | sed -E "s/.*base: '(.*)'.*/\1/")
            echo "   base في vite.config.ts: $CURRENT_BASE"
            echo ""
            
            read -p "هل تريد تصحيح vite.config.ts؟ (y/n): " -n 1 -r
            echo ""
            
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Backup original file
                cp vite.config.ts vite.config.ts.backup
                echo -e "${BLUE}📁 تم عمل نسخة احتياطية: vite.config.ts.backup${NC}"
                
                # Update base path
                sed -i.tmp "s|base: '[^']*'|base: '/$REPO_NAME/'|g" vite.config.ts
                
                # Update manifest paths
                sed -i.tmp "s|scope: '[^']*'|scope: '/$REPO_NAME/'|g" vite.config.ts
                sed -i.tmp "s|start_url: '[^']*'|start_url: '/$REPO_NAME/'|g" vite.config.ts
                sed -i.tmp "s|id: '[^']*'|id: '/$REPO_NAME/'|g" vite.config.ts
                sed -i.tmp "s|src: '[^']*icon|src: '/$REPO_NAME/icon|g" vite.config.ts
                
                rm -f vite.config.ts.tmp
                
                echo -e "${GREEN}✅ تم التحديث بنجاح!${NC}"
                echo ""
            fi
        fi
    else
        echo -e "${RED}❌ لم يتم العثور على remote repository${NC}"
        echo "تأكد من أنك في مجلد المشروع الصحيح"
        exit 1
    fi
else
    echo -e "${RED}❌ هذا ليس مشروع Git${NC}"
    echo "قم بتهيئة Git أولاً: git init"
    exit 1
fi

# Step 2: Clean cache
echo -e "${BLUE}🧹 الخطوة 2: تنظيف الملفات المؤقتة${NC}"
echo "─────────────────────────────────────────────────────"

if [ -d "dist" ]; then
    rm -rf dist
    echo -e "${GREEN}✅ تم مسح dist/${NC}"
fi

if [ -d ".vite" ]; then
    rm -rf .vite
    echo -e "${GREEN}✅ تم مسح .vite/${NC}"
fi

if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo -e "${GREEN}✅ تم مسح node_modules/.vite/${NC}"
fi

echo ""

# Step 3: Rebuild
echo -e "${BLUE}🔨 الخطوة 3: إعادة البناء${NC}"
echo "─────────────────────────────────────────────────────"

if npm run build; then
    echo -e "${GREEN}✅ البناء نجح!${NC}"
    echo ""
else
    echo -e "${RED}❌ فشل البناء${NC}"
    echo "تحقق من الأخطاء أعلاه"
    exit 1
fi

# Step 4: Verify build output
echo -e "${BLUE}🔍 الخطوة 4: التحقق من الملفات${NC}"
echo "─────────────────────────────────────────────────────"

if [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✅ dist/index.html موجود${NC}"
else
    echo -e "${RED}❌ dist/index.html غير موجود${NC}"
    exit 1
fi

if [ -f "dist/manifest.webmanifest" ]; then
    echo -e "${GREEN}✅ dist/manifest.webmanifest موجود${NC}"
else
    echo -e "${YELLOW}⚠️  manifest.webmanifest غير موجود${NC}"
fi

# Check asset paths in index.html
if grep -q "/$REPO_NAME/assets" dist/index.html; then
    echo -e "${GREEN}✅ مسارات الملفات صحيحة في index.html${NC}"
else
    echo -e "${YELLOW}⚠️  تحذير: المسارات قد لا تكون صحيحة${NC}"
fi

echo ""

# Step 5: Git status
echo -e "${BLUE}📊 الخطوة 5: حالة Git${NC}"
echo "─────────────────────────────────────────────────────"

if git diff --quiet vite.config.ts; then
    echo -e "${GREEN}✅ لا توجد تغييرات على vite.config.ts${NC}"
else
    echo -e "${YELLOW}⚠️  تم تعديل vite.config.ts${NC}"
    echo ""
    echo -e "${BLUE}التغييرات:${NC}"
    git diff vite.config.ts | head -20
    echo ""
fi

echo ""

# Final instructions
echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 الإصلاح اكتمل!${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "الخطوات التالية:"
echo ""
echo "1️⃣  قم برفع التغييرات إلى GitHub:"
echo "   ${YELLOW}git add .${NC}"
echo "   ${YELLOW}git commit -m \"Fix: Update base path to /$REPO_NAME/\"${NC}"
echo "   ${YELLOW}git push origin main${NC}"
echo ""
echo "2️⃣  انتظر 2-3 دقائق لاكتمال النشر"
echo ""
echo "3️⃣  افتح الموقع (بعد استبدال USERNAME):"
echo "   ${BLUE}https://USERNAME.github.io/$REPO_NAME/${NC}"
echo ""
echo "4️⃣  إذا لم يظهر، قم بـ Hard Refresh:"
echo "   ${YELLOW}Ctrl + Shift + R${NC} (Chrome/Edge/Firefox)"
echo "   ${YELLOW}Cmd + Shift + R${NC}  (Safari)"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}💡 نصيحة:${NC} افتح Console (F12) للتحقق من الأخطاء"
echo ""
