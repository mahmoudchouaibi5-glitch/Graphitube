# 📱 **إعداد WhatsApp Business API**

## ⚠️ **المشاكل الحالية**

### 1️⃣ **WhatsApp OAuth Error - Invalid Access Token**
```
Error: Invalid OAuth access token - Cannot parse access token
```

**السبب:** الـ `WHATSAPP_ACCESS_TOKEN` غير صحيح أو منتهي الصلاحية.

---

## 🔧 **الحل**

### **الخطوات:**

#### **1. احصل على Access Token جديد من Meta:**
   - اذهب إلى: https://developers.facebook.com/apps
   - اختر التطبيق الخاص بك
   - انتقل إلى **WhatsApp** → **API Setup**
   - انسخ **Temporary Access Token** أو أنشئ **Permanent Token**

#### **2. تحديث Environment Variable:**
   ```bash
   # في Figma Make، حدّث السر:
   WHATSAPP_ACCESS_TOKEN=<your_new_token_here>
   ```

#### **3. تأكد من الإعدادات:**
   - **Phone Number ID:** موجود وصحيح
   - **Access Token:** صالح وغير منتهي
   - **Recipient Phone:** بالصيغة الدولية (مثل: `212612345678`)

---

## 📧 **Resend Rate Limit - 429 Error**

### **المشكلة:**
```
rate_limit_exceeded: Too many requests. You can only make 2 requests per second.
```

**السبب:** Resend API يسمح فقط بـ **2 requests per second** في الخطة المجانية.

### **الحل:**
✅ **تم إضافة delay** بين WhatsApp و Email notifications في الكود.

---

## 🧪 **اختبار النظام:**

### **1. تحقق من الـ Secrets:**
```bash
GET /make-server-273c94cc/debug-secrets
```

### **2. أرسل طلب:**
```bash
POST /make-server-273c94cc/submit-quote
```

### **3. تحقق من Logs:**
- ✅ **WhatsApp:** `✅ WhatsApp message sent successfully`
- ✅ **Email:** `✅ Email sent successfully`

---

## ⚙️ **Environment Variables المطلوبة:**

```bash
# Resend (Email)
GRAPHITUBE_OWNER_EMAIL=your-email@example.com  # نفس الإيميل المسجل في Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
GRAPHITUBE_SENDER_EMAIL=noreply@graphitube.ma

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxx  # ⚠️ يجب أن يكون صالح
WHATSAPP_RECIPIENT_PHONE=212612345678  # رقم هاتفك بصيغة دولية (بدون +)
```

---

## 💡 **ملاحظات مهمة:**

1. **WhatsApp Access Token** ينتهي بعد فترة - استعمل **Permanent Token** للإنتاج
2. **Resend** يتطلب أن يكون `GRAPHITUBE_OWNER_EMAIL` نفس الإيميل المسجل
3. النظام يعمل حتى لو فشل WhatsApp - الإيميل سيُرسل دائماً
4. لا تنسَ **إزالة endpoint `/debug-secrets`** قبل الإنتاج!

---

## ✅ **الحل السريع:**

1. **اذهب إلى:** https://developers.facebook.com/apps
2. **احصل على Access Token جديد**
3. **حدّث في Figma Make:**
   ```
   WHATSAPP_ACCESS_TOKEN=<new_token>
   ```
4. **أعد المحاولة!** 🎉
