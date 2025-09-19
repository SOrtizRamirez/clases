import nodemailer from "nodemailer";
import type { MailParams } from "../interfaces/mail.interface.ts";

function createTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        throw new Error("Config SMTP incompleta. Revisa .env");
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: String(SMTP_SECURE).toLowerCase() === "true", // true:465 / false:587
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
}

const transporter = createTransporter();

export async function sendMail({ to, subject, text, html, from }: MailParams) {
    const sender = from || process.env.EMAIL_FROM || "no-reply@example.com";

    const info = await transporter.sendMail({
        from: sender,
        to,
        subject,
        text,
        html,
    });

    console.log("Email enviado. MessageId:", info.messageId);
    return info;
}

export async function sendQuoteEmail(to: string, quote: { text: string; author?: string }) {
    if (!to) {
        console.warn("No se definió destinatario, se omite el envío.");
        return;
    }

    const subject = "Tu inspiración del día";
    const text = `"${quote.text}" — ${quote.author || "Anónimo"}`;

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif; line-height:1.6; padding:16px;">
      <h2 style="margin:0 0 12px;">Inspiración del día</h2>
      <blockquote style="font-size:18px; margin:12px 0; padding-left:12px; border-left:4px solid #ddd;">
        ${quote.text}
      </blockquote>
      <p style="color:#555; margin:0 0 16px;">
        — <em>${quote.author || "Anónimo"}</em>
      </p>
      <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
      <small style="color:#888;">Enviado automáticamente por tu mini-app de cronjobs</small>
    </div>
  `;

    return sendMail({ to, subject, text, html });
}
