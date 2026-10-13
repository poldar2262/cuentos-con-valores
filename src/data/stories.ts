import { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'mateo-y-el-misterio-del-telescopio-roto',
    title: 'Mateo y el Misterio del Telescopio Roto',
    author: 'Juancar Hidalgo',
    value: 'Honestidad',
    valueDescription: 'La valentía de decir la verdad y asumir los errores nos hace dignos de confianza y libera nuestro corazón.',
    valueBadgeColor: 'text-amber-800',
    valueBadgeBg: 'bg-amber-100',
    valueBorderColor: 'border-amber-300',
    ageRange: '6 - 11 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'El profesor llevó a clase un valioso telescopio dorado antiguo para observar las estrellas. Cuando un desafortunado tropiezo provoca que una pieza se rompa, Mateo se enfrenta al dilema de callar o dar la cara con sinceridad y valentía.',
    coverImage: '/assets/mateo-telescopio-roto.jpg',
    pdfUrl: '', // Pendiente del enlace de Google Drive
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/573/573381_11861866-lq.mp3',
    audioDuration: '4:20 min',
    moralLesson: 'Un error accidental le puede ocurrir a cualquiera; lo que define nuestro carácter es tener la honestidad y la valentía de reconocerlo de inmediato.',
    discussionQuestions: [
      '¿Por qué sentimos a veces miedo o un "nudo en la barriga" antes de reconocer un fallo accidental?',
      '¿Qué consecuencias tiene guardar silencio frente a decir la verdad desde el primer momento?',
      '¿Cómo reaccionó la clase y el maestro cuando Mateo demostró su honestidad?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'Aquella mañana de martes, el aula de ciencias no era como las demás. Sobre una mesa cerca de la ventana descansaba un magnífico telescopio de latón dorado, con un trípode de madera pulida que brillaba con los rayos del sol. Mateo y su compañera Mei se acercaron fascinados a contemplarlo.',
        illustrationDescription: 'Mateo y Mei contemplando entusiasmados el telescopio dorado sobre la mesa del aula.'
      },
      {
        pageNumber: 2,
        text: 'El maestro explicó que aquel instrumento tenía más de cincuenta años y que esa misma tarde lo usarían para contemplar los anillos de Saturno. "Tratadlo con mucho cuidado cuando paséis a su lado", advirtió con una sonrisa cariñosa antes de salir un momento al despacho de dirección.',
        illustrationDescription: 'El maestro explicando el funcionamiento del telescopio a los alumnos en clase.'
      },
      {
        pageNumber: 3,
        text: 'Mateo no pudo resistir la curiosidad. Quiso ajustar la ruedecilla de enfoque para ver cómo se movían las lentes interiores. Pero al girarse apresuradamente, la tira de su mochila se enganchó con una de las patas del trípode. ¡El telescopio se tambaleó y cayó sobre el pupitre con un seco "clack"!',
        illustrationDescription: 'El telescopio tambaleándose mientras la mochila de Mateo roza la pata de madera.'
      },
      {
        pageNumber: 4,
        text: 'El silencio se apoderó del aula. El ocular pequeño se había desprendido y una fina grieta atravesaba la lente reflectora. A Mateo se le congeló la respiración. Su mente empezó a buscar excusas: "¿Y si digo que una corriente de aire movió la cortina? ¿O que ya estaba flojo?". El corazón le latía con fuerza.',
        illustrationDescription: 'Mateo con las manos en el pecho mirando con preocupación la lente rota del telescopio.'
      },
      {
        pageNumber: 5,
        text: 'Mei lo miró a los ojos con serenidad: "Mateo, un accidente le puede pasar a cualquiera, pero esconder la verdad solo hace que el problema crezca". Mateo respiró hondo. Recordó las enseñanzas sobre la honradez y supo que no quería vivir con el peso de una mentira.',
        illustrationDescription: 'Mei hablando con afecto y calma a Mateo junto a la ventana del aula.'
      },
      {
        pageNumber: 6,
        text: 'Cuando el maestro regresó al aula, Mateo dio un paso al frente sin dudar. Con voz temblorosa pero firme, dijo: "Profesor, he sido yo. Fui imprudente al acercarme demasiado con la mochila puesta y se cayó. Lo lamento mucho y quiero ayudar a repararlo".',
        illustrationDescription: 'Mateo confesando la verdad con respeto y nobleza ante el maestro.'
      },
      {
        pageNumber: 7,
        text: 'El aula contuvo el aliento, pero el maestro sonrió con serenidad. Puso una mano en el hombro de Mateo: "Lamento el daño del telescopio, pero me alegra inmensamente tu valor. Las lentes se pueden reemplazar, pero la confianza y la honestidad de una persona son un tesoro invaluable".',
        illustrationDescription: 'El maestro sonriendo y felicitando a Mateo por su sinceridad ante toda la clase.'
      },
      {
        pageNumber: 8,
        text: 'Esa misma tarde, el maestro y los alumnos repararon juntos la lente con piezas de recambio. Y cuando cayó la noche y lograron observar las lunas brillantes de Saturno, Mateo sintió su corazón ligero y lleno de paz, comprendiendo que la verdad siempre es la estrella más luminosa.',
        illustrationDescription: 'Los niños observando el cielo nocturno estrellado a través del telescopio reparado.'
      }
    ],
    coloringSheet: {
      id: 'color-mateo-telescopio',
      title: 'Mateo y el Telescopio',
      characterName: 'Mateo',
      svgId: 'mateo-telescopio',
      lineartImage: '/assets/colorear_telescopio.jpg'
    }
  },
  {
    id: 'una-mision-para-dos',
    title: 'Una Misión para Dos',
    author: 'Juancar Hidalgo',
    value: 'Amistad',
    valueDescription: 'La verdadera amistad multiplica las alegrías, comparte las cargas y convierte cualquier rincón en una gran aventura.',
    valueBadgeColor: 'text-indigo-800',
    valueBadgeBg: 'bg-indigo-100',
    valueBorderColor: 'border-indigo-300',
    ageRange: '4 - 9 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'En una tarde lluviosa dentro del garaje, Leo y Maya descubren una enorme caja de cartón. Lo que para otros sería un simple desecho, para dos amigos inseparables se convierte en la nave estelar más veloz del universo. Juntos aprenderán que el mayor motor de cualquier viaje es confiar el uno en el otro.',
    coverImage: '/assets/una-mision-para-dos.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/416/416632_5121236-lq.mp3',
    audioDuration: '4:20 min',
    moralLesson: 'Un buen amigo no solo te acompaña en el juego: te escucha, valora tus ideas y te ayuda a llegar a lugares que jamás habrías alcanzado solo.',
    discussionQuestions: [
      '¿Qué objeto ordinario transformaron Leo y Maya con su imaginación y trabajo en equipo?',
      '¿Por qué Maya le dijo a Leo que la nave no podía despegar si faltaba uno de los dos pilotos?',
      '¿Qué es lo que más te gusta compartir y hacer con tu mejor amigo o amiga?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'La lluvia golpeaba con fuerza el tejado de chapa del garaje de la abuela. Las gotas sonaban como un tambor lejano: tap, tap, tap. Leo miraba por la rendija del portón con los brazos cruzados, pensando que la tarde de sábado estaba completamente perdida.',
        illustrationDescription: 'Leo mirando la lluvia a través del portón del garaje con expresión aburrida.'
      },
      {
        pageNumber: 2,
        text: 'De repente, Maya saltó de detrás de unas estanterías con un peto amarillo manchado de témpera y una sonrisa de oreja a oreja: "¡Leo, mira lo que ha dejado el tío Ramón tras comprar la nevera nueva!". En el centro del taller descansaba una caja de cartón colosal.',
        illustrationDescription: 'Maya señalando entusiasmada la gigantesca caja de cartón en medio del garaje.'
      },
      {
        pageNumber: 3,
        text: 'Leo se acercó y tocó el cartón ondulado: "¿Una caja vacía? ¿Y qué se supone que hacemos con esto?". Maya le dio un guiño cómplice y se metió de un salto dentro: "¡No es una caja, Leo! ¡Es el crucero espacial Nautilus-7! Pero el sistema de propulsión necesita a su copiloto jefe".',
        illustrationDescription: 'Maya asomando la cabeza desde el interior de la caja e invitando a Leo a subir.'
      },
      {
        pageNumber: 4,
        text: 'Una chispa se encendió en los ojos de Leo. Olvidó la lluvia, cogió carrerilla y se deslizó al interior de la caja. El espacio era amplio, olía a madera seca y cartón nuevo. "¡Comandante Maya, copiloto Leo listo para el informe de misión!", exclamó.',
        illustrationDescription: 'Leo sentado dentro de la caja junto a Maya, chocando las palmas con energía.'
      },
      {
        pageNumber: 5,
        text: 'Maya alzó el dedo índice hacia el techo del garaje: "¡Mira hacia arriba, Leo! Allá arriba, entre las vigas de madera, están las lunas de Júpiter esperándonos. Vamos a atravesar una tormenta de asteroides plateados".',
        illustrationDescription: 'Maya señalando hacia arriba con ilusión mientras Leo mira fascinado imaginando las estrellas.'
      },
      {
        pageNumber: 6,
        text: 'Al principio, Leo quiso tomar el timón solo y virar a la derecha, pero la caja casi volcó hacia un costado. "¡Cuidado!", rió Maya. "En una nave como esta no manda uno solo. Si viramos, remamos al compás. Uno, dos... ¡uno, dos!". Leo entendió enseguida el ritmo.',
        illustrationDescription: 'Los dos amigos coordinando sus movimientos para balancear la nave de cartón entre risas.'
      },
      {
        pageNumber: 7,
        text: 'Con trozos de tiza blanca y dos linternas viejas que encontraron en un cajón, iluminaron el interior creando constelaciones mágicas en las paredes de cartón. El garaje entero parecía flotar en medio de una galaxia secreta solo conocida por ellos.',
        illustrationDescription: 'El interior de la caja iluminado suavemente con linternas proyectando sombras de estrellas.'
      },
      {
        pageNumber: 8,
        text: 'Cuando la lluvia cesó y un rayo de sol tibio se coló por la claraboya, la abuela abrió la puerta con dos tazas de chocolate caliente: "¡Vaya par de exploradores! ¿A qué planeta habéis viajado hoy?". Maya y Leo se miraron sonriendo: "Al planeta de la Amistad, abuela. Y no hace falta combustible, solo muchas ganas de compartir".',
        illustrationDescription: 'La abuela sonriendo en la puerta del garaje con las meriendas mientras los niños saludan desde su nave.'
      },
      {
        pageNumber: 9,
        text: 'Aquella tarde Leo aprendió que los mejores juguetes no se compran en las tiendas. Lo verdaderamente valioso es tener a alguien a tu lado dispuesto a soñar contigo, transformar una caja de cartón en un universo entero y no soltarte la mano en el camino.',
        illustrationDescription: 'Leo y Maya sonrientes y cómplices dentro de su nave de cartón bajo el rayo de sol.'
      }
    ],
    coloringSheet: {
      id: 'color-mision-dos',
      title: 'Una Misión para Dos: La Nave de Cartón',
      characterName: 'Leo y Maya',
      svgId: 'mision-dos',
      lineartImage: '/assets/colorear_mision_dos.jpg'
    }
  },
  {
    id: 'mateo-y-el-secreto-de-la-paciencia-estelar',
    title: 'Mateo y el Secreto de la Paciencia Estelar',
    author: 'Juancar Hidalgo',
    value: 'Paciencia',
    valueDescription: 'Las cosas más hermosas de la vida necesitan tiempo y calma para revelarse en todo su esplendor.',
    valueBadgeColor: 'text-amber-800',
    valueBadgeBg: 'bg-amber-100',
    valueBorderColor: 'border-amber-300',
    ageRange: '5 - 10 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'Mateo no puede esperar ni un segundo: quiere ver la lluvia de estrellas fugaces ya mismo. Su maestro Don Julián le enseñará que la noche tiene sus propios ritmos y que la paciencia es la clave para descubrir los mayores secretos del universo.',
    coverImage: '/assets/mateo-paciencia-estelar.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/384/384357_6995663-lq.mp3',
    audioDuration: '4:30 min',
    moralLesson: 'La paciencia no es sentarse a esperar sin más, sino saber guardar la calma con una sonrisa mientras las cosas maravillosas van madurando.',
    discussionQuestions: [
      '¿Por qué Mateo se sentía tan inquieto y miraba el reloj cada cinco minutos?',
      '¿Qué comparación hizo el maestro entre plantar una semilla y esperar la alineación de las estrellas?',
      '¿Recuerdas alguna ocasión en la que tuviste que ser paciente para conseguir algo muy bonito?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'La expectación en el colegio era máxima. El maestro Don Julián, con sus gafas de pasta y su eterna sonrisa afable, había organizado una velada astronómica en la azotea para observar el cometa Centella.',
        illustrationDescription: 'Don Julián ajustando con serenidad el telescopio dorado mientras los alumnos llegan a la azotea.'
      },
      {
        pageNumber: 2,
        text: 'Mateo daba saltitos de impaciencia: "¡Don Julián, déjeme mirar ya! ¿Por qué no vemos nada aún?". Don Julián sonrió con ternura y señaló hacia el horizonte: "El cielo aún tiene el tinte azul del atardecer, Mateo. Las estrellas necesitan que la oscuridad sea profunda para brillar".',
        illustrationDescription: 'Mateo mirando al cielo anaranjado impaciente mientras Don Julián le habla con calma.'
      },
      {
        pageNumber: 3,
        text: 'Para Mateo, los minutos parecían horas. Se sentaba, se levantaba, limpiaba el cristal de su linterna y volvía a preguntar: "¿Y ahora? ¿Ya es hora?". Su compañera Mei disfrutaba del fresco de la tarde dibujando constelaciones en su cuaderno.',
        illustrationDescription: 'Mei dibujando relajada en su libreta mientras Mateo camina inquieto de un lado a otro.'
      },
      {
        pageNumber: 4,
        text: 'Don Julián llamó a Mateo a su lado. De su bolsillo sacó un pequeño reloj de arena de latón: "Mira cómo cae cada granito de arena, Mateo. No puedes empujarlos más rápido sin romper el cristal. El universo funciona igual: cada planeta y cada astro tiene su momento exacto".',
        illustrationDescription: 'Don Julián mostrándole a Mateo un reloj de arena de cristal y latón dorado.'
      },
      {
        pageNumber: 5,
        text: 'Mateo tomó el reloj en sus manos. Notó el suave murmullo de la arena cayendo grano a grano. Respiró hondo y, por primera vez, dejó de mirar la esfera de su reloj digital. Decidió cerrar los ojos y escuchar la suave brisa de la noche.',
        illustrationDescription: 'Mateo cerrando los ojos con el reloj de arena, sintiendo la calma nocturna.'
      },
      {
        pageNumber: 6,
        text: 'Poco a poco, las luces del pueblo se fueron apagando y el cielo se convirtió en un manto de terciopelo negro salpicado de diminutos puntos de diamante. La Vía Láctea se dibujó ante ellos como un río de plata celestial.',
        illustrationDescription: 'El cielo nocturno transformado en una impresionante cúpula estrellada y luminosa.'
      },
      {
        pageNumber: 7,
        text: '"Ahora sí, Mateo", susurró el maestro invitándolo al ocular del telescopio. Mateo inclinó la mirada: en el centro exacto de la lente, el cometa Centella desplegaba una cola verde esmeralda y dorada que cortaba la respiración.',
        illustrationDescription: 'Mateo asomándose fascinado al ocular del gran telescopio dorado.'
      },
      {
        pageNumber: 8,
        text: 'El espectáculo era tan sobrecogedor que Mateo sintió cómo la emoción le llenaba el pecho. Comprendió que si se hubiera marchado por aburrimiento o hubiera tenido prisa, se habría perdido la mayor maravilla del año.',
        illustrationDescription: 'La cara de asombro y felicidad de Mateo reflejando la luz del cometa.'
      },
      {
        pageNumber: 9,
        text: 'Al bajar por las escaleras al final de la noche, Mateo le devolvió el reloj de arena al maestro con una sonrisa tranquila: "Don Julián, la paciencia es como una llave secreta que abre las cosas más bonitas". Don Julián asintió orgulloso: las mejores lecciones no están en los libros, sino en el tiempo.',
        illustrationDescription: 'Mateo y Don Julián compartiendo una sonrisa cómplice bajo el cielo estrellado.'
      }
    ],
    coloringSheet: {
      id: 'color-paciencia-estelar',
      title: 'Mateo y el Telescopio Estelar',
      characterName: 'Mateo y Don Julián',
      svgId: 'mateo-telescopio',
      lineartImage: '/assets/colorear_profesor_telescopio.jpg'
    }
  },
  {
    id: 'el-mapa-de-los-sentimientos',
    title: 'El Mapa de los Sentimientos',
    author: 'Juancar Hidalgo',
    value: 'Empatía',
    valueDescription: 'Aprender a ponernos en el lugar del otro y comprender sus emociones construye la verdadera amistad.',
    valueBadgeColor: 'text-sky-800',
    valueBadgeBg: 'bg-sky-100',
    valueBorderColor: 'border-sky-300',
    ageRange: '5 - 10 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'Lucas, Sofía y Tomás se unen durante el recreo para construir una nave espacial de cartón llamada "Space Explorer". Cuando Tomás se queda cabizbajo sin atreverse a decir qué siente, sus amigos descubrirán que el mapa más importante no viaja a las estrellas, sino al corazón.',
    coverImage: '/assets/el-mapa-de-los-sentimientos.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    audioDuration: '4:10 min',
    moralLesson: 'La empatía nos enseña a mirar con los ojos de los demás, escuchar con el corazón y acompañar a quien lo necesita sin juzgar.',
    discussionQuestions: [
      '¿Por qué Tomás guardó silencio cuando los demás estaban tan emocionados jugando?',
      '¿Cómo se dieron cuenta Sofía y Lucas de que su amigo necesitaba apoyo y comprensión?',
      '¿Qué puedes hacer tú cuando ves que un compañero en el recreo se siente solo o triste?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'La campana del recreo sonó y el patio del colegio se llenó de risas y carreras. Junto a la sombra del gran castaño, Lucas y Sofía abrieron dos enormes cajas de cartón que el conserje les había guardado con una sonrisa. ¡Habían planeado aquel proyecto durante toda la semana!',
        illustrationDescription: 'Lucas y Sofía descargando entusiasmados grandes cajas de cartón en el patio bajo el árbol.'
      },
      {
        pageNumber: 2,
        text: 'Con tijeras de punta redonda, cinta adhesiva y rotuladores brillantes, la nave fue cobrando vida. La bautizaron como "Space Explorer". En los laterales dibujaron estrellas, planetas con anillos y dos ventanas circulares para divisar galaxias lejanas.',
        illustrationDescription: 'Los niños decorando la nave de cartón con rotuladores y pegatinas de estrellas.'
      },
      {
        pageNumber: 3,
        text: 'Poco después se unió Tomás, llevando en sus manos un pequeño cohete de madera que había tallado con su abuelo. Pero a diferencia de otros días, Tomás no sonreía. Miraba el suelo y apenas decía palabra, sujetando su juguete con fuerza contra el pecho.',
        illustrationDescription: 'Tomás acercándose con su cohete de madera, con mirada tímida y cabizbaja.'
      },
      {
        pageNumber: 4,
        text: 'Lucas estaba tan metido en el juego de los astronautas que no se dio cuenta al principio: "¡Rápido Tomás, sube a la cabina, despegamos en tres segundos!". Pero Tomás dio un paso atrás, bajó la cabeza y se sentó en el banco de piedra, solitario.',
        illustrationDescription: 'Tomás sentado en el banco de piedra mientras Lucas lo llama desde el cohete.'
      },
      {
        pageNumber: 5,
        text: 'Sofía soltó los rotuladores y miró a Lucas: "Espera un momento, Lucas. Algo le ocurre a Tomás". Sofía se acercó despacio y se sentó a su lado, sin prisa, respetando su silencio. "¿Quieres contarnos qué te pasa, Tomás? No hace falta despegar si no te apetece hoy".',
        illustrationDescription: 'Sofía sentada afectuosamente junto a Tomás en el banco de piedra.'
      },
      {
        pageNumber: 6,
        text: 'Tomás levantó la vista con los ojos un poco brillantes. "Es que mi abuelo está en el hospital y este cohete lo hicimos juntos antes de que se pusiera malito. Pensé que jugar me animaría, pero me da miedo que no vuelva pronto a casa". Una lágrima rodó por su mejilla.',
        illustrationDescription: 'Tomás compartiendo sus sentimientos con sinceridad mientras sus amigos lo escuchan con cariño.'
      },
      {
        pageNumber: 7,
        text: 'Lucas dejó de lado el juego del cohete y se sentó al otro lado de Tomás. "Comprendo por qué estás triste, amigo. Mi abuela estuvo ingresada el año pasado y yo también sentí ese miedo tan grande en el pecho. No tienes que fingir que estás alegre si no te sientes así".',
        illustrationDescription: 'Lucas y Sofía abrazando a Tomás con ternura y comprensión verdadera.'
      },
      {
        pageNumber: 8,
        text: 'Sofía sonrió y sacó una hoja grande de papel: "Hagamos un mapa especial. En vez de un mapa de las estrellas, dibujaremos el Mapa de los Sentimientos: cuando estés triste, aquí tienes nuestro abrazo; cuando sientas miedo, te daremos la mano". Tomás secó su lágrima y, por primera vez esa mañana, dibujó una sonrisa cálida.',
        illustrationDescription: 'Los tres amigos dibujando juntos el mapa con corazones y estrellas en el suelo del patio.'
      },
      {
        pageNumber: 9,
        text: 'Juntos pegaron un gran corazón dibujado en el centro del panel de mandos del "Space Explorer". Entendieron que ser empático no es cambiar cómo se siente la otra persona a la fuerza, sino acompañarla con el corazón abierto en cualquier rincón del universo.',
        illustrationDescription: 'Los tres amigos sonrientes junto al cohete de cartón con el corazón en el centro bajo el sol del recreo.'
      }
    ],
    coloringSheet: {
      id: 'color-mapa-sentimientos',
      title: 'El Mapa de los Sentimientos y el Cohete',
      characterName: 'Amigos y el Cohete',
      svgId: 'mapa-sentimientos',
      lineartImage: '/assets/colorear_cohete_patio.jpg'
    }
  },
  {
    id: 'el-destello-del-corazon-valiente',
    title: 'El Destello del Corazón Valiente',
    author: 'Juancar Hidalgo',
    value: 'Valentía',
    valueDescription: 'El valor no es la ausencia de miedo, sino hacer lo correcto para ayudar a los demás a pesar de él.',
    valueBadgeColor: 'text-rose-800',
    valueBadgeBg: 'bg-rose-100',
    valueBorderColor: 'border-rose-300',
    ageRange: '5 - 10 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'Valerio se sentía el chico más temeroso del pueblo de Brumaluna. Cuando su amiga Elara le propone buscar el legendario Cristal de los Ecos, descubrirá que dentro de su corazón late una valentía inquebrantable guiada por la compasión.',
    coverImage: '/assets/destello-corazon-valiente.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/416/416632_5121236-lq.mp3',
    audioDuration: '4:15 min',
    moralLesson: 'El valor no consiste en no tener miedo, sino en hacer lo correcto y vencer nuestros propios temores para ayudar a otro.',
    discussionQuestions: [
      '¿Por qué Valerio pensaba que nunca pondrían su nombre en el Muro de los Héroes?',
      '¿Qué significan las palabras que le dijo Elara en el puente: "El miedo es solo una nube y tú eres el sol"?',
      '¿Qué hizo que Valerio se olvidara del miedo al ver al ciervo blanco atrapado?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'En el pueblo de Brumaluna, todos los jóvenes debían realizar una "Hazaña" para ser considerados adultos. Valerio, sin embargo, se sentía el chico más miedoso del mundo. Mientras los demás escalaban muros o domaban caballos salvajes, él prefería quedarse en la biblioteca, lejos de cualquier peligro. Se pasaba las tardes mirando el Gran Muro de los Héroes, suspirando porque creía que su nombre nunca estaría allí.',
        illustrationDescription: 'Valerio sentado en un banco frente al Gran Muro de los Héroes, suspirando con nostalgia.'
      },
      {
        pageNumber: 2,
        text: 'Un día, su mejor amiga Elara llegó corriendo con un pergamino antiguo. "¡Valerio, he encontrado el mapa del Cristal de los Ecos!", exclamó emocionada. Se decía que aquel cristal solo brillaba cuando era sostenido por alguien con un valor incalculable. Elara convenció a Valerio de que esta era su oportunidad para demostrarse a sí mismo que no era un cobarde.',
        illustrationDescription: 'Elara mostrándole el mapa del pergamino a Valerio en el camino de tierra.'
      },
      {
        pageNumber: 3,
        text: 'El viaje comenzó en el Desfiladero de las Sombras. Para cruzarlo, debían pasar por un puente de cuerdas que crujía con cada ráfaga de viento. Valerio se detuvo en seco, con las piernas temblándole como si fueran de gelatina. El abismo bajo sus pies parecía una boca gigante dispuesta a devorarlo.',
        illustrationDescription: 'Valerio temblando sobre los primeros tablones del puente colgante entre los riscos.'
      },
      {
        pageNumber: 4,
        text: 'Elara ya estaba a mitad de camino, moviéndose con la agilidad de un gato. Al ver que su amigo no avanzaba, se giró y le tendió la mano. "No mires hacia abajo, Valerio", le dijo con voz firme pero dulce. "Mira hacia adelante, mírame a mí. El miedo es solo una nube, y tú eres el sol que puede atravesarla".',
        illustrationDescription: 'Elara tendiéndole la mano a Valerio con una sonrisa cálida y alentadora.'
      },
      {
        pageNumber: 5,
        text: 'Con el corazón martilleando contra sus costillas, Valerio dio el primer paso, luego el segundo. Cuando una ráfaga de viento hizo oscilar el puente, cerró los ojos y recordó las palabras de Elara. Al abrirlos, vio que ella lo esperaba al otro lado. Al llegar a tierra firme, Valerio no podía creer que lo hubiera logrado; el miedo seguía ahí, pero él se había movido de todos modos.',
        illustrationDescription: 'Valerio de rodillas aliviado al otro lado del desfiladero mientras Elara le da ánimos.'
      },
      {
        pageNumber: 6,
        text: 'Al caer la noche, entraron en el Bosque de los Susurros. Los árboles tenían formas retorcidas y los ruidos de los animales nocturnos sonaban como monstruos acechando entre la maleza. Valerio sentía que mil ojos lo observaban. De repente, algo grande se movió entre los arbustos con un estruendo metálico.',
        illustrationDescription: 'Valerio caminando con su farolillo de luz cálida entre los troncos oscuros del bosque.'
      },
      {
        pageNumber: 7,
        text: 'Elara se adelantó para investigar el ruido, pero Valerio la detuvo. Por primera vez, fue él quien dio un paso al frente para proteger a su amiga. Al apartar las ramas, no encontraron a un monstruo, sino a un gran ciervo blanco cuya pata estaba atrapada en una trampa de metal oxidada. El pobre animal estaba agotado de tanto luchar.',
        illustrationDescription: 'Valerio y Elara descubriendo al hermoso ciervo blanco con la cornamenta majestuosa.'
      },
      {
        pageNumber: 8,
        text: 'El ciervo, asustado, intentaba dar cabezazos a cualquiera que se acercara. Valerio sintió miedo de ser golpeado, pero la compasión fue más fuerte. Se acercó lentamente, hablándole en voz baja y tranquila. "Tranquilo, amigo, solo queremos ayudarte", susurró. Con mucho cuidado y usando una rama como palanca, Valerio comenzó a presionar el mecanismo de la trampa.',
        illustrationDescription: 'Valerio arrodillado con paciencia liberando la pata del ciervo con la rama.'
      },
      {
        pageNumber: 9,
        text: 'Al tocar las manos de Valerio, el cristal estalló en una luz azulada tan brillante que iluminó todo el bosque. Valerio se dio cuenta de que el valor no era no tener miedo, sino hacer lo correcto a pesar de él. Al regresar al pueblo, su nombre fue grabado en el muro, no por vencer a un enemigo, sino por vencer sus propios temores para ayudar a otro.',
        illustrationDescription: 'El cristal resplandeciendo en un destello azul en las manos de Valerio mientras Elara sonríe feliz.'
      }
    ],
    coloringSheet: {
      id: 'color-ciervo-valiente',
      title: 'El Destello del Corazón Valiente y el Cristal',
      characterName: 'Valerio y Elara',
      svgId: 'ciervo-valiente',
      lineartImage: '/assets/colorear_corazon_valiente.jpg'
    }
  },
  {
    id: 'la-luz-de-nazaret',
    title: 'La Luz de Nazaret',
    author: 'Juancar Hidalgo',
    value: 'Generosidad',
    valueDescription: 'El amor y la bondad son los regalos más grandes: dar con el corazón alegra la vida de todos.',
    valueBadgeColor: 'text-amber-800',
    valueBadgeBg: 'bg-amber-100',
    valueBorderColor: 'border-amber-300',
    ageRange: '4 - 10 años',
    readingTime: '6 min de lectura',
    bookType: 'colorear',
    summary: 'Un entrañable libro ilustrado en blanco y negro para leer y colorear. Recorre la historia y enseñanzas de Jesús de Nazaret: la estrella de Belén, el compartir los panes y peces, y cómo cada pequeño gesto de bondad ilumina el mundo.',
    coverImage: '/assets/la-luz-de-nazaret.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/384/384357_6995663-lq.mp3',
    audioDuration: '5:30 min',
    moralLesson: 'Todos podemos ser luz para los demás a través de nuestras pequeñas y grandes acciones de amor y generosidad.',
    discussionQuestions: [
      '¿Qué regalo trajo el niño pequeño que no dudó en compartir con todos?',
      '¿Por qué decía Jesús que lo más valioso no es lo que tienes, sino lo que das?',
      '¿Cómo puedes tú ser "luz" para un compañero o amigo hoy?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'Hace mucho tiempo, bajo un cielo de color azul profundo salpicado de estrellas, María y José emprendieron un largo viaje hacia un pequeño pueblo llamado Belén. Aunque el camino era pedregoso y el aire fresco, sus corazones estaban llenos de una alegría muy especial porque pronto recibirían un regalo del cielo.',
        illustrationDescription: 'María sobre el burrito y José caminando bajo las estrellas hacia Belén.'
      },
      {
        pageNumber: 2,
        text: 'Al llegar a Belén, no encontraron lugar en ninguna posada, así que se refugiaron en un cálido establo lleno de paja suave. Esa noche, bajo el brillo de una gran estrella, nació el bebé Jesús. María lo envolvió en mantas suaves para que estuviera muy cómodo y seguro.',
        illustrationDescription: 'María con el niño Jesús en brazos en el establo iluminado.'
      },
      {
        pageNumber: 3,
        text: 'En los campos cercanos, unos pastores cuidaban de sus ovejas cuando una luz brillante iluminó el cielo. Llenos de asombro, corrieron hacia el establo para dar la bienvenida al nuevo niño. José los recibió en la puerta con una sonrisa tranquila y acogedora.',
        illustrationDescription: 'Los pastores llegando con un corderito para dar la bienvenida al bebé.'
      },
      {
        pageNumber: 4,
        text: 'Desde tierras muy lejanas, unos sabios llamados Reyes Magos también llegaron a visitar a Jesús. Siguieron una estrella muy brillante que los guió hasta el pequeño niño. Al verlo, se arrodillaron y le ofrecieron cofres llenos de tesoros como oro, incienso y mirra.',
        illustrationDescription: 'Los Reyes Magos ofreciendo sus cofres de tesoros con respeto y alegría.'
      },
      {
        pageNumber: 5,
        text: 'Jesús creció en un pueblo rodeado de colinas llamado Nazaret. Era un niño curioso y bondadoso que siempre quería ayudar. Pasaba muchas tardes en el taller de carpintería, aprendiendo de José cómo transformar la madera en objetos útiles y hermosos para sus vecinos.',
        illustrationDescription: 'José trabajando la madera en el taller de carpintería con el joven Jesús a su lado.'
      },
      {
        pageNumber: 6,
        text: 'Cuando Jesús cumplió doce años, viajó con su familia a la gran ciudad de Jerusalén. Allí, en un templo inmenso, se sentó a conversar con los hombres más sabios. María lo encontró después de buscarlo mucho tiempo, sorprendida de lo bien que él explicaba las cosas del corazón.',
        illustrationDescription: 'María encontrando a Jesús conversando con serenidad en el templo.'
      },
      {
        pageNumber: 7,
        text: 'Al hacerse adulto, Jesús decidió comenzar una misión muy importante. Fue al río Jordán para encontrarse con Juan, un hombre que vivía en el desierto. Juan sumergió a Jesús en el agua fresca del río para mostrar a todos que una nueva vida de amor estaba comenzando.',
        illustrationDescription: 'Jesús y Juan en las aguas tranquilas del río Jordán.'
      },
      {
        pageNumber: 8,
        text: 'Jesús sabía que para llevar su mensaje de paz necesitaba amigos. Un día, a la orilla del mar de Galilea, llamó a dos pescadores, Pedro y Andrés. Ellos dejaron sus redes y sus barcas para seguirlo, emocionados por la aventura de ayudar a los demás.',
        illustrationDescription: 'Pedro y Andrés con sus redes de pesca junto a la barca escuchando a Jesús.'
      },
      {
        pageNumber: 9,
        text: 'Jesús comenzó a viajar por todas partes contando historias maravillosas sobre el amor. Un joven llamado Silas era uno de sus seguidores más entusiastas y nunca se cansaba de escuchar sus palabras. Silas aprendió que lo más valioso no es lo que tienes, sino lo que das.',
        illustrationDescription: 'Jesús descansando bajo un gran árbol frondoso conversando con Silas.'
      },
      {
        pageNumber: 10,
        text: 'Un día, miles de personas tenían hambre y no había suficiente comida para todos. Un niño pequeño se acercó tímidamente a Jesús y le ofreció lo único que tenía: cinco panes pequeños y dos peces. Jesús aceptó el regalo con mucha gratitud y lo compartió con todos hasta que nadie tuvo hambre.',
        illustrationDescription: 'El niño entregando la cesta de panes y peces a Jesús con timidez y bondad.'
      },
      {
        pageNumber: 11,
        text: 'Jesús siempre buscaba ayudar a quienes más lo necesitaban. Un día conoció a Zaki, un hombre que no podía ver las flores ni el sol. Con mucha ternura, Jesús puso sus manos sobre los ojos de Zaki y, de repente, el mundo se llenó de colores brillantes para él.',
        illustrationDescription: 'Jesús poniendo sus manos con dulzura sobre los ojos de Zaki en la calle de piedra.'
      },
      {
        pageNumber: 12,
        text: 'Incluso cuando el viento soplaba con fuerza, Jesús mantenía la calma. Durante una gran tormenta en un barco, su amigo Pedro tuvo mucho miedo de las olas gigantes. Pero Jesús se puso de pie y, con mucha tranquilidad, pidió al mar que se calmara, y el agua se volvió un espejo.',
        illustrationDescription: 'Jesús de pie en la barca calmando las olas del mar embravecido.'
      },
      {
        pageNumber: 13,
        text: 'A Jesús le gustaba enseñar usando parábolas, que eran cuentos sencillos. Contó la historia de un pastor que tenía cien ovejas y perdió una. El pastor no se detuvo hasta encontrarla, porque cada una era importante para él, igual que cada persona es importante para Dios.',
        illustrationDescription: 'El buen pastor cargando sobre sus hombros con cariño a la ovejita rescatada.'
      },
      {
        pageNumber: 14,
        text: 'Jesús siempre tenía tiempo para los más pequeños, aunque estuviera muy cansado. La pequeña Elena disfrutaba mucho de su compañía y le gustaba llevarle flores silvestres del campo solo para ver su sonrisa. Jesús decía que los niños eran los que mejor entendían el amor.',
        illustrationDescription: 'La pequeña Elena ofreciendo una flor silvestre a Jesús arrodillado con una sonrisa.'
      },
      {
        pageNumber: 15,
        text: 'Jesús le enseñó a Silas que debemos ser buenos incluso con las personas que no conocemos. Contó la historia del Buen Samaritano, quien ayudó a un extraño que estaba herido en el camino, recordándonos que todos somos hermanos y debemos cuidarnos unos a otros.',
        illustrationDescription: 'Jesús caminando junto a Silas compartiendo la enseñanza del buen samaritano.'
      },
      {
        pageNumber: 16,
        text: 'Cerca de un estanque, Jesús vio a Tadeo, un hombre que no podía caminar y llevaba mucho tiempo esperando ayuda. Jesús lo miró con amor y le dijo que se levantara. Para sorpresa de todos, Tadeo se puso de pie y comenzó a saltar de alegría por primera vez.',
        illustrationDescription: 'Tadeo levantando los brazos hacia el cielo lleno de júbilo tras poder caminar.'
      },
      {
        pageNumber: 17,
        text: 'Un día, Jesús decidió entrar en la gran ciudad de Jerusalén. Lo hizo montado en un burrito humilde. La gente estaba tan feliz de verlo que cubrieron el camino con palmas y alfombras de colores, gritando palabras de bienvenida como si fuera un rey de paz.',
        illustrationDescription: 'Jesús entrando en Jerusalén sobre el burrito mientras la gente agita ramas de palma.'
      },
      {
        pageNumber: 18,
        text: 'Antes de despedirse de sus amigos, Jesús se reunió con ellos para una cena muy especial. Compartió el pan con Pedro y los demás, pidiéndoles que siempre se amaran unos a otros como él los había amado. Fue una noche de mucha unión y cariño.',
        illustrationDescription: 'La mesa de la última cena compartiendo el pan con fraternidad.'
      },
      {
        pageNumber: 19,
        text: 'La historia de Jesús nos enseña que todos podemos ser luz para los demás a través de nuestras pequeñas y grandes acciones. Su mensaje de esperanza sigue brillando hoy en cada gesto de cariño, recordándonos que el amor es el regalo más grande y eterno de todos.',
        illustrationDescription: 'Jesús de espaldas contemplando el horizonte soleado con los brazos abiertos extendiendo bendición y paz.'
      }
    ],
    coloringSheet: {
      id: 'color-luz-nazaret',
      title: 'La Luz de Nazaret (Para Colorear)',
      characterName: 'Jesús de Nazaret',
      svgId: 'luz-nazaret',
      lineartImage: '/assets/colorear_luz_nazaret.jpg'
    }
  },
  {
    id: 'una-mision-para-todos',
    title: 'Una Misión para Todos',
    author: 'Juancar Hidalgo',
    value: 'Generosidad',
    valueDescription: 'La generosidad no solo consiste en compartir cosas materiales: también es abrir el juego, incluir a los demás y compartir nuestros sueños para que nadie se quede solo.',
    valueBadgeColor: 'text-emerald-800',
    valueBadgeBg: 'bg-emerald-100',
    valueBorderColor: 'border-emerald-300',
    ageRange: '4 - 9 años',
    readingTime: '5 min de lectura',
    bookType: 'cuento',
    summary: 'Leo y Maya están listos para surcar las estrellas en su nave de cartón cuando descubren que Oliver los observa desde lejos con timidez. Con generosidad de corazón, deciden que la mejor aventura espacial no es para dos, sino para todos.',
    coverImage: '/assets/una-mision-para-todos.jpg',
    pdfUrl: '',
    coloringPdfUrl: '',
    audioUrl: 'https://cdn.freesound.org/previews/268/268822_4486188-lq.mp3',
    audioDuration: '4:15 min',
    moralLesson: 'Ser generoso es tener un corazón ancho donde siempre quepa un amigo más. Cuando compartes tus juegos y tu alegría, la diversión se multiplica hasta el infinito.',
    discussionQuestions: [
      '¿Cómo se sentía Oliver mirando a Leo y Maya jugar desde la valla del jardín?',
      '¿Qué hicieron Leo y Maya cuando se dieron cuenta de que Oliver estaba solo?',
      '¿Alguna vez has invitado a un niño o niña que estaba jugando solo en el recreo? ¿Cómo te sentiste?'
    ],
    pages: [
      {
        pageNumber: 1,
        text: 'Era una tarde luminosa en el jardín de la casa de campo. Leo y Maya habían construido con cajas de cartón, cinta naranja y cascos de escurridor una auténtica nave espacial de dos plazas lista para despegar.',
        illustrationDescription: 'Leo y Maya ajustándose los cascos de escurridor junto a la nave de cartón biplaza.'
      },
      {
        pageNumber: 2,
        text: 'Entre risas y cuentas atrás —"¡Tres, dos, uno, despegue!"—, la nave comenzó su viaje imaginario hacia las nebulosas de colores que el cielo del atardecer prometía. Todo parecía perfecto.',
        illustrationDescription: 'Los dos niños jugando ilusionados con la nave de cartón en el césped soleado.'
      },
      {
        pageNumber: 3,
        text: 'Pero a pocos metros, apoyado tímidamente contra la valla del jardín, Oliver miraba con ojos asombrados. Tenía en sus manos un pequeño avión de cartón que había intentado armar él solo, pero no se atrevía a decir nada.',
        illustrationDescription: 'Oliver mirando con timidez desde la valla con su pequeño avión de juguete.'
      },
      {
        pageNumber: 4,
        text: 'Maya fue la primera en notarlo. Detuvo la nave y le susurró a Leo: "Mira a Oliver, Leo. Está solo y también sueña con las estrellas. ¿Y si lo invitamos a nuestra flota?".',
        illustrationDescription: 'Maya señalando a Oliver con ternura y conversando con Leo.'
      },
      {
        pageNumber: 5,
        text: 'Leo miró su nave biplaza. Al principio pensó: "¡Pero si la hemos construido para nosotros dos!". Pero al ver la mirada ilusionada y tímida de Oliver, sintió una calidez especial en el pecho: la generosidad de no guardarse la diversión solo para sí.',
        illustrationDescription: 'Leo sonriendo con empatía al comprender cómo se siente su vecino.'
      },
      {
        pageNumber: 6,
        text: 'Leo se puso de pie en la cabina y agitó las manos: "¡Atención, nave exploradora! ¡Aquí la base espacial Alfa! ¡Comandante Oliver, necesitamos un caza de escolta urgente para cruzar el cinturón de asteroides!".',
        illustrationDescription: 'Leo y Maya saludando efusivamente a Oliver invitándolo a unirse a la misión.'
      },
      {
        pageNumber: 7,
        text: 'La cara de Oliver se iluminó como si le hubieran encendido un faro por dentro. Corrió hacia ellos, y entre los tres reforzaron su caza con cinta americana y le pusieron un brillante casco de astronauta.',
        illustrationDescription: 'Los tres niños ayudándose unos a otros a equipar sus naves con cinta adhesiva y cascos.'
      },
      {
        pageNumber: 8,
        text: 'Ahora surcaban el universo juntos: la nave principal abría camino entre estrellas titilantes mientras el caza de Oliver cuidaba las espaldas de la tripulación. Los tres reían al unísono con el viento en la cara.',
        illustrationDescription: 'Los tres amigos navegando por el jardín bajo el cielo estrellado imaginario, felices y unidos.'
      },
      {
        pageNumber: 9,
        text: 'Al caer la noche, sentados en la hierba compartiendo galletas, Leo miró a sus dos compañeros y sonrió: comprendió que la generosidad no te quita sitio, sino que ensancha el espacio para que la alegría nunca se acabe.',
        illustrationDescription: 'Los tres niños descansando sobre la hierba mirando las estrellas reales con una sonrisa cómplice.'
      }
    ],
    coloringSheet: {
      id: 'color-mision-todos',
      title: 'Una Misión para Todos (Para Colorear)',
      characterName: 'Leo, Maya y Oliver',
      svgId: 'mision-dos',
      lineartImage: '/assets/colorear_mision_todos.jpg'
    }
  }
];
