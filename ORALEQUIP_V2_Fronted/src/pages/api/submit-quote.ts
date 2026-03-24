import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { items, contact } = data;

    // 1. Process environment variables for Feishu
    const appId = process.env.FEISHU_APP_ID || import.meta.env.FEISHU_APP_ID;
    const appSecret = process.env.FEISHU_APP_SECRET || import.meta.env.FEISHU_APP_SECRET;
    const appToken = process.env.FEISHU_APP_TOKEN || import.meta.env.FEISHU_APP_TOKEN;
    const tableId = process.env.FEISHU_TABLE_ID || import.meta.env.FEISHU_TABLE_ID;

    // 2. Process environment variables for SMTP
    const smtpHost = process.env.SMTP_HOST || import.meta.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || import.meta.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER || import.meta.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || import.meta.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || import.meta.env.EMAIL_TO;

    if (!appId || !appSecret || !appToken || !tableId) {
      console.error("Missing Feishu configuration.");
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), { status: 500 });
    }

    // 3. Obtain Tenant Access Token
    const tokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_secret: appSecret
      })
    });

    const tokenData = await tokenRes.json();
    if (tokenData.code !== 0) {
      console.error("Feishu Token Error:", tokenData);
      return new Response(JSON.stringify({ error: "Failed to authenticate with Feishu" }), { status: 500 });
    }

    const tenantAccessToken = tokenData.tenant_access_token;

    // 4. Format Data for the Bitable Insert & Email
    const formattedItems = items.map((item: any) => 
      `- ${item.name} ${item.sku ? `(SKU: ${item.sku})` : ''} x ${item.quantity}`
    ).join('\n');

    const recordData = {
      fields: {
        "Name": contact.name,                           
        "Email": contact.email,
        "Company": contact.company,
        "Country": contact.country,
        "Whatsapp/TEL": contact.whatsapp || "",
        "Requirements": contact.requirements || "None",
        "Requested Products": formattedItems,
      }
    };

    // 5. Send Data to Bitable
    const writeRes = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tenantAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordData)
      }
    );

    const writeData = await writeRes.json();
    
    if (writeData.code !== 0) {
      console.error("Feishu Write Error:", writeData);
      return new Response(JSON.stringify({ error: "Failed to write to Feishu Bitable", details: writeData }), { status: 500 });
    }

    // 6. Send Email via SMTP
    if (smtpHost && smtpUser && smtpPass && emailTo) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const emailHtml = `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Company:</strong> ${contact.company}</p>
          <p><strong>Country:</strong> ${contact.country}</p>
          <p><strong>Whatsapp/TEL:</strong> ${contact.whatsapp || "None"}</p>
          <p><strong>Requirements:</strong></p>
          <p>${(contact.requirements || "None").replace(/\n/g, '<br>')}</p>
          <h3>Requested Products:</h3>
          <pre>${formattedItems}</pre>
        `;

        await transporter.sendMail({
          from: `"OralEquip Inquiry" <${smtpUser}>`,
          to: emailTo,
          subject: `New Inquiry from ${contact.name}`,
          html: emailHtml,
        });

        console.log("Email sent successfully.");
      } catch (emailError) {
        console.error("Email Sending Error:", emailError);
        // We don't return 500 here because Feishu write was successful.
        // But we could include a warning in the response.
      }
    } else {
      console.warn("SMTP configuration missing, skipping email notification.");
    }

    // Success response
    return new Response(JSON.stringify({ success: true, record_id: writeData.data.record.record_id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
