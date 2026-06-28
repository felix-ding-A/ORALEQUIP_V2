import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { items, contact } = data;
    const appId = process.env.FEISHU_APP_ID || "cli_a94a6ac23f385bc2";
    const appSecret = process.env.FEISHU_APP_SECRET || "uocqpp56bVDRqDa383AyGcbneyouaGA1";
    const appToken = process.env.FEISHU_APP_TOKEN || "YRauweCxDi29zVkCpwxcKSi9nET";
    const tableId = process.env.FEISHU_TABLE_ID || "tbl41EDPAQSSIG5F";
    const smtpHost = process.env.SMTP_HOST || "smtp-u.global-mail.cn";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER || "info@oralequip.com";
    const smtpPass = process.env.SMTP_PASS || "Uj3eE6Zzg617Wu5X";
    const emailTo = process.env.EMAIL_TO || "info@oralequip.com";
    if (!appId || !appSecret || !appToken || !tableId) ;
    const tokenRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const formattedItems = items.map(
      (item) => `- ${item.name} ${item.sku ? `(SKU: ${item.sku})` : ""} x ${item.quantity}`
    ).join("\n");
    const recordData = {
      fields: {
        "Name": contact.name,
        "Email": contact.email,
        "Company": contact.company,
        "Country": contact.country,
        "Whatsapp/TEL": contact.whatsapp || "",
        "Requirements": contact.requirements || "None",
        "Requested Products": formattedItems
      }
    };
    const writeRes = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tenantAccessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recordData)
      }
    );
    const writeData = await writeRes.json();
    if (writeData.code !== 0) {
      console.error("Feishu Write Error:", writeData);
      return new Response(JSON.stringify({ error: "Failed to write to Feishu Bitable", details: writeData }), { status: 500 });
    }
    if (smtpHost && smtpUser && smtpPass && emailTo) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
        const emailHtml = `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Company:</strong> ${contact.company}</p>
          <p><strong>Country:</strong> ${contact.country}</p>
          <p><strong>Whatsapp/TEL:</strong> ${contact.whatsapp || "None"}</p>
          <p><strong>Requirements:</strong></p>
          <p>${(contact.requirements || "None").replace(/\n/g, "<br>")}</p>
          <h3>Requested Products:</h3>
          <pre>${formattedItems}</pre>
        `;
        await transporter.sendMail({
          from: `"OralEquip Inquiry" <${smtpUser}>`,
          to: emailTo,
          subject: `New Inquiry from ${contact.name}`,
          html: emailHtml
        });
        console.log("Email sent successfully.");
      } catch (emailError) {
        console.error("Email Sending Error:", emailError);
      }
    }
    return new Response(JSON.stringify({ success: true, record_id: writeData.data.record.record_id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
