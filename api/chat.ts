import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Configuración de cabeceras para CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  try {
    const { message, messages } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'No se ha detectado la clave GEMINI_API_KEY en las variables de entorno de Vercel.',
      });
    }

    // Inicializamos Gemini con la variable de entorno
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Construimos los contenidos (soporta tanto 'message' individual como 'messages' en array)
    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      // Gemini exige que el primer turno sea del usuario
      while (contents.length > 0 && contents[0].role !== 'user') {
        contents.shift();
      }
    }

    if (contents.length === 0) {
      if (!message) {
        return res.status(400).json({ error: 'Debes proporcionar un mensaje para Valerio.' });
      }
      contents = [{ role: 'user', parts: [{ text: message }] }];
    }

    const systemInstruction =
      "Eres Valerio, un asistente amigable y experto en cuentos infantiles con valores para la web 'Cuentos con Valores'. Ayudas a los papás, mamás y niños a resolver dudas, inspirar historias llenas de valores positivos y reflexionar en familia. Puedes responder preguntas sobre educación en virtudes, consejos para la lectura infantil, detalles de la plataforma o cualquier inquietud de los padres con cariño, empatía y claridad pedagógica. Si te piden un cuento, invéntalo con su moraleja y preguntas para reflexionar.";

    const candidateModels = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-3.8-flash'];
    let replyText = '';
    let lastErr: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        if (response && response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        lastErr = err;
      }
    }

    if (!replyText) {
      throw lastErr || new Error('No se pudo obtener respuesta de Valerio.');
    }

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Error en el chat con Valerio:', error);
    return res.status(500).json({
      error: 'Hubo un error al procesar tu cuento con Valerio.',
      details: error?.message || String(error),
    });
  }
}
