import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CompanyContactPayload = {
  companyName: string;
  industrySector: string;
  contactPersonName: string;
  designation: string;
  workEmail: string;
  contactNumber: string;
  recruitmentMonth: string;
  message?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<CompanyContactPayload>;

    const companyName       = (payload.companyName       ?? "").trim();
    const industrySector    = (payload.industrySector    ?? "").trim();
    const contactPersonName = (payload.contactPersonName ?? "").trim();
    const designation       = (payload.designation       ?? "").trim();
    const workEmail         = (payload.workEmail         ?? "").trim();
    const contactNumber     = (payload.contactNumber     ?? "").trim();
    const recruitmentMonth  = (payload.recruitmentMonth  ?? "").trim();
    const message           = (payload.message           ?? "").trim();

    // ── Validation ──────────────────────────────────────────────────────────
    if (!companyName || !industrySector || !contactPersonName ||
        !designation || !workEmail || !contactNumber || !recruitmentMonth) {
      return NextResponse.json(
        { ok: false, error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // ── SMTP Setup ──────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host:   requireEnv("SMTP_HOST"),
      port:   Number(process.env.SMTP_PORT ?? "587"),
      secure: (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
      auth: {
        user: requireEnv("SMTP_USER"),
        pass: requireEnv("SMTP_PASS"),
      },
    });

    const fromEmail = process.env.SMTP_FROM ?? requireEnv("SMTP_USER");
    const toEmail   = requireEnv("CONTACT_RECEIVER_EMAIL");
    const subject   = `📋 New Recruiter Interest: ${companyName}`;

    // ── Plain-text fallback ─────────────────────────────────────────────────
    const text = [
      "New Corporate Interest Form Submission",
      "═══════════════════════════════════════",
      "",
      `Company Name       : ${companyName}`,
      `Industry Sector    : ${industrySector}`,
      `Contact Person     : ${contactPersonName}`,
      `Designation        : ${designation}`,
      `Work Email         : ${workEmail}`,
      `Contact Number     : ${contactNumber}`,
      `Recruitment Window : ${recruitmentMonth}`,
      "",
      "Additional Requirements:",
      message || "(none)",
      "",
      "─────────────────────────────────────────",
      "This email was sent from the IET Lucknow TNP Website.",
    ].join("\n");

    // ── HTML email ──────────────────────────────────────────────────────────
    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 16px;background:#f8fafc;font-weight:600;color:#475569;
                   white-space:nowrap;border-bottom:1px solid #e2e8f0;width:180px;">
          ${label}
        </td>
        <td style="padding:10px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">
          ${escapeHtml(value)}
        </td>
      </tr>`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%);
                     padding:32px 36px;text-align:center;">
            <p style="margin:0 0 4px 0;font-size:13px;color:#93c5fd;
                      letter-spacing:2px;text-transform:uppercase;font-weight:600;">
              IET Lucknow — Training &amp; Placement Cell
            </p>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">
              📋 New Recruiter Interest Form
            </h1>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#eff6ff;border-left:4px solid #3b82f6;
                     padding:14px 36px;font-size:14px;color:#1d4ed8;font-weight:500;">
            A company has expressed interest in recruiting from IET Lucknow.
            Please review and follow up within 24 hours.
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:28px 36px 0;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;
                      letter-spacing:1.5px;text-transform:uppercase;">
              Submission Details
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border-radius:10px;overflow:hidden;
                          border:1px solid #e2e8f0;font-size:14px;">
              ${row("Company Name",       companyName)}
              ${row("Industry Sector",    industrySector)}
              ${row("Contact Person",     contactPersonName)}
              ${row("Designation",        designation)}
              ${row("Work Email",         workEmail)}
              ${row("Contact Number",     contactNumber)}
              ${row("Recruitment Window", recruitmentMonth)}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:24px 36px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#94a3b8;
                      letter-spacing:1.5px;text-transform:uppercase;">
              Additional Requirements
            </p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;
                        padding:16px;font-size:14px;color:#334155;line-height:1.7;
                        white-space:pre-wrap;min-height:60px;">
              ${escapeHtml(message || "(No additional requirements specified)")}
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 36px 28px;text-align:center;">
            <a href="mailto:${escapeHtml(workEmail)}?subject=Re: Campus Recruitment — IET Lucknow"
               style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#1d4ed8);
                      color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;
                      padding:14px 32px;border-radius:50px;
                      box-shadow:0 4px 14px rgba(29,78,216,0.35);">
              ✉️ Reply to ${escapeHtml(contactPersonName)}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;
                     padding:20px 36px;text-align:center;
                     font-size:12px;color:#94a3b8;">
            This notification was generated automatically by the
            <strong style="color:#64748b;">IET Lucknow TNP Website</strong>.<br>
            Do not reply directly to this email.
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // ── Send ────────────────────────────────────────────────────────────────
    await transporter.sendMail({
      from:    fromEmail,
      to:      toEmail,
      replyTo: workEmail,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[company-contact] Failed to send email:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
