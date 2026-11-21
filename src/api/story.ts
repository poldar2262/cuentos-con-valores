import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'La variable de entorno GEMINI_API_KEY no está configurada.',
    });
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const SYSTEM_INSTRUCTION = `Eres "Chispitas", un cuentacuentos infantil mágico, entrañable, sabio y con un profundo sentido pedagógico para familias, escuelas y niños de 3 a 12 años.
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
5. Puedes también sugerir valores si los padres te cuentan una situación real.`;

  try {
    const { messages, childName, value, ageGroup, theme, customPrompt } = req.body || {};

    let contents: any[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
    } else {
      const prompt = `¡Hola Chispitas! Por favor, crea un hermoso cuento infantil personalizado con estos datos:
• Nombre del protagonista: ${childName || 'un niño bueno'}
• Valor o virtud a transmitir: ${value || 'la generosidad y el compañerismo'}
• Edad recomendada: ${ageGroup || '5 a 8 años'}
${theme ? `• Temática o personajes preferidos: ${theme}` : ''}
${customPrompt ? `• Nota o detalle especial de la familia: ${customPrompt}` : ''}

¡Hazlo muy tierno, formativo y entrañable!`;

      contents = [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
      },
    });

    const reply = response.text || 'No pude redactar el cuento en este momento. Por favor, inténtalo de nuevo.';
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error generating story in Vercel function:', error);
    return res.status(500).json({
      error: error?.message || 'Error en el servidor al generar el cuento con IA.',
    });
  }
}
