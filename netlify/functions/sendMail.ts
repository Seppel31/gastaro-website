import nodemailer from "nodemailer";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function esc(input: string = "") {
  return input.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string)
  );
}

export async function handler(event: any) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const phone = (body.phone || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: cors,
        body: "Bitte Name, E-Mail und Nachricht angeben.",
      };
    }

    const BRAND = process.env.BRAND_NAME || "Gastaro";
    const SMTP_HOST = process.env.SMTP_HOST!;
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
    const SMTP_USER = process.env.SMTP_USER!;
    const SMTP_PASS = process.env.SMTP_PASS!;
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;
    const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      requireTLS: !SMTP_SECURE,
    });

    // 💌 1) Mail an euch (interne Benachrichtigung)
    await transporter.sendMail({
      from: `${BRAND} Kontakt <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email || undefined,
      subject: `Neue Anfrage von ${name} (${BRAND})`,
      text: `
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || "-"}
------------------------------------
Nachricht:
${message}
      `,
      html: `
        <p><b>Name:</b> ${esc(name)}<br/>
        <b>E-Mail:</b> ${esc(email)}<br/>
        <b>Telefon:</b> ${esc(phone || "-")}</p>
        <p><b>Nachricht:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

 // 2) Auto-Bestätigung an Absender (visuell ansprechend & professionell)
await transporter.sendMail({
  from: `"Gastaro" <${FROM_EMAIL}>`,
  to: email,
  subject: `🎉 Vielen Dank für Ihre Anfrage bei ${BRAND}`,
  text: `
Hallo ${name},

vielen Dank für Ihre Nachricht! 
Wir melden uns in der Regel innerhalb von 24 Stunden (oft schneller).

Beste Grüße  
Ihr ${BRAND}-Team
  `,
  html: `
  <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #111827, #1f2937); padding: 24px; text-align: center;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Letter_G.svg" alt="Gastaro Logo" width="50" style="margin-bottom: 10px; border-radius: 6px;">
        <h1 style="color: white; margin: 0; font-size: 22px; letter-spacing: 0.5px;">Vielen Dank für Ihre Anfrage!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 28px 32px; color: #374151;">
        <p style="font-size: 16px; margin-bottom: 12px;">Hallo <strong>${esc(name)}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
          wir freuen uns über Ihr Interesse an <strong>${BRAND}</strong>! 
          Ihre Anfrage ist bei uns eingegangen und wird nun von einem unserer Teammitglieder bearbeitet.
        </p>
        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 20px;">
          In der Regel melden wir uns <strong>innerhalb von 24 Stunden</strong> bei Ihnen zurück – meist sogar schneller. 
          Für dringende Anliegen erreichen Sie uns auch direkt unter 
          <a href="mailto:${FROM_EMAIL}" style="color: #2563eb; text-decoration: none;">${FROM_EMAIL}</a>.
        </p>

        <div style="background: #f9fafb; padding: 14px 18px; border-left: 4px solid #2563eb; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            💡 <em>Tipp:</em> Besuchen Sie unsere Website, um mehr über unsere Projekte und Leistungen zu erfahren:
            <br>
            👉 <a href="https://gastaro.com" style="color: #2563eb; text-decoration: none;">gastaro.com</a>
          </p>
        </div>

        <p style="font-size: 15px; color: #111827; margin-top: 16px;">
          Beste Grüße,<br>
          <strong>Ihr ${BRAND}-Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #111827; padding: 16px; text-align: center; color: #9ca3af; font-size: 13px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} ${BRAND}. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </div>
  `,
});


    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: cors,
      body: "Mailer error: " + (err?.message || err),
    };
  }
}
