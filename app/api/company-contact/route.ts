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

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<CompanyContactPayload>;

    const companyName = (payload.companyName ?? "").trim();
    const industrySector = (payload.industrySector ?? "").trim();
    const contactPersonName = (payload.contactPersonName ?? "").trim();
    const designation = (payload.designation ?? "").trim();
    const workEmail = (payload.workEmail ?? "").trim();
    const contactNumber = (payload.contactNumber ?? "").trim();
    const recruitmentMonth = (payload.recruitmentMonth ?? "").trim();
    const message = (payload.message ?? "").trim();

    if (
      !companyName ||
      !industrySector ||
      !contactPersonName ||
      !designation ||
      !workEmail ||
      !contactNumber ||
      !recruitmentMonth
    ) {
      return NextResponse.json(
        { ok: false, error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const host = requireEnv("SMTP_HOST");
    const port = Number(process.env.SMTP_PORT ?? "587");
    const user = requireEnv("SMTP_USER");
    const pass = requireEnv("SMTP_PASS");
    const secure = (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";

    const fromEmail = process.env.SMTP_FROM ?? user;
    const toEmail = requireEnv("CONTACT_RECEIVER_EMAIL");

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const subject = `Corporate Interest Form: ${companyName}`;

    const textLines = [
      "New Corporate Interest Form submission:",
      "",
      `Company Name: ${companyName}`,
      `Industry Sector: ${industrySector}`,
      `Contact Person: ${contactPersonName}`,
      `Designation: ${designation}`,
      `Work Email: ${workEmail}`,
      `Contact Number: ${contactNumber}`,
      `Proposed Recruitment Month: ${recruitmentMonth}`,
      "",
      "Message:",
      message || "(none)",
    ];

    const html = `
      <h2>New Corporate Interest Form submission</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><td><b>Company Name</b></td><td>${escapeHtml(companyName)}</td></tr>
        <tr><td><b>Industry Sector</b></td><td>${escapeHtml(industrySector)}</td></tr>
        <tr><td><b>Contact Person</b></td><td>${escapeHtml(contactPersonName)}</td></tr>
        <tr><td><b>Designation</b></td><td>${escapeHtml(designation)}</td></tr>
        <tr><td><b>Work Email</b></td><td>${escapeHtml(workEmail)}</td></tr>
        <tr><td><b>Contact Number</b></td><td>${escapeHtml(contactNumber)}</td></tr>
        <tr><td><b>Recruitment Month</b></td><td>${escapeHtml(recruitmentMonth)}</td></tr>
      </table>
      <h3>Message</h3>
      <pre style="white-space:pre-wrap">${escapeHtml(message || "(none)")}</pre>
    `;

    await transporter.sendMail({
      from: `TPC Website <${fromEmail}>`,
      to: toEmail,
      replyTo: workEmail,
      subject,
      text: textLines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
