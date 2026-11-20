// Client-side pedagogical fallback engine for Valerio so the assistant works
// 100% reliably both with a Node/Gemini backend AND on static hosting (dist/ only).

export interface ValerioRequestParams {
  childName?: string;
  value?: string;
  ageGroup?: string;
  theme?: string;
  customPrompt?: string;
  message?: string;
  messages?: Array<{ role: string; content: string }>;
}

const VALUE_PLOT_TEMPLATES: Record<
  string,
  (name: string, theme: string, detail: string) => { title: string; paragraphs: string[]; q1: string; q2: string; drawing: string }
> = {
  generosidad: (name, theme, detail) => ({
    title: `El Tesoro Compartido de ${name}`,
    paragraphs: [
      `Había una vez en ${theme}, un niño o niña muy alegre llamado ${name}. Un día encontró una pequeña caja llena de estrellas luminosas que brillaban con colores cálidos${detail ? `, justo cuando pensaba en ${detail}` : ''}.`,
      `Al principio, ${name} pensó en guardar todas las estrellas para verlas en secreto. Pero pronto escuchó a un pequeño erizo y a un búho que buscaban un poco de luz para encontrar el camino de vuelta a su hogar antes de que cayera la noche.`,
      `Sin dudarlo, ${name} abrió su caja y regaló dos estrellas brillantes a sus nuevos amigos. En ese mismo instante ocurrió algo maravilloso: las estrellas que quedaron en la caja brillaron el doble y formaron un arcoíris suave en el cielo.`,
      `${name} volvió a casa con el corazón calentito y descubrió un gran secreto: cuando compartimos lo bueno con cariño, la alegría nunca se gasta, sino que se multiplica.`,
    ],
    q1: `¿Cómo crees que se sintieron los amigos de ${name} al recibir ayuda con tanta generosidad?`,
    q2: `¿Qué detalle bonito podemos compartir hoy en casa o en el colegio para alegrar a alguien?`,
    drawing: `Dibuja a ${name} entregando estrellas brillantes a los animalitos bajo un cielo lleno de colores.`,
  }),
  paciencia: (name, theme, detail) => ({
    title: `La Semilla Mágica de ${name}`,
    paragraphs: [
      `En un rincón tranquilo de ${theme}, ${name} plantó una semilla dorada con mucha ilusión${detail ? `, recordando siempre ${detail}` : ''}. Al día siguiente fue corriendo a mirarla, pero la tierra seguía igual.`,
      `"¡Quiero que crezca ya!", suspiró ${name} un poco impaciente. Una vieja tortuga sabia que pasaba por allí sonrió con dulzura y le dijo: "Todo lo hermoso necesita su tiempo, como las nubes que viajan sin prisa".`,
      `Entonces ${name} respiró hondo tres veces, como si soplara una flor de diente de león, y decidió cuidar la maceta cada mañana con agua fresca, cariño y calma, mientras jugaba y aprendía cosas nuevas.`,
      `Una semana después, un brote verde y fuerte se abrió paso hacia el sol con una flor radiante. ${name} saltó de alegría al comprobar que saber esperar con calma hace que los logros sean todavía más especiales.`,
    ],
    q1: `¿Qué truco usó ${name} para calmarse cuando sentía impaciencia?`,
    q2: `¿En qué momentos del día nos cuesta más esperar y cómo podemos practicar la respiración tranquila?`,
    drawing: `Dibuja a ${name} regando su maceta junto a la tortuga sabia mientras brota una gran flor brillante.`,
  }),
  valentía: (name, theme, detail) => ({
    title: `${name} y la Linterna del Corazón Valiente`,
    paragraphs: [
      `Una tarde tranquila en ${theme}, las sombras empezaron a alargarse y ${name} sintió un pequeño cosquilleo de miedo en la barriga${detail ? ` al pensar en ${detail}` : ''}.`,
      `En lugar de esconderse bajo las sábanas, ${name} recordó que ser valiente no significa no sentir miedo nunca, sino dar un pasito adelante aunque las piernas tiemblen un poquito.`,
      `Con una respiración profunda, encendió una pequeña linterna cálida y descubrió que aquella sombra grande que parecía un monstruo era en realidad la rama de un árbol saludando con el viento, y detrás había un gatito buscando abrigo.`,
      `Al ayudar al gatito, el miedo desapareció como por arte de magia. ${name} sonrió con orgullo: dentro de su propio corazón llevaba siempre la luz más valiente de todas.`,
    ],
    q1: `¿Ser valiente significa no tener miedo nunca, o atreverse a mirar con calma incluso cuando sentimos nervios?`,
    q2: `¿Qué cosa pequeña te daba un poco de respeto antes y ahora ya sabes superar?`,
    drawing: `Dibuja a ${name} sosteniendo una linterna dorada y rescatando con una sonrisa al pequeño gatito.`,
  }),
  empatía: (name, theme, detail) => ({
    title: `Las Gafas Invisibles de ${name}`,
    paragraphs: [
      `Mientras exploraba ${theme}, ${name} encontró a un compañero sentado en un banco con la mirada baja y sin ganas de jugar${detail ? ` (${detail})` : ''}.`,
      `Al principio nadie entendía por qué estaba tan callado. Pero ${name} se puso unas "gafas invisibles del corazón" para imaginar cómo se sentiría en su lugar si hubiera tenido un mal día.`,
      `Así que se acercó despacio, se sentó a su lado sin hacer ruido y le preguntó con voz suave: "¿Quieres contarme qué pasa o prefieres que dibujemos juntos un ratito?".`,
      `Con ese gesto sencillo, una sonrisa tímida volvió al rostro de su amigo. ${name} comprendió que escuchar con atención y ponerse en los zapatos del otro es el mayor superpoder del mundo.`,
    ],
    q1: `¿Por qué ayudó tanto que ${name} escuchara en calma en lugar de seguir corriendo?`,
    q2: `¿Cómo podemos notar cuando un amigo o familiar necesita un abrazo o que le escuchemos?`,
    drawing: `Dibuja a ${name} sentado junto a su amigo compartiendo lápices de colores y una gran sonrisa.`,
  }),
  honestidad: (name, theme, detail) => ({
    title: `${name} y el Puente de la Verdad`,
    paragraphs: [
      `Jugando con mucha energía en ${theme}, ${name} tropezó sin querer y derramó el frasco de pintura favorita del taller${detail ? ` justo mientras ocurría ${detail}` : ''}.`,
      `Su primer impulso fue esconder el frasco detrás de una maceta para que nadie lo viera. Pero al mirar el suelo, sintió un nudo incómodo en el estómago: guardar un secreto así pesaba demasiado.`,
      `Respiró hondo, buscó un trapo y fue a contar exactamente lo ocurrido con sinceridad: "Fue un accidente, lo siento mucho y quiero ayudar a limpiarlo".`,
      `Lejos de enfadarse, todos agradecieron su sinceridad y limpiaron juntos en dos minutos. ${name} sintió su corazón ligero como una pluma al comprobar que decir la verdad siempre construye confianza.`,
    ],
    q1: `¿Cómo cambió el sentimiento de ${name} antes y después de decir la verdad?`,
    q2: `¿Por qué confiamos más en las personas que reconocen sus errores con sinceridad?`,
    drawing: `Dibuja a ${name} ayudando a limpiar las manchas de colores del taller con una cara tranquila y feliz.`,
  }),
};

