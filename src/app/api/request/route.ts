import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { company } from "@/lib/catalog";

export const runtime = "nodejs";

const FIELDS = ["name", "phone", "company", "email", "message", "page"] as const;
type Field = (typeof FIELDS)[number];

const LABELS: Record<Field, string> = {
  name: "Имя",
  phone: "Телефон",
  company: "Компания",
  email: "E-mail",
  message: "Сообщение",
  page: "Страница",
};

const MAX_LENGTH = 2000;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    FIELDS.map((field) => {
      const raw = body[field];
      return [field, typeof raw === "string" ? raw.trim().slice(0, MAX_LENGTH) : ""];
    }),
  ) as Record<Field, string>;

  if (!data.name || !data.phone) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, REQUEST_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[request] SMTP_USER / SMTP_PASS are not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = FIELDS.filter((field) => data[field]);
  const text = rows.map((field) => `${LABELS[field]}: ${data[field]}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      (field) =>
        `<tr><td style="color:#5c6a7e;vertical-align:top">${LABELS[field]}</td><td style="white-space:pre-wrap">${escapeHtml(data[field])}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    await transport.sendMail({
      from: `"${company.name} — сайт" <${SMTP_USER}>`,
      to: REQUEST_TO ?? company.email,
      replyTo: data.email || undefined,
      subject: `Заявка с сайта: ${data.name}, ${data.phone}`,
      text,
      html,
    });
  } catch (error) {
    console.error("[request] sendMail failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
