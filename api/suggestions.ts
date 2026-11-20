export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const recipientEmail = 'jchurizar@gmail.com';

  if (req.method === 'GET') {
    return res.status(200).json({
      suggestions: [],
      emailConfigured: Boolean(
        process.env.RESEND_API_KEY ||
          process.env.WEB3FORMS_ACCESS_KEY ||
          process.env.FORMSPREE_ENDPOINT
      ),
      recipientEmail,
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  try {
    const { name, email, valueSuggestion, message, web3formsKey } = req.body || {};
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanName = typeof name === 'string' && name.trim() ? name.trim() : 'Anónimo';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanValue =
      typeof valueSuggestion === 'string' && valueSuggestion.trim()
        ? valueSuggestion.trim()
        : 'General';

    if (!cleanMessage) {
      return res.status(400).json({ error: 'El mensaje de la sugerencia no puede estar vacío.' });
    }

    const subject = `Sugerencia de Cuento Infantil: ${cleanValue}`;
    let emailSent = false;
    let provider = 'inbox';

    const resendKey = process.env.RESEND_API_KEY?.trim();
    const formspreeUrl = process.env.FORMSPREE_ENDPOINT?.trim();
    const web3Key =
      process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
      (typeof web3formsKey === 'string' ? web3formsKey.trim() : '');

    if (resendKey) {
      try {
        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Cuentos con Valores <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: cleanEmail && cleanEmail.includes('@') ? cleanEmail : undefined,
            subject,
            text: `Nombre / Escuela: ${cleanName}\nCorreo: ${cleanEmail || 'No proporcionado'}\nValor sugerido: ${cleanValue}\n\nMensaje:\n${cleanMessage}`,
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (resp.ok) {
          emailSent = true;
          provider = 'resend';
        }
      } catch {
        // Fallback below
      }
    }

    if (!emailSent && formspreeUrl) {
      try {
        const resp = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail || 'sin-email@cuentosyvalores.es',
            _replyto: cleanEmail || undefined,
            _subject: subject,
            valor: cleanValue,
            message: cleanMessage,
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (resp.ok) {
          emailSent = true;
          provider = 'formspree';
        }
      } catch {
        // Fallback below
      }
    }

    if (!emailSent && web3Key) {
      try {
        const resp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject,
            from_name: cleanName,
            name: cleanName,
            email: cleanEmail || 'sin-email@cuentosyvalores.es',
            valor: cleanValue,
            message: cleanMessage,
          }),
          signal: AbortSignal.timeout(6000),
        });
        const data = await resp.json().catch(() => null);
        if (resp.ok && data?.success) {
          emailSent = true;
          provider = 'web3forms';
        }
      } catch {
        // Fallback below
      }
    }

    if (!emailSent) {
      try {
        const resp = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: process.env.APP_URL || 'https://www.cuentosyvalores.es',
          },
          body: JSON.stringify({
            _subject: subject,
            _template: 'table',
            _captcha: 'false',
            Nombre_o_Escuela: cleanName,
            Correo_Contacto: cleanEmail || 'No proporcionado',
            Valor_Sugerido: cleanValue,
            Mensaje: cleanMessage,
          }),
          signal: AbortSignal.timeout(3500),
        });
        const data = await resp.json().catch(() => null);
        if (resp.ok && (data?.success === true || data?.success === 'true')) {
          emailSent = true;
          provider = 'formsubmit';
        }
      } catch {
        // Non-blocking fallback
      }
    }

    return res.status(200).json({
      success: true,
      saved: true,
      emailSent,
      provider,
      suggestion: {
        id: `sug-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        valueSuggestion: cleanValue,
        message: cleanMessage,
        createdAt: new Date().toISOString(),
        read: false,
        emailSent,
        provider,
      },
    });
  } catch {
    return res.status(500).json({ error: 'No se pudo procesar la sugerencia.' });
  }
}
