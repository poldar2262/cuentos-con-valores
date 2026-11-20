import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize server-side GoogleGenAI client only when key is configured
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  const SYSTEM_INSTRUCTION = `Eres "Valerio", un cuentacuentos infantil mágico, entrañable, sabio y con un profundo sentido pedagógico para familias, escuelas y niños de 3 a 12 años.
Tu misión es inventar historias conmovedoras, divertidas y educativas centradas en la enseñanza de valores universales:
- Respeto y convivencia
- Honestidad y sinceridad
- Valentía y superación de miedos
- Empatía y compasión
- Generosidad y saber compartir
- Paciencia y manejo de la frustración / rabietas
- Perdón y reconciliación
- Gratitud por las cosas buenas de la vida
- Cooperación y trabajo en equipo
- Amor familiar y amistad verdadera

REGLAS ESENCIALES:
1. Idioma: Español tierno, dulce, rico en vocabulario y muy bien narrado.
2. 100% libre de violencia, crueldad o situaciones que provoquen angustia infantil.
3. Si el usuario te proporciona datos (nombre del niño, valor, edad, temática), crea el cuento siguiendo esta estructura armoniosa:
   - 🌟 Título sugerente y poético.
   - 👦 **Ficha**: Protagonista, Valor trabajado, Edad recomendada.
   - 📖 **Cuento**: De 3 a 5 párrafos narrativos envolventes con diálogos amables, personajes entrañables y una resolución positiva.
   - 💡 **Para reflexionar en familia**: 2 preguntas curiosas para que papás/profesores conversen con el niño.
   - 🎨 **Idea para colorear y dibujar**: Una escena divertida y fácil para que el peque la dibuje en un folio.
4. Si el usuario te pide cambios (ej: "hazlo más breve", "ponle una rima", "hazlo para antes de dormir", "incluye a su perrito Lucas"), hazlo siempre con máxima dulzura y rapidez.
5. Puedes también sugerir valores si los padres te cuentan una situación real ("mi hijo muerde", "le cuesta dejar los juguetes", "tiene miedo a la oscuridad").`;

  const CANDIDATE_MODELS = [
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-flash-latest',
  ];

  // Sanitize multiturn conversation to satisfy Gemini API requirements:
  // 1. Must start with role: 'user'
  // 2. Must alternate strictly between 'user' and 'model'
  // 3. Consecutive turns with same role must be merged
  const sanitizeGeminiContents = (
    rawMessages: Array<{ role: string; content?: string }> | undefined,
    fallbackPrompt?: string
  ) => {
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      if (fallbackPrompt && fallbackPrompt.trim()) {
        return [{ role: 'user', parts: [{ text: fallbackPrompt.trim() }] }];
      }
      return [];
    }

    const turns: Array<{ role: 'user' | 'model'; text: string }> = [];

    for (const m of rawMessages) {
      const rawText = (m.content || '').trim();
      if (!rawText) continue;

      const role: 'user' | 'model' = m.role === 'model' ? 'model' : 'user';

      // Gemini requires the conversation to begin with a 'user' turn
      if (turns.length === 0 && role === 'model') {
        continue;
      }

      // If consecutive turns have the same role, combine them
      if (turns.length > 0 && turns[turns.length - 1].role === role) {
        turns[turns.length - 1].text += `\n\n${rawText}`;
      } else {
        turns.push({ role, text: rawText });
      }
    }

    if (turns.length === 0 && fallbackPrompt && fallbackPrompt.trim()) {
      return [{ role: 'user', parts: [{ text: fallbackPrompt.trim() }] }];
    }

    return turns.map((t) => ({
      role: t.role,
      parts: [{ text: t.text }],
    }));
  };

  // High-quality pedagogical fallback story generator in case of external API rate-limits
  const getOfflinePedagogicalStory = (params: {
    childName?: string;
    value?: string;
    ageGroup?: string;
    theme?: string;
    customPrompt?: string;
  }) => {
    const name = params.childName || 'Lucas';
    const val = params.value || 'la generosidad y el compañerismo';
    const age = params.ageGroup || '5 a 8 años';
    const theme = params.theme || 'el bosque mágico de los animales amigos';

    return `🌟 **El Gran Tesoro del Bosque Brillante**

👦 **Ficha del Cuento**:
• Protagonista: ${name}
• Valor transmitido: ${val}
• Edad recomendada: ${age}

📖 **El Cuento**:
Había una vez, en un lugar donde los árboles susurraban canciones al viento y las flores brillaban bajo el sol, un niño muy despierto y curioso llamado ${name}. A ${name} le fascinaba explorar ${theme}. Una mañana tranquila, mientras daba un paseo, encontró una pequeña caja de madera tallada escondida entre las raíces de un sauce centenario. Dentro no había oro ni joyas, sino hermosas piedras de colores que reflejaban la luz como pequeños arcoíris.

Al principio, ${name} quiso guardar todas las piedras brillantes solo para él. "¡Son mías y de nadie más!", pensó con el corazón algo acelerado. Sin embargo, poco después vio a un pequeño erizo y a una ardilla que buscaban con tristeza algo para abrigar a su abuelita en el invierno. ${name} miró sus piedras, sintió un calor suave en su pecho y decidió compartir las piedras más cálidas con sus nuevos amigos.

Al compartir, ocurrió algo extraordinario: cada vez que ${name} regalaba una piedra con amor y alegría, ¡otra piedra aún más luminosa aparecía en su caja! El erizo y la ardilla le dieron las gracias con una sonrisa que iluminó todo el bosque. Aquel día, ${name} comprendió que la verdadera magia no está en acumular cosas para uno mismo, sino en la alegría de dar, cuidar y compartir con los demás con un corazón generoso.

💡 **Para reflexionar en familia**:
1. ¿Cómo crees que se sintió ${name} cuando decidió compartir sus piedras en lugar de guardárselas todas?
2. ¿Qué cosas bonitas te gusta compartir a ti en casa o en el colegio con las personas que quieres?

🎨 **Idea para colorear y dibujar**:
Dibuja a ${name} sonriendo junto a los animalitos del bosque, sosteniendo la caja con las piedras brillantes de colores. ¡Usa tus colores más vivos! ✨`;
  };

  // Main story generation endpoint (supports both /api/story and /api/story/chat)
  const handleStoryRequest = async (req: Request, res: Response) => {
    try {
      const { messages, childName, value, ageGroup, theme, customPrompt } = req.body || {};

      let contents: any[] = [];
      if (Array.isArray(messages) && messages.length > 0) {
        contents = sanitizeGeminiContents(messages);
      } else {
        const prompt = `¡Hola Valerio! Por favor, crea un hermoso cuento infantil personalizado con estos datos:
• Nombre del protagonista: ${childName || 'un niño bueno'}
• Valor o virtud a transmitir: ${value || 'la generosidad y el compañerismo'}
• Edad recomendada: ${ageGroup || '5 a 8 años'}
${theme ? `• Temática o personajes preferidos: ${theme}` : ''}
${customPrompt ? `• Nota o detalle especial de la familia: ${customPrompt}` : ''}

¡Hazlo muy tierno, formativo y entrañable con título, ficha, historia, preguntas para reflexionar e idea para dibujar!`;

        contents = sanitizeGeminiContents([], prompt);
      }

      if (!ai) {
        const fallback = getOfflinePedagogicalStory({ childName, value, ageGroup, theme, customPrompt });
        return res.json({ reply: fallback });
      }

      let replyText = '';
      let lastError: any = null;

      for (const modelName of CANDIDATE_MODELS) {
        try {
          const resp = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.75,
            },
          });
          if (resp && resp.text) {
            replyText = resp.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} error in /api/story:`, err?.status || err?.message || err);
          lastError = err;
        }
      }

      if (!replyText) {
        console.warn('All models failed or exhausted quota, using offline story fallback.');
        replyText = getOfflinePedagogicalStory({ childName, value, ageGroup, theme, customPrompt });
      }

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/story:', err);
      const fallback = getOfflinePedagogicalStory(req.body || {});
      return res.json({ reply: fallback });
    }
  };

  app.post('/api/story', handleStoryRequest);
  app.post('/api/story/chat', handleStoryRequest);

  // Endpoint de chat con Valerio
  const handleValerioChat = async (req: Request, res: Response) => {
    try {
      const { message, messages } = req.body || {};

      const contents = sanitizeGeminiContents(messages, message);

      if (contents.length === 0) {
        return res.status(400).json({ error: 'Debes proporcionar un mensaje para Valerio.' });
      }

      if (!ai) {
        return res.json({
          reply:
            '¡Hola! Soy Valerio. En este momento el servicio de conexión está en modo local. Puedes pedirme cualquier cuento o duda y te ayudaré encantado.',
        });
      }

      const systemInstruction = `Eres Valerio, un sabio, tierno y alegre cuentacuentos y pedagogo infantil de "Cuentos con Valores".
Tu misión es conversar con padres, educadores y niños con suma calidez, respeto, sabiduría y amor.
- Si te piden un cuento nuevo o continuar una historia: invéntala completa, tierna, emocionante y enriquecedora con un valor central, preguntas de reflexión y propuesta de dibujo.
- Si te hacen preguntas sobre cómo educar valores (paciencia, compartir, rabietas, miedos nocturnos, celos entre hermanos): responde con consejos prácticos, llenos de empatía y cariño.
- Si te piden modificar un cuento anterior (más corto, rimado, con animales, cambiar nombres): adáptalo con total naturalidad manteniendo el hilo de la conversación.
- Tu tono es siempre cariñoso, respetuoso y muy positivo.`;

      let replyText = '';
      let lastErr: any = null;

      for (const mName of CANDIDATE_MODELS) {
        try {
          const resp = await ai.models.generateContent({
            model: mName,
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          if (resp && resp.text) {
            replyText = resp.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Chat model ${mName} error:`, err?.status || err?.message || err);
          lastErr = err;
        }
      }

      if (!replyText) {
        const lastMsg = message || (Array.isArray(messages) && messages[messages.length - 1]?.content) || '';
        // If it was a story request, generate a pedagogical story
        if (
          lastMsg.toLowerCase().includes('cuento') ||
          lastMsg.toLowerCase().includes('historia') ||
          lastMsg.toLowerCase().includes('aventura')
        ) {
          replyText = getOfflinePedagogicalStory({ customPrompt: lastMsg });
        } else {
          replyText =
            '¡Hola! Valerio está aquí contigo. He recibido tu mensaje con mucho cariño. Cuéntame con más detalle: ¿sobre qué valor o situación familiar te gustaría que preparemos hoy un cuento especial? Estoy listo para redactarlo.';
        }
      }

      return res.status(200).json({ reply: replyText });
    } catch (error: any) {
      console.error('Error en el chat con Valerio:', error);
      return res.status(200).json({
        reply:
          '¡Hola! Tuve una pequeña interferencia mágica, pero ya estoy aquí. Por favor, repíteme tu pregunta o dime el nombre del niño y el valor para redactarte un cuento maravilloso.',
      });
    }
  };

  app.post('/api/chat', handleValerioChat);

  // ==========================================
  // Buzón de Sugerencias (/api/suggestions)
  // ==========================================
  const RECIPIENT_EMAIL = 'jchurizar@gmail.com';

  interface SuggestionRecord {
    id: string;
    name: string;
    email: string;
    valueSuggestion: string;
    message: string;
    createdAt: string;
    read: boolean;
    emailSent: boolean;
    provider: string;
  }

  interface MailRelayConfig {
    web3formsKey?: string;
    formspreeEndpoint?: string;
  }

  const resolveWritableDataFile = (filename: string): string => {
    const projectDataDir = path.join(__dirname, 'data');
    try {
      if (!fs.existsSync(projectDataDir)) {
        fs.mkdirSync(projectDataDir, { recursive: true });
      }
      const target = path.join(projectDataDir, filename);
      if (!fs.existsSync(target)) {
        fs.writeFileSync(target, filename.includes('config') ? '{}' : '[]', 'utf8');
      }
      return target;
    } catch {
      const tmpTarget = path.join('/tmp', `cuentos-${filename}`);
      if (!fs.existsSync(tmpTarget)) {
        fs.writeFileSync(tmpTarget, filename.includes('config') ? '{}' : '[]', 'utf8');
      }
      return tmpTarget;
    }
  };

  const suggestionsFilePath = resolveWritableDataFile('suggestions.json');
  const mailConfigFilePath = resolveWritableDataFile('mail-config.json');

  const readSuggestions = (): SuggestionRecord[] => {
    try {
      const raw = fs.readFileSync(suggestionsFilePath, 'utf8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeSuggestions = (items: SuggestionRecord[]) => {
    try {
      fs.writeFileSync(suggestionsFilePath, JSON.stringify(items, null, 2), 'utf8');
    } catch (err) {
      console.warn('No se pudieron persistir sugerencias en disco:', err);
    }
  };

  const readMailConfig = (): MailRelayConfig => {
    try {
      const raw = fs.readFileSync(mailConfigFilePath, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };

  const writeMailConfig = (cfg: MailRelayConfig) => {
    try {
      fs.writeFileSync(mailConfigFilePath, JSON.stringify(cfg, null, 2), 'utf8');
    } catch (err) {
      console.warn('No se pudo guardar configuración de correo:', err);
    }
  };

  const getActiveMailProvider = (clientWeb3FormsKey?: string) => {
    const saved = readMailConfig();
    const resendKey = process.env.RESEND_API_KEY?.trim();
    const web3Key =
      process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
      saved.web3formsKey?.trim() ||
      clientWeb3FormsKey?.trim();
    const formspreeUrl =
      process.env.FORMSPREE_ENDPOINT?.trim() || saved.formspreeEndpoint?.trim();

    return { resendKey, web3Key, formspreeUrl };
  };

  const tryForwardEmail = async (payload: {
    name: string;
    email: string;
    valueSuggestion: string;
    message: string;
    clientWeb3FormsKey?: string;
  }): Promise<{ sent: boolean; provider: string }> => {
    const { resendKey, web3Key, formspreeUrl } = getActiveMailProvider(payload.clientWeb3FormsKey);
    const subject = `Sugerencia de Cuento Infantil: ${payload.valueSuggestion}`;

    // 1. Resend (si RESEND_API_KEY está configurado)
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
            to: [RECIPIENT_EMAIL],
            reply_to: payload.email && payload.email.includes('@') ? payload.email : undefined,
            subject,
            text: `Nombre / Escuela: ${payload.name}\nCorreo: ${payload.email || 'No proporcionado'}\nValor sugerido: ${payload.valueSuggestion}\n\nMensaje:\n${payload.message}`,
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (resp.ok) {
          return { sent: true, provider: 'resend' };
        }
      } catch (err) {
        console.warn('Resend forwarding failed:', err);
      }
    }

    // 2. Formspree (si FORMSPREE_ENDPOINT está configurado)
    if (formspreeUrl) {
      try {
        const resp = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email || 'sin-email@cuentosyvalores.es',
            _replyto: payload.email || undefined,
            _subject: subject,
            valor: payload.valueSuggestion,
            message: payload.message,
          }),
          signal: AbortSignal.timeout(6000),
        });
        if (resp.ok) {
          return { sent: true, provider: 'formspree' };
        }
      } catch (err) {
        console.warn('Formspree forwarding failed:', err);
      }
    }

    // 3. Web3Forms (si WEB3FORMS_ACCESS_KEY está configurado)
    if (web3Key) {
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
            from_name: payload.name,
            name: payload.name,
            email: payload.email || 'sin-email@cuentosyvalores.es',
            valor: payload.valueSuggestion,
            message: payload.message,
          }),
          signal: AbortSignal.timeout(6000),
        });
        const data = await resp.json().catch(() => null);
        if (resp.ok && data?.success) {
          return { sent: true, provider: 'web3forms' };
        }
      } catch (err) {
        console.warn('Web3Forms forwarding failed:', err);
      }
    }

    // 4. FormSubmit best-effort con timeout estricto de 3.5s (no bloquea si está caído)
    try {
      const resp = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
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
          Nombre_o_Escuela: payload.name,
          Correo_Contacto: payload.email || 'No proporcionado',
          Valor_Sugerido: payload.valueSuggestion,
          Mensaje: payload.message,
        }),
        signal: AbortSignal.timeout(3500),
      });
      const data = await resp.json().catch(() => null);
      if (resp.ok && (data?.success === true || data?.success === 'true')) {
        return { sent: true, provider: 'formsubmit' };
      }
    } catch {
      // Silencioso: FormSubmit puede devolver 500 o timeout, la sugerencia ya queda guardada en el buzón
    }

    return { sent: false, provider: 'inbox' };
  };

  app.post('/api/suggestions', async (req: Request, res: Response) => {
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

      const forwardResult = await tryForwardEmail({
        name: cleanName,
        email: cleanEmail,
        valueSuggestion: cleanValue,
        message: cleanMessage,
        clientWeb3FormsKey: typeof web3formsKey === 'string' ? web3formsKey : undefined,
      });

      const newRecord: SuggestionRecord = {
        id: `sug-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: cleanName,
        email: cleanEmail,
        valueSuggestion: cleanValue,
        message: cleanMessage,
        createdAt: new Date().toISOString(),
        read: false,
        emailSent: forwardResult.sent,
        provider: forwardResult.provider,
      };

      const existing = readSuggestions();
      writeSuggestions([newRecord, ...existing].slice(0, 200));

      return res.status(200).json({
        success: true,
        saved: true,
        emailSent: forwardResult.sent,
        provider: forwardResult.provider,
        suggestion: newRecord,
      });
    } catch (err) {
      console.error('Error en POST /api/suggestions:', err);
      return res.status(500).json({ error: 'No se pudo registrar la sugerencia en este momento.' });
    }
  });

  app.get('/api/suggestions', (_req: Request, res: Response) => {
    const { resendKey, web3Key, formspreeUrl } = getActiveMailProvider();
    const activeProvider = resendKey
      ? 'resend'
      : formspreeUrl
        ? 'formspree'
        : web3Key
          ? 'web3forms'
          : 'inbox-only';

    return res.json({
      suggestions: readSuggestions(),
      emailConfigured: Boolean(resendKey || web3Key || formspreeUrl),
      provider: activeProvider,
      recipientEmail: RECIPIENT_EMAIL,
    });
  });

  app.patch('/api/suggestions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { read } = req.body || {};
    const items = readSuggestions();
    const updated = items.map((item) =>
      item.id === id ? { ...item, read: typeof read === 'boolean' ? read : true } : item
    );
    writeSuggestions(updated);
    return res.json({ success: true });
  });

  app.delete('/api/suggestions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const items = readSuggestions().filter((item) => item.id !== id);
    writeSuggestions(items);
    return res.json({ success: true });
  });

  app.post('/api/suggestions/config', (req: Request, res: Response) => {
    const { web3formsKey, formspreeEndpoint } = req.body || {};
    const current = readMailConfig();
    const next: MailRelayConfig = {
      web3formsKey:
        typeof web3formsKey === 'string' ? web3formsKey.trim() : current.web3formsKey,
      formspreeEndpoint:
        typeof formspreeEndpoint === 'string'
          ? formspreeEndpoint.trim()
          : current.formspreeEndpoint,
    };
    writeMailConfig(next);
    return res.json({
      success: true,
      emailConfigured: Boolean(
        process.env.RESEND_API_KEY ||
          process.env.WEB3FORMS_ACCESS_KEY ||
          process.env.FORMSPREE_ENDPOINT ||
          next.web3formsKey ||
          next.formspreeEndpoint
      ),
    });
  });

  // Serve Vite in development or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor de Cuentos con Valores iniciado en http://0.0.0.0:${PORT}`);
  });
}

startServer();
