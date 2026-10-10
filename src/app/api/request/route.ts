import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
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

/** Catalogue ids a request from a product page carries (see LeadContext). */
const ID_FIELDS = ["series", "brand", "product_type"] as const;

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

  const ids: Record<string, number> = {};
  for (const field of ID_FIELDS) {
    const id = Number(body[field]);
    if (Number.isInteger(id) && id > 0) ids[field] = id;
  }

  const result = await sendLead(data, ids);
  if (result === "sent") {
    return NextResponse.json({ ok: true });
  }
  if (result === "rejected") {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  // The admin API is down: don't lose the request, e-mail it instead.
  return sendMail(data);
}

/** Primary channel: the lead lands in the admin (POST /api/v1/leads/). */
async function sendLead(
  data: Record<Field, string>,
  ids: Record<string, number>,
): Promise<"sent" | "rejected" | "failed"> {
  try {
    const response = await fetch(`${API_URL}/api/v1/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name.slice(0, 150),
        phone: data.phone.slice(0, 50),
        company: data.company.slice(0, 200),
        email: data.email,
        message: data.message,
        source_page: data.page.slice(0, 255),
        ...ids,
      }),
      cache: "no-store",
    });
    if (response.ok) return "sent";

    const detail = await response.text().catch(() => "");
    console.error(`[request] leads API → ${response.status}`, detail.slice(0, 500));
    return response.status === 400 ? "rejected" : "failed";
  } catch (error) {
    console.error("[request] leads API unreachable", error);
    return "failed";
  }
}

/** Fallback channel: e-mail via SMTP, when it is configured. */
async function sendMail(data: Record<Field, string>) {
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