function buildPersonalizedStory(params: ValerioRequestParams): string {
  const name = params.childName?.trim() || 'Lucía';
  const val = params.value?.trim() || 'Empatía y Amabilidad';
  const age = params.ageGroup?.trim() || '6 a 8 años';
  const themeClean = (params.theme || 'un bosque mágico lleno de amigos')
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .trim();
  const detail = params.customPrompt?.trim() || '';

  const lowerVal = val.toLowerCase();
  let key = 'generosidad';
  if (lowerVal.includes('pacien') || lowerVal.includes('calma') || lowerVal.includes('rabieta')) key = 'paciencia';
  else if (lowerVal.includes('valen') || lowerVal.includes('miedo') || lowerVal.includes('supera')) key = 'valentía';
  else if (lowerVal.includes('empat') || lowerVal.includes('amabil')) key = 'empatía';
  else if (lowerVal.includes('honest') || lowerVal.includes('verdad') || lowerVal.includes('sincer')) key = 'honestidad';

  const story = VALUE_PLOT_TEMPLATES[key](name, themeClean, detail);

  return `🌟 **${story.title}**

👦 **Ficha del Cuento**:
• Protagonista: ${name}
• Valor trabajado: ${val}
• Edad recomendada: ${age}

📖 **El Cuento**:
${story.paragraphs.join('\n\n')}

💡 **Para reflexionar en familia**:
1. ${story.q1}
2. ${story.q2}

🎨 **Idea para colorear y dibujar**:
${story.drawing} ✨`;
}

