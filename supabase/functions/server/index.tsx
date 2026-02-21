import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-273c94cc/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Submit quote endpoint for Kitchen
app.post("/make-server-273c94cc/submit-quote", async (c) => {
  try {
    const body = await c.req.json();

    const quoteId = `quote-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Store in KV store
    await kv.set(quoteId, {
      ...body,
      id: quoteId,
      type: "kitchen",
      createdAt: new Date().toISOString(),
      status: "pending"
    });

    // Send email notification
    const ownerEmail = Deno.env.get("GRAPHITUBE_OWNER_EMAIL");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const senderEmail = Deno.env.get("GRAPHITUBE_SENDER_EMAIL") || "onboarding@resend.dev";

    if (resendApiKey && ownerEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: senderEmail,
            to: ownerEmail,
            subject: `🏗️ طلب عرض سعر مطبخ جديد - ${body.customerInfo?.fullName || 'عميل جديد'}`,
            html: generateKitchenEmailHTML(body),
          }),
        });
      } catch (emailError) {
        // Silently fail
      }
    }

    // Send WhatsApp notification
    const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const whatsappAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const whatsappRecipient = Deno.env.get("WHATSAPP_RECIPIENT_PHONE");

    if (whatsappPhoneNumberId && whatsappAccessToken && whatsappRecipient) {
      try {
        const whatsappMessage = generateKitchenWhatsAppMessage(body);
        
        await fetch(
          `https://graph.facebook.com/v21.0/${whatsappPhoneNumberId}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${whatsappAccessToken}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: whatsappRecipient,
              type: "text",
              text: { body: whatsappMessage },
            }),
          }
        );
      } catch (whatsappError) {
        // Silently fail
      }
    }

    return c.json({
      success: true,
      quoteId,
      message: "تم استلام طلبك بنجاح",
    });

  } catch (error) {
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});

// Submit quote endpoint for Salon
app.post("/make-server-273c94cc/submit-salon-quote", async (c) => {
  try {
    const body = await c.req.json();

    const quoteId = `salon-quote-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Store in KV store
    await kv.set(quoteId, {
      ...body,
      id: quoteId,
      type: "salon",
      createdAt: new Date().toISOString(),
      status: "pending"
    });

    // Send email notification
    const ownerEmail = Deno.env.get("GRAPHITUBE_OWNER_EMAIL");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const senderEmail = Deno.env.get("GRAPHITUBE_SENDER_EMAIL") || "onboarding@resend.dev";

    if (resendApiKey && ownerEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: senderEmail,
            to: ownerEmail,
            subject: `🪑 طلب عرض سعر صالون جديد - ${body.customerInfo?.fullName || 'عميل جديد'}`,
            html: generateSalonEmailHTML(body),
          }),
        });
      } catch (emailError) {
        // Silently fail
      }
    }

    // Send WhatsApp notification
    const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const whatsappAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const whatsappRecipient = Deno.env.get("WHATSAPP_RECIPIENT_PHONE");

    if (whatsappPhoneNumberId && whatsappAccessToken && whatsappRecipient) {
      try {
        const whatsappMessage = generateSalonWhatsAppMessage(body);
        
        await fetch(
          `https://graph.facebook.com/v21.0/${whatsappPhoneNumberId}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${whatsappAccessToken}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: whatsappRecipient,
              type: "text",
              text: { body: whatsappMessage },
            }),
          }
        );
      } catch (whatsappError) {
        // Silently fail
      }
    }

    return c.json({
      success: true,
      quoteId,
      message: "تم استلام طلبك بنجاح",
    });

  } catch (error) {
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});

