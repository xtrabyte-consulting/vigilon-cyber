import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const SERVICE_LABELS: Record<string, string> = {
  'en-18031': 'EN 18031 Compliance Testing',
  'cra': 'Cyber Resilience Act Readiness',
  'etsi': 'ETSI EN 303 645 IoT Security',
  'pentest': 'Penetration Testing',
  'risk': 'Risk Assessment & Threat Modelling',
  'vuln-scan': 'Vulnerability Scanning',
  'multiple': 'Multiple Services / Bundle',
  'not-sure': 'Not Sure — Need Guidance',
};

const COMPLIANCE_LABELS: Record<string, string> = {
  'self-declaration': 'Self-declaration (Module A)',
  'notified-body': 'Notified Body assessment (Module B+C)',
  'not-sure': 'Not sure — need guidance',
};

const TIMELINE_LABELS: Record<string, string> = {
  'urgent': 'Urgent — within 4 weeks',
  'standard': 'Standard — 1–3 months',
  'planning': 'Planning — 3–6 months',
  'future': 'Future — 6+ months',
};

export const POST: APIRoute = async ({ request }) => {
  // Only accept form-encoded or JSON bodies
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/x-www-form-urlencoded') && !contentType.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid content type' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Failed to parse form data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot bot check — silently discard, but pretend success so bots don't adapt
  if (formData.get('website') || formData.get('fax')) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const firstName = (formData.get('firstName') as string | null)?.trim() ?? '';
  const lastName = (formData.get('lastName') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const phone = (formData.get('phone') as string | null)?.trim() ?? '';
  const company = (formData.get('company') as string | null)?.trim() ?? '';
  const jobTitle = (formData.get('jobTitle') as string | null)?.trim() ?? '';
  const serviceKey = (formData.get('service') as string | null)?.trim() ?? '';
  const productDescription = (formData.get('productDescription') as string | null)?.trim() ?? '';
  const complianceKey = (formData.get('compliancePath') as string | null)?.trim() ?? '';
  const timelineKey = (formData.get('timeline') as string | null)?.trim() ?? '';
  const additionalInfo = (formData.get('additionalInfo') as string | null)?.trim() ?? '';

  // Basic server-side validation
  if (!firstName || !lastName || !email || !company || !serviceKey || !productDescription) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  const serviceLabel = SERVICE_LABELS[serviceKey] ?? serviceKey;
  const complianceLabel = COMPLIANCE_LABELS[complianceKey] ?? (complianceKey || 'Not specified');
  const timelineLabel = TIMELINE_LABELS[timelineKey] ?? (timelineKey || 'Not specified');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New Quote Request</title></head>
<body style="font-family:Arial,sans-serif;color:#1a1a2e;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#0a1628;padding:28px 32px;">
      <h1 style="color:#ffffff;margin:0;font-size:1.4rem;">New Quote Request — Vigilon Cyber</h1>
    </div>
    <div style="padding:32px;">
      <h2 style="font-size:1rem;color:#555;text-transform:uppercase;letter-spacing:.05em;margin:0 0 16px;">Contact Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr><td style="padding:6px 0;color:#555;width:160px;">Name</td><td style="padding:6px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:6px 0;color:#555;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#555;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>` : ''}
        <tr><td style="padding:6px 0;color:#555;">Company</td><td style="padding:6px 0;font-weight:600;">${company}</td></tr>
        ${jobTitle ? `<tr><td style="padding:6px 0;color:#555;">Job Title</td><td style="padding:6px 0;">${jobTitle}</td></tr>` : ''}
      </table>

      <h2 style="font-size:1rem;color:#555;text-transform:uppercase;letter-spacing:.05em;margin:0 0 16px;">Engagement Details</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr><td style="padding:6px 0;color:#555;width:160px;">Service</td><td style="padding:6px 0;font-weight:600;">${serviceLabel}</td></tr>
        <tr><td style="padding:6px 0;color:#555;">Compliance Path</td><td style="padding:6px 0;">${complianceLabel}</td></tr>
        <tr><td style="padding:6px 0;color:#555;">Timeline</td><td style="padding:6px 0;">${timelineLabel}</td></tr>
      </table>

      <h2 style="font-size:1rem;color:#555;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px;">Product Description</h2>
      <div style="background:#f8f9fa;border-left:4px solid #2563eb;padding:16px;border-radius:0 4px 4px 0;margin-bottom:28px;white-space:pre-wrap;">${productDescription}</div>

      ${additionalInfo ? `
      <h2 style="font-size:1rem;color:#555;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px;">Additional Information</h2>
      <div style="background:#f8f9fa;border-left:4px solid #64748b;padding:16px;border-radius:0 4px 4px 0;margin-bottom:28px;white-space:pre-wrap;">${additionalInfo}</div>
      ` : ''}

      <p style="margin:0;font-size:0.85rem;color:#888;">Submitted via vigiloncyber.com · Reply to this email to respond directly to ${firstName}.</p>
    </div>
  </div>
</body>
</html>`.trim();

  try {
    const { error } = await resend.emails.send({
      from: 'Vigilon Cyber <noreply@vigiloncyber.com>',
      to: 'bryce@vigiloncyber.com',
      replyTo: email,
      subject: `Quote Request: ${serviceLabel} — ${firstName} ${lastName} (${company})`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return new Response(JSON.stringify({ success: false, error: 'Unexpected server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
