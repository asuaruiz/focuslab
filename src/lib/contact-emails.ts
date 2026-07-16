import "server-only";

type ContactEmailData = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string | null;
  projectDetails: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function field(value: string | null) {
  return value ? escapeHtml(value) : "No indicado";
}

export async function sendContactEmails(data: ContactEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const managerEmail = process.env.CONTACT_MANAGER_EMAIL;

  if (!apiKey || !from || !managerEmail) {
    throw new Error("Missing contact email environment variables");
  }

  const firstName = escapeHtml(data.name.split(/\s+/)[0] || data.name);
  const details = field(data.projectDetails).replaceAll("\n", "<br />");
  const response = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `focuslab-contact-${data.id}`,
    },
    body: JSON.stringify([
      {
        from,
        to: [data.email],
        reply_to: managerEmail,
        subject: "Recibimos tu solicitud — Focus Labs",
        html: `
          <div style="background:#0a0a0a;color:#f5f5f5;font-family:Arial,sans-serif;padding:40px 24px">
            <div style="max-width:600px;margin:0 auto">
              <p style="color:#d4a85a;font-size:12px;letter-spacing:2px;text-transform:uppercase">Focus Labs Media Group</p>
              <h1 style="font-size:28px;font-weight:400">Gracias, ${firstName}.</h1>
              <p style="color:#c8c8c8;line-height:1.7">Recibimos tu solicitud y nuestro equipo la revisará personalmente. Te responderemos dentro de las próximas 2 horas hábiles.</p>
              <p style="color:#c8c8c8;line-height:1.7">Mientras tanto, no necesitas hacer nada más. Ya tenemos tu información.</p>
              <p style="margin-top:32px;color:#d4a85a">Focus Labs Media Group</p>
            </div>
          </div>`,
      },
      {
        from,
        to: [managerEmail],
        reply_to: data.email,
        subject: `Nueva solicitud de proyecto — ${data.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#171717">
            <h1>Nueva solicitud de contacto</h1>
            <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
            <p><strong>Empresa:</strong> ${field(data.company)}</p>
            <p><strong>Tipo de proyecto:</strong> ${field(data.projectType)}</p>
            <p><strong>Detalles:</strong><br />${details}</p>
          </div>`,
      },
    ]),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${message}`);
  }
}
