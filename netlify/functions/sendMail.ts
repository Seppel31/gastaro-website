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

    // ✅ 2) Automatische Bestätigung an den Absender
    await transporter.sendMail({
      from: `${BRAND} <${FROM_EMAIL}>`,
      to: email,
      subject: `Danke für Ihre Anfrage bei ${BRAND}`,
      text: `
Hallo ${name},

vielen Dank für Ihre Nachricht! Wir melden uns in der Regel innerhalb von 24 Stunden (oft schneller).

Beste Grüße
${BRAND}-Team
      `,
      html: `
        <p>Hallo ${esc(name)},</p>
        <p>vielen Dank für Ihre Nachricht! Wir melden uns in der Regel innerhalb von <b>24 Stunden</b> (oft schneller).</p>
        <p>Beste Grüße<br/>Ihr ${BRAND}-Team</p>
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