function buildParentingAdvice(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('rabieta') || q.includes('frustr') || q.includes('enfad') || q.includes('llor')) {
    return `¡Hola! Soy **Valerio** 📖✨. Qué pregunta tan importante haces; acompañar las rabietas con calma es todo un arte de amor:

1. **Primero calma, luego enseñanza:** Durante una rabieta el cerebro emocional está desbordado. Acompaña en silencio cerca del niño, sin gritar ni dar largos sermones en ese instante.
2. **Pon nombre a lo que siente:** *"Veo que estás muy enfadado porque querías seguir jugando. Te entiendo, a veces cuesta parar"*. Sentirse comprendido baja la tormenta más rápido.
3. **Un recurso visual divertido:** Practicad juntos cuando estéis tranquilos la **"respiración del globo"** o el **"soplo de la vela"**, para usarlo como herramienta cuando suba el enfado.
4. **Refuerza el límite con cariño:** Validar la emoción no significa ceder en la norma: *"Entiendo tu enfado, pero ahora toca recoger para cenar"*.

Si quieres, dime el nombre de tu hijo o hija y te escribo un cuento personalizado sobre cómo transformar los enfados en calma.`;
  }

  if (q.includes('compart') || q.includes('juguete') || q.includes('egois') || q.includes('generos')) {
    return `¡Hola! Soy **Valerio** 📖✨. Aprender a compartir es un proceso gradual y muy normal que cueste en los primeros años. Aquí tienes 4 ideas prácticas:

1. **No obligar al instante:** En los más pequeños, los juguetes son parte de su seguridad. En lugar de quitarles el juguete, introduce los **turnos con reloj de arena** (*"5 minutos tú y 5 minutos tu amigo"*).
2. **Elegir "tesoros especiales" antes de recibir visitas:** Permítele guardar 1 o 2 juguetes favoritos antes de que lleguen otros niños; eso le da tranquilidad para prestar el resto con gusto.
3. **Modelar con el ejemplo:** Comparte con él cosas tuyas en voz alta (*"Mira, comparto contigo la mitad de esta manzana porque me encanta disfrutarla juntos"*).
4. **Celebrar el gesto:** Elogia el bienestar que provoca compartir (*"¡Mira qué sonrisa ha puesto tu amigo cuando le dejaste el camión!"*).

¿Te gustaría que inventemos un cuento breve con su nombre sobre la alegría de compartir?`;
  }

  if (q.includes('miedo') || q.includes('oscur') || q.includes('dormir') || q.includes('noche') || q.includes('pesadilla')) {
    return `¡Hola! Soy **Valerio** 📖✨. Los miedos nocturnos son una señal de una imaginación viva y saludable. Te comparto cómo acompañarlos con dulzura:

1. **Nunca ridiculizar el miedo:** Evita frases como *"no pasa nada, eres mayor"*. En su lugar di: *"Sé que ahora la habitación parece muy grande; estoy aquí contigo hasta que te sientas seguro"*.
2. **Ritual previsible antes de dormir:** Baño templado, luz tenue, un cuento sereno y una oración o abrazo de buenas noches ayudan al cerebro a bajar revoluciones.
3. **Luz quitamiedos o "spray mágico":** Una pequeña luz cálida o revisar juntos la habitación antes de acostarse da sensación de control.
4. **Historias de valentía suave:** Leer cuentos donde el miedo se entiende con calma da herramientas simbólicas al niño.

¿Quieres que preparemos ahora un cuento relajante para antes de dormir con el nombre de tu peque?`;
  }

  if (q.includes('paciencia') || q.includes('esperar') || q.includes('prisa')) {
    return `¡Hola! Soy **Valerio** 📖✨. En un mundo lleno de prisas, enseñar la paciencia es un regalo enorme para la infancia:

1. **Hacer visible el tiempo:** Los niños pequeños no entienden "en 5 minutos". Usa referencias concretas (*"cuando termine esta canción"* o *"cuando la arena llegue abajo"*).
2. **Juegos de espera tranquila:** El clásico *Veo-Veo*, contar coches de colores o inventar historias cortas en la cola del supermercado convierten la espera en juego.
3. **Proyectos lentos en casa:** Plantar una lenteja en algodón o hacer pan casero enseña de verdad que las cosas valiosas llevan su ritmo.

Si me dices la edad y el nombre de tu niño o niña, redacto un cuento precioso sobre la paciencia ahora mismo.`;
  }

  if (q.includes('celos') || q.includes('herman')) {
    return `¡Hola! Soy **Valerio** 📖✨. Los celos entre hermanos nacen casi siempre del miedo a perder cariño o atención. Te sugiero estos pasos llenos de tacto:

1. **Tiempo exclusivo diario:** Aunque sean solo 15 minutos al día uno a uno con cada hermano, sin pantallas ni interrupciones, llena muchísimo su depósito emocional.
2. **Evitar comparaciones:** Cambia *"mira tu hermano qué bien come"* por valorar las fortalezas propias de cada uno.
3. **Darle un papel importante, sin sobrecargar:** Invitarle a elegir el cuento de la noche o ayudar como "hermano mayor experto" fortalece el vínculo.

¿Quieres que escribamos un cuento protagonizado por los dos hermanos para reforzar su complicidad?`;
  }

  return `¡Hola! Soy **Valerio** 📖✨, tu asistente y cuentacuentos de *Cuentos con Valores*.

He leído tu mensaje con mucha atención. Puedo ayudarte ahora mismo de dos formas:
• **Crear un cuento personalizado:** Dime el **nombre** del niño o niña, su **edad** y el **valor** (por ejemplo: *"Haz un cuento para Sofía de 6 años sobre la empatía"*).
• **Darte orientación pedagógica:** Pregúntame sobre **rabietas, paciencia, compartir juguetes, miedos nocturnos, celos entre hermanos o rutinas para dormir**.

¿Qué te gustaría probar ahora?`;
}