// Helper function to generate kitchen email HTML
function generateKitchenEmailHTML(data: any): string {
  const { customerInfo, kitchenDesign, dimensions, ceiling, workScope, appliances, cabinetEquipment, woodType, doorSystem, lighting, marbleDetails, tilesDetails, electricalDetails, plumbingDetails, paintingDetails, gypsumDetails, design3D, additionalNotes } = data;
  
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; direction: rtl; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .section { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
        .title { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
        .subtitle { color: #1e40af; font-size: 18px; margin: 15px 0 10px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #1f2937; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">🏗️ طلب عرض سعر مطبخ جديد</h1>
        
        <div class="section">
          <h2 class="subtitle">👤 معلومات العميل</h2>
          <div class="field"><span class="label">الاسم:</span> <span class="value">${customerInfo?.fullName || 'غير محدد'}</span></div>
          <div class="field"><span class="label">الهاتف:</span> <span class="value">${customerInfo?.phone || 'غير محدد'}</span></div>
          <div class="field"><span class="label">العنوان:</span> <span class="value">${customerInfo?.address || 'غير محدد'}</span></div>
          <div class="field"><span class="label">المدينة:</span> <span class="value">${customerInfo?.city || 'غير محدد'}</span></div>
        </div>

        <div class="section">
          <h2 class="subtitle">🏗️ تصميم المطبخ</h2>
          <div class="field"><span class="label">النوع:</span> <span class="value">${kitchenDesign?.type || 'غير محدد'}</span></div>
          ${kitchenDesign?.customDescription ? `<div class="field"><span class="label">الوصف:</span> <span class="value">${kitchenDesign.customDescription}</span></div>` : ''}
        </div>

        <div class="section">
          <h2 class="subtitle">📏 الأبعاد</h2>
          <div class="field">${JSON.stringify(dimensions || {}, null, 2)}</div>
        </div>

        <div class="section">
          <h2 class="subtitle">⬆️ السقف</h2>
          <div class="field">${JSON.stringify(ceiling || {}, null, 2)}</div>
        </div>

        <div class="section">
          <h2 class="subtitle">🔨 نطاق العمل</h2>
          <div class="field">${JSON.stringify(workScope || {}, null, 2)}</div>
        </div>

        ${additionalNotes ? `
        <div class="section">
          <h2 class="subtitle">📝 ملاحظات إضافية</h2>
          <div class="field">${additionalNotes}</div>
        </div>
        ` : ''}
        
        <div class="section">
          <p><strong>تاريخ الطلب:</strong> ${new Date().toLocaleString('ar-MA')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to generate salon email HTML
function generateSalonEmailHTML(data: any): string {
  const { customerInfo, salonType, dimensions, woodElements, woodType, decoration, color, additionalNotes } = data;
  
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; direction: rtl; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .section { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
        .title { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
        .subtitle { color: #1e40af; font-size: 18px; margin: 15px 0 10px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #1f2937; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">🪑 طلب عرض سعر صالون جديد</h1>
        
        <div class="section">
          <h2 class="subtitle">👤 معلومات العميل</h2>
          <div class="field"><span class="label">الاسم:</span> <span class="value">${customerInfo?.fullName || 'غير محدد'}</span></div>
          <div class="field"><span class="label">الهاتف:</span> <span class="value">${customerInfo?.phone || 'غير محدد'}</span></div>
          <div class="field"><span class="label">المدينة:</span> <span class="value">${customerInfo?.city || 'غير محدد'}</span></div>
        </div>

        <div class="section">
          <h2 class="subtitle">🪑 نوع الصالون</h2>
          <div class="field"><span class="label">النوع:</span> <span class="value">${salonType || 'غير محدد'}</span></div>
        </div>

        <div class="section">
          <h2 class="subtitle">📏 الأبعاد</h2>
          <div class="field">${JSON.stringify(dimensions || {}, null, 2)}</div>
        </div>

        <div class="section">
          <h2 class="subtitle">🪵 العناصر الخشبية</h2>
          <div class="field">${JSON.stringify(woodElements || {}, null, 2)}</div>
        </div>

        <div class="section">
          <h2 class="subtitle">🌳 نوع الخشب</h2>
          <div class="field">${woodType || 'غير محدد'}</div>
        </div>

        ${additionalNotes ? `
        <div class="section">
          <h2 class="subtitle">📝 ملاحظات إضافية</h2>
          <div class="field">${additionalNotes}</div>
        </div>
        ` : ''}
        
        <div class="section">
          <p><strong>تاريخ الطلب:</strong> ${new Date().toLocaleString('ar-MA')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to generate kitchen WhatsApp message
function generateKitchenWhatsAppMessage(data: any): string {
  const { customerInfo, kitchenDesign } = data;
  return `🏗️ *طلب عرض سعر مطبخ جديد*

👤 *العميل:* ${customerInfo?.fullName || 'غير محدد'}
📱 *الهاتف:* ${customerInfo?.phone || 'غير محدد'}
📍 *المدينة:* ${customerInfo?.city || 'غير محدد'}

🏗️ *التصميم:* ${kitchenDesign?.type || 'غير محدد'}

⏰ *التاريخ:* ${new Date().toLocaleString('ar-MA')}

✅ تم استلام الطلب بنجاح`;
}

// Helper function to generate salon WhatsApp message
function generateSalonWhatsAppMessage(data: any): string {
  const { customerInfo, salonType } = data;
  return `🪑 *طلب عرض سعر صالون جديد*

👤 *العميل:* ${customerInfo?.fullName || 'غير محدد'}
📱 *الهاتف:* ${customerInfo?.phone || 'غير محدد'}
📍 *المدينة:* ${customerInfo?.city || 'غير محدد'}

🪑 *النوع:* ${salonType || 'غير محدد'}

⏰ *التاريخ:* ${new Date().toLocaleString('ar-MA')}

✅ تم استلام الطلب بنجاح`;
}

Deno.serve(app.fetch);
