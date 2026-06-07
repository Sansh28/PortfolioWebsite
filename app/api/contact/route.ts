import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactPayloadInput = Partial<Record<keyof ContactPayload, unknown>>;

type RateLimitEntry = {
  count: number;
  startedAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 3;
const rateLimitMap = new Map<string, RateLimitEntry>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ipAddress: string) {
  const now = Date.now();

  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.startedAt > WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }

  const entry = rateLimitMap.get(ipAddress);

  if (!entry) {
    rateLimitMap.set(ipAddress, { count: 1, startedAt: now });
    return false;
  }

  if (now - entry.startedAt > WINDOW_MS) {
    rateLimitMap.set(ipAddress, { count: 1, startedAt: now });
    return false;
  }

  if (entry.count >= MAX_SUBMISSIONS) {
    return true;
  }

  rateLimitMap.set(ipAddress, {
    count: entry.count + 1,
    startedAt: entry.startedAt
  });

  return false;
}

function getStringField(
  payload: ContactPayloadInput,
  field: keyof ContactPayload
) {
  const value = payload[field];
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: unknown) {
  const input =
    payload && typeof payload === "object"
      ? (payload as ContactPayloadInput)
      : {};

  const normalized = {
    name: getStringField(input, "name"),
    email: getStringField(input, "email"),
    subject: getStringField(input, "subject"),
    message: getStringField(input, "message")
  };

  if (!normalized.name || !normalized.email || !normalized.subject || !normalized.message) {
    return {
      isValid: false,
      error: "All fields are required."
    };
  }

  if (!isEmailValid(normalized.email)) {
    return {
      isValid: false,
      error: "Please provide a valid email address."
    };
  }

  if (normalized.message.length <= 20) {
    return {
      isValid: false,
      error: "Message must be longer than 20 characters."
    };
  }

  return {
    isValid: true,
    data: normalized
  };
}

function createEmailHtml(payload: ContactPayload) {
  const timestamp = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long"
  }).format(new Date());

  return `
    <div style="background:#050508;padding:32px;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;color:#e8e8f0;">
      <div style="max-width:720px;margin:0 auto;border:1px solid #1a1a2e;background:#0d0d14;border-radius:24px;overflow:hidden;box-shadow:0 0 28px rgba(0,245,212,0.12);">
        <div style="padding:24px 28px;border-bottom:1px solid #1a1a2e;background:linear-gradient(135deg, rgba(0,245,212,0.08), rgba(123,94,167,0.14));">
          <p style="margin:0 0 10px;color:#00f5d4;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;">Portfolio Contact</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;font-family:'Space Grotesk',system-ui,sans-serif;">${escapeHtml(
            payload.subject
          )}</h1>
        </div>
        <div style="padding:28px;">
          <p style="margin:0 0 20px;color:#6b6b80;">Received ${escapeHtml(timestamp)}</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tbody>
              <tr>
                <td style="padding:10px 0;color:#6b6b80;width:120px;vertical-align:top;">Name</td>
                <td style="padding:10px 0;">${escapeHtml(payload.name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b6b80;width:120px;vertical-align:top;">Email</td>
                <td style="padding:10px 0;"><a href="mailto:${escapeHtml(
                  payload.email
                )}" style="color:#00b4d8;text-decoration:none;">${escapeHtml(
                  payload.email
                )}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b6b80;width:120px;vertical-align:top;">Subject</td>
                <td style="padding:10px 0;">${escapeHtml(payload.subject)}</td>
              </tr>
            </tbody>
          </table>
          <div style="border:1px solid #1a1a2e;border-radius:18px;padding:20px;background:rgba(5,5,8,0.8);">
            <p style="margin:0 0 12px;color:#6b6b80;">Message</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.8;">${escapeHtml(
              payload.message
            )}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  const ipAddress = getClientIp(request);

  if (isRateLimited(ipAddress)) {
    return NextResponse.json(
      {
        error: "Too many requests from this IP. Please try again in a few minutes."
      },
      { status: 429 }
    );
  }

  try {
    const payload = (await request.json()) as unknown;
    const validation = validatePayload(payload);

    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        { error: validation.error },
        {
          status: 400
        }
      );
    }

    const contactPayload = validation.data;

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey || !contactEmail) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_EMAIL."
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      subject: `[Portfolio] ${contactPayload.subject} — from ${contactPayload.name}`,
      replyTo: contactPayload.email,
      html: createEmailHtml(contactPayload)
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send your message right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}