export function generateValerioLocalReply(params: ValerioRequestParams): string {
  // 1. Wizard form submission (has childName)
  if (params.childName) {
    return buildPersonalizedStory(params);
  }

  const rawText = (
    params.message ||
    params.customPrompt ||
    params.messages?.[params.messages.length - 1]?.content ||
    ''
  ).trim();
  const lower = rawText.toLowerCase();

  // 2. User asks to shorten / rhyme / adapt previous story in chat
  const previousStory = params.messages
    ?.slice()
    .reverse()
    .find((m) => m.role === 'model' && m.content.includes('**El Cuento**'));

  if (previousStory && (lower.includes('corto') || lower.includes('breve') || lower.includes('dormir') || lower.includes('rima'))) {
    if (lower.includes('rima')) {
      return `✨ **Versión Rimada con Cariño** ✨

En un mundo de luz y alegría,
un corazón noble crecía cada día.
Con calma, respeto y ganas de ayudar,
supo que el cariño se debe cuidar.

Cuando compartimos sin miedo al error,
brilla en la familia la paz y el amor.
Cierra los ojitos, respira profundo,
que los buenos valores iluminan el mundo. 🌙🌟

¿Te gustaría que cambiemos algún personaje o inventemos otra historia?`;
    }

    return `🌙 **Versión Corta para Antes de Dormir**

Había una vez un pequeño corazón curioso que, tras vivir una gran aventura, comprendió que la bondad, la verdad y el cariño son las estrellas que mejor guían nuestro camino. Al caer la noche, guardó esa enseñanza bajo su almohada, sonrió en paz y se durmió soñando con un mañana lleno de alegría.

✨ *Duerme tranquilo, sabiendo que cada día es una nueva oportunidad para hacer el bien.*`;
  }

  // 3. Explicit story request in free chat
  if (
    lower.includes('cuento') ||
    lower.includes('historia') ||
    lower.includes('aventura') ||
    lower.includes('fábula') ||
    lower.includes('fabula') ||
    lower.includes('inventa') ||
    lower.includes('crea')
  ) {
    // Extract a possible child name after "para " if present
    const paraMatch = rawText.match(/para\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
    const extractedName = paraMatch?.[1];
    let detectedValue = 'Generosidad y Compañerismo';
    if (lower.includes('pacien') || lower.includes('calma')) detectedValue = 'Paciencia y Calma';
    else if (lower.includes('valen') || lower.includes('miedo')) detectedValue = 'Valentía y Superación';
    else if (lower.includes('empat') || lower.includes('amab') || lower.includes('respet')) detectedValue = 'Empatía y Amabilidad';
    else if (lower.includes('honest') || lower.includes('verdad') || lower.includes('mentir')) detectedValue = 'Honestidad y Sinceridad';

    return buildPersonalizedStory({
      childName: extractedName,
      value: detectedValue,
      theme: 'un bosque encantado lleno de estrellas y amigos',
      customPrompt: rawText,
    });
  }

  // 4. Parenting / values question
  return buildParentingAdvice(rawText);
}
