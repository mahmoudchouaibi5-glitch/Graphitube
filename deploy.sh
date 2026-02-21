#!/bin/bash

# Quick Deploy Script - Graphitube
# سكريبت نشر سريع

echo "═══════════════════════════════════════════════════════"
echo "🚀 Graphitube - Quick Deploy"
echo "═══════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Check if we're in a git repo
echo -e "${BLUE}1️⃣  فحص Git Repository${NC}"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ ليس Git repository${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git repository موجود${NC}"
echo ""

# Step 2: Check for uncommitted changes
echo -e "${BLUE}2️⃣  فحص التغييرات${NC}"
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  لا توجد تغييرات جديدة${NC}"
else
    echo -e "${GREEN}✅ توجد تغييرات للرفع${NC}"
fi
echo ""

# Step 3: Build
echo -e "${BLUE}3️⃣  البناء${NC}"
echo "جاري البناء..."

if npm run build; then
    echo -e "${GREEN}✅ البناء نجح${NC}"
else
    echo -e "${RED}❌ فشل البناء${NC}"
    exit 1
fi
echo ""

# Step 4: Check dist
echo -e "${BLUE}4️⃣  فحص dist/  ${NC}"
if [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✅ dist/index.html موجود${NC}"
    
    # Count files in dist
    FILE_COUNT=$(find dist -type f | wc -l)
    echo -e "${GREEN}   عدد الملفات: $FILE_COUNT${NC}"
else
    echo -e "${RED}❌ dist/index.html غير موجود${NC}"
    exit 1
fi
echo ""

# Step 5: Git add
echo -e "${BLUE}5️⃣  إضافة الملفات لـ Git${NC}"
git add .
echo -e "${GREEN}✅ تمت الإضافة${NC}"
echo ""

# Step 6: Commit
echo -e "${BLUE}6️⃣  Commit${NC}"
echo "رسالة الـ commit:"
read -p "اكتب رسالة (أو اضغط Enter للافتراضية): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

if git commit -m "$COMMIT_MSG"; then
    echo -e "${GREEN}✅ Commit نجح${NC}"
else
    echo -e "${YELLOW}⚠️  لا توجد تغييرات للـ commit (ربما تم commit كل شيء)${NC}"
fi
echo ""

# Step 7: Push
echo -e "${BLUE}7️⃣  رفع إلى GitHub${NC}"
echo "جاري الرفع..."

if git push origin main; then
    echo -e "${GREEN}✅ تم الرفع بنجاح${NC}"
else
    echo -e "${RED}❌ فشل الرفع${NC}"
    echo ""
    echo "جرب:"
    echo "  git push origin main --force"
    exit 1
fi
echo ""

# Step 8: Success message
echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 تم الرفع بنجاح!${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}الخطوات التالية:${NC}"
echo ""
echo "1️⃣  دوز لـ GitHub Actions:"
echo -e "   ${YELLOW}https://github.com/mahmoudchouaibi5-glitch/Graphitube/actions${NC}"
echo ""
echo "2️⃣  تسنّى 2-5 دقائق حتى يكمل البناء (أخضر ✅)"
echo ""
echo "3️⃣  بعدها افتح Debug Panel:"
echo -e "   ${YELLOW}https://mahmoudchouaibi5-glitch.github.io/Graphitube/debug.html${NC}"
echo ""
echo "4️⃣  إلا كان كلشي أخضر، افتح الموقع:"
echo -e "   ${YELLOW}https://mahmoudchouaibi5-glitch.github.io/Graphitube/${NC}"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}💡 نصيحة:${NC} استعمل hard refresh (Ctrl+Shift+R) إلا ماشفتيش التغييرات"
echo ""
