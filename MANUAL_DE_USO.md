# 📖 Manual de Usuario y Guía de la Plataforma
## Proyecto: Cuentos con Valores (Audiocuentos y Láminas Infantiles)

---

¡Te damos la bienvenida a la guía oficial de **Cuentos con Valores**! Este documento y manual interactivo explica de manera clara y accesible todas las herramientas disponibles en la plataforma para familias, educadores, colegios y primeros lectores. Puedes consultar este manual siempre que quieras desde el botón **"Manual"** en la barra superior de la web.

---

## 🌟 1. ¿Qué es y qué incluye la plataforma?

**Cuentos con Valores** es un espacio digital educativo, cultural y familiar pensado para cultivar virtudes humanas en la infancia a través de tres pilares:
1. **Lectura interactiva y narración en voz:** Cuentos organizados por valores (Honestidad, Valentía, Empatía, Generosidad, Paciencia, Cooperación, Amistad).
2. **Taller de dibujo y láminas:** Colorear directamente online o descargar en PDF para imprimir en papel.
3. **Oraciones infantiles:** Textos, audios y recordatorios para momentos de paz en familia.

---

## 📖 2. El Lector de Cuentos Interactivo

Cada cuento en el catálogo cuenta con una ficha completa:
- **Botón "Leer Cuento":** Abre un visor a pantalla completa con letra grande adaptada a niños y primeros lectores.
- **Navegación:**
  - Botones *"Página Anterior"* y *"Página Siguiente"*, o mediante las flechas del teclado.
  - Barra de progreso que indica el porcentaje de lectura.
- **Enseñanza y Preguntas:** Al llegar a la última página, se muestra la **Moraleja** y **3 preguntas guiadas** para conversar padres/madres e hijos sobre la lección del cuento.
- **Audiocuento:** Reproductor de sonido integrado con Play/Pausa, barra de tiempo y volumen para escuchar la historia con música suave de fondo.

---

## 🎨 3. El Taller de Dibujo y Láminas para Colorear

Al pulsar **"Pintar Lámina"** en cualquier cuento, se abre el taller creativo:

### A) El Relleno Mágico (Cubo de Pintura por Clic)
- **¿Cómo se usa?** Elige cualquier color de la paleta y **haz un clic con el ratón (o pulsa con el dedo en pantalla táctil)** sobre el área del personaje o fondo que quieras pintar.
- **¿Cómo funciona?** El sistema detecta los bordes negros del dibujo oficial y rellena exactamente esa silueta sin salirse de la línea.

### B) Pincel Libre
- Para dibujar trazos manuales, detalles finos, firmas o decoraciones.
- Dispone de un control deslizante para ajustar el grosor del trazo.

### C) Herramientas de apoyo
- **Borrador:** Pinta de blanco para limpiar trazos.
- **Deshacer:** Permite revertir la última acción realizada.
- **Limpiar:** Restablece la lámina en blanco.

### D) Guardar o Imprimir
- **Botón verde "Guardar Mi Dibujo":** Descarga un archivo de imagen PNG en alta definición combinando la lámina oficial con todos tus colores.
- **Botón "Descargar Lámina (PDF)":** Prepara la lámina en blanco y negro en tamaño estándar A4 lista para imprimir en cualquier impresora y colorear con lápices o ceras.

---

## 📁 4. Cómo añadir tus Cuentos y Archivos desde Google Drive

Para mantener la web rápida, bonita y sin costes de servidores pesados, la mejor estrategia es alojar tus archivos PDF en **Google Drive** y enlazarlos:

### Paso 1: Subir a Google Drive
1. Ve a [drive.google.com](https://drive.google.com/drive/) con tu cuenta de Gmail.
2. Crea una carpeta (ej: `Mis Cuentos Web`) y sube tus archivos PDF (el libro completo o las láminas para colorear).
3. Haz clic derecho sobre el archivo > **Compartir** > **Compartir**.
4. En **Acceso general**, cambia de *"Restringido"* a **"Cualquier persona con el enlace"** (como Lector).
5. Haz clic en **"Copiar enlace"**.

### Paso 2: Conectarlo en la Web
Cuando me pases el enlace aquí en el chat, solo tienes que decirme:
> *"Añade este nuevo cuento: Título: X, Valor: Y, y este es el enlace de Drive: [pegar enlace]"*

Yo lo integraré de inmediato. O si te gusta editar el código en `/src/data/stories.ts`, la ficha tiene esta estructura:
```typescript
{
  id: 'mi-nuevo-cuento',
  title: 'El Nombre de Tu Cuento',
  author: 'Juancar Hidalgo',
  value: 'Generosidad',
  summary: 'Breve resumen de 2 líneas...',
  coverImage: '/assets/mi-portada.jpg',
  pdfUrl: 'https://drive.google.com/file/d/TU_ID_AQUI/view', // <-- Enlace de Drive
  coloringPdfUrl: 'https://drive.google.com/file/d/TU_ID_LAMINA/view',
}
```

---

## 🕊️ 5. Sección de Oraciones Infantiles

Ubicada en la navegación o bajando en la página:
- Incluye 4 oraciones:
  1. **Ángel de mi Guarda** (Protección y confianza).
  2. **Jesús, Amigo Bueno** (Bondad y generosidad).
  3. **Gracias por este Hermoso Día** (Agradecimiento diario).
  4. **Paz para el Mundo y la Familia** (Paz en el hogar y en la Tierra).
- Cada oración cuenta con su propio reproductor de audio relajante y un botón para **imprimir en ficha de mesilla**.

---

## 🔍 6. Buscador y Filtros

- **Buscador en tiempo real:** Escribe en la barra superior cualquier palabra (ej. *"telescopio"*, *"luz"*, *"corazón"*, *"honestidad"*) para encontrar cuentos al instante.
- **Píldoras de Virtudes:** En la cabecera puedes pulsar directamente sobre *Honestidad*, *Valentía*, *Empatía*, *Generosidad*, *Paciencia*, *Cooperación* o *Amistad* para filtrar el catálogo.

---

## 💡 7. Preguntas Frecuentes y Consejos

- **¿Funciona en móviles y tabletas?** Sí, el diseño es 100% responsivo. El taller de dibujo responde tanto a pulsaciones táctiles como al ratón.
- **¿Hay que pagar o registrarse?** No. Todo el material es de libre acceso familiar y educativo.
- **¿Dónde está este manual en la pantalla?** Puedes abrirlo en cualquier momento haciendo clic en el botón **"Manual"** de la barra de navegación superior (junto a *"Subir Cuentos"*), o en el pie de página.
