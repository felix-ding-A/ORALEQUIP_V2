import type { APIRoute } from 'astro';

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

    if (!appId || !appSecret || !appToken || !tableId) {
      console.error("Missing Feishu configuration.");
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), { status: 500 });
    }

    // 2. Obtain Tenant Access Token
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

    // 3. Format Data for the Bitable Insert
    const formattedItems = items.map((item: any) => 
      `- ${item.name} ${item.sku ? `(SKU: ${item.sku})` : ''} x ${item.quantity}`
    ).join('\n');

    // We keep column names very generic, but these need to match the columns you set up in Feishu Bitable!
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

    // 4. Send Data to Bitable
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
