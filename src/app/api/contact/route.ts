import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Missing RESEND_API_KEY" },
      { status: 500 }
    );
  }

  const to = process.env.RESEND_TO || "spacivatech@gmail.com";
  const from = process.env.RESEND_FROM || "SPACIVA <contact@spaciva.tech>";

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Simple spam trap: bots often fill hidden fields.
  if (isNonEmptyString(body.website)) {
    return Response.json({ ok: true });
  }

  const name = isNonEmptyString(body.name) ? body.name.trim() : "";
  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  const company = isNonEmptyString(body.company) ? body.company.trim() : "";
  const message = isNonEmptyString(body.message) ? body.message.trim() : "";

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  if (name.length > 120 || email.length > 180 || company.length > 180 || message.length > 4000) {
    return Response.json({ ok: false, error: "Message too long." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const subject = `New contact submission — ${name}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New contact submission</h2>
      <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p style="margin: 0 0 12px;"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <div style="margin-top: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 10px;">
        <pre style="white-space: pre-wrap; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
          message
        )}</pre>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      text,
      html,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
