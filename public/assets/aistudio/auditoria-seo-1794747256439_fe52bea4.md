# Informe de Auditoría Web y SEO — https://www.cuentosyvalores.es/
Fecha: 15/11/2026, 13:53:06
Puntuación Global: 28/100
Negocio detectado: Portal educativo de cuentos infantiles ilustrados con valores y actividades didácticas para familias y colegios
Intención de búsqueda: Informacional y educativa (con intención de descarga/lectura gratuita): madres, padres y docentes buscan cuentos infantiles ilustrados y actividades prácticas para enseñar valores como empatía, respeto o amistad.

## Resumen Ejecutivo
Aunque la web responde rápido por HTTPS (454 ms) y cuenta con un título (60 caracteres) y metadescripción (138 caracteres) bien enfocados, opera como una aplicación SPA renderizada exclusivamente en el cliente que devuelve un HTML inicial vacío (1,7 KB, 0 palabras, 0 encabezados H1-H6 y 0 enlaces). Además, carece de etiqueta canonical, robots.txt, sitemap.xml, Open Graph y datos estructurados JSON-LD, lo que limita gravemente su indexación en Google y su compartición en redes sociales.

## Puntuación por Pilares
- SEO Técnico: 38/100
- Contenido y Semántica: 15/100
- UX y Rendimiento: 45/100
- Social y Datos Estructurados: 0/100

## Propuesta SERP en Google
- Title (56 chars): Cuentos con valores para niños | Ilustrados y educativos
- Meta Description (147 chars): Lee cuentos infantiles ilustrados con valores y descarga actividades educativas para niños. Recursos ideales para familias y colegios. ¡Explóralos!
- Slug recomendado: /cuentos-infantiles-con-valores

## Mejoras Priorizadas
### 1. [Crítico] Implementar pre-renderizado estático (SSG) o SSR en la SPA (SEO Técnico)
- Evidencia: El analizador detecta isLikelyClientRenderedSpa: true, htmlSizeKb: 1.7, bodyTextExcerpt vacío, wordCount: 0 y links.total: 0 en el HTML servido por el servidor.
- Por qué importa: Los buscadores que no ejecutan JavaScript de inmediato o tienen presupuesto de rastreo limitado ven una página completamente en blanco, impidiendo que la web posicione por sus cuentos y palabras clave.
- Cómo solucionarlo: Configura SSG (por ejemplo con vite-ssg o prerendering en compilación) o migra a un framework con SSR para que https://www.cuentosyvalores.es/ entregue desde el servidor el texto visible, las imágenes y los enlaces internos en el HTML inicial.

### 2. [Crítico] Añadir un encabezado H1 único y jerarquía H2/H3 (SEO Técnico)
- Evidencia: headingCounts muestra h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 y el array headings está vacío.
- Por qué importa: Sin un H1 ni subtítulos H2/H3, Google no identifica la temática principal del documento y los usuarios que escanean la página no comprenden de un vistazo qué ofrece la web.
- Cómo solucionarlo: Incluye un único <h1> en el bloque principal visible desde el HTML inicial (por ejemplo, 'Cuentos infantiles con valores, ilustraciones y actividades educativas') y estructura las secciones de catálogo, edades y beneficios con etiquetas <h2> y <h3>.

### 3. [Alto] Crear robots.txt, sitemap.xml y etiqueta canonical (SEO Técnico)
- Evidencia: hasRobotsTxt: false, hasSitemapXml: false y canonical: null en la respuesta de https://www.cuentosyvalores.es/.
- Por qué importa: Sin canonical se corre riesgo de contenido duplicado entre versiones con o sin www/parámetros; sin robots.txt ni sitemap.xml, los rastreadores tardan más en descubrir nuevos cuentos y secciones.
- Cómo solucionarlo: Añade <link rel="canonical" href="https://www.cuentosyvalores.es/"> en el <head>, sube un archivo robots.txt en la raíz y genera un sitemap.xml dinámico con la home y cada ficha de cuento.

### 4. [Alto] Configurar metadatos Open Graph, Twitter Cards y JSON-LD (SEO Técnico)
- Evidencia: Todos los campos de openGraph y twitter devuelven null y structuredData.count es 0.
- Por qué importa: Al compartir enlaces en WhatsApp, redes educativas o Pinterest se mostrarán sin imagen ni vista previa atractiva, y Google no recibirá contexto estructurado sobre el sitio educativo y sus relatos.
- Cómo solucionarlo: Inserta las metaetiquetas og:title, og:description, og:image, og:url, og:type y twitter:card en <head>, junto con un bloque JSON-LD Schema.org de tipo WebSite y EducationalOrganization.

### 5. [Alto] Estructurar el DOM con hitos semánticos HTML5 (Accesibilidad)
- Evidencia: landmarks registra header: false, nav: false, main: false, footer: false y article: false.
- Por qué importa: Lectores de pantalla y tecnologías de asistencia dependen de etiquetas semánticas para navegar entre el menú, el contenido del cuento y el pie de página; además ayudan a los motores de búsqueda a distinguir el contenido principal.
- Cómo solucionarlo: Envuelve la cabecera en <header>, el menú de categorías de valores en <nav>, el contenido central en <main>, cada cuento o tarjeta destacada en <article> y la información legal/contacto en <footer>.

### 6. [Alto] Incorporar texto editorial visible, imágenes con ALT y limpiar meta keywords (Contenido y Copy)
- Evidencia: wordCount: 0, images.total: 0 en el DOM inicial y presencia de <meta name="keywords" content="cuentos infantiles con valores, ..."> en headHtmlExcerpt.
- Por qué importa: Google ignora la etiqueta meta keywords desde hace años y necesita texto real, descripciones de cuentos e ilustraciones con atributos alt descriptivos (que además posicionan en Google Imágenes) para evaluar la calidad de la página.
- Cómo solucionarlo: Elimina la etiqueta <meta name="keywords">, redacta al menos 400-600 palabras introductorias sobre la metodología por valores y edades, y añade ilustraciones optimizadas (WebP) con atributos alt descriptivos y width/height explícitos.

### 7. [Medio] Optimizar la carga de JavaScript, fuentes y Google Tag Manager (Rendimiento)
- Evidencia: El sitio carga GTM (GTM-WHX8CHDN), Google Fonts (Fredoka), /assets/index-yzC2UKH9.js y /assets/index-O4vhU1AJ.css antes de pintar contenido; aunque responseTimeMs es 454 ms, el usuario ve pantalla en blanco hasta ejecutar el bundle.
- Por qué importa: Si el script principal /assets/index-yzC2UKH9.js crece o la conexión móvil es lenta, el First Contentful Paint (FCP) y el Largest Contentful Paint (LCP) empeorarán, aumentando la tasa de rebote.
- Cómo solucionarlo: Combina el pre-renderizado del HTML con carga diferida de scripts no críticos, aplica división de código (code splitting) por rutas de cuentos y retrasa la inicialización de GTM tras la interacción o carga inicial.

### 8. [Medio] Añadir arquitectura de enlaces internos rastreables y CTA visible (UX y Conversión)
- Evidencia: links.total: 0 y links.internal: 0 en el HTML extraído de la página principal.
- Por qué importa: Sin enlaces <a href> reales hacia categorías de valores, rangos de edad o cuentos concretos, ni familias ni buscadores pueden navegar de forma directa desde la portada.
- Cómo solucionarlo: Asegura que todos los botones y tarjetas de cuentos utilicen etiquetas <a href="/..."> nativas (en lugar de eventos onClick en <div>) y coloca sobre el pliegue un botón CTA claro como 'Explorar cuentos por valor'.

## Estrategia SEO
- Palabra clave principal: cuentos infantiles con valores
- Secundarias: cuentos educativos para niños, cuentos con dibujos y valores, cuentos cortos con moraleja, actividades educativas infantiles, educar en valores con cuentos
- Long-tail: cuentos infantiles ilustrados con valores para leer en familia, cuentos cortos con valores y actividades para primaria, cuentos para trabajar la empatía y el respeto en niños, cuentos infantiles con dibujos para imprimir o leer en clase, recursos educativos de cuentos con valores para colegios

### Jerarquía de Encabezados Recomendada
- **H1**: Cuentos infantiles con valores, ilustraciones y actividades educativas — *Responder de inmediato a la intención principal y posicionar la palabra clave objetivo.*
- **H2**: Explora nuestros cuentos según el valor que quieras enseñar — *Facilitar la navegación por valores (empatía, respeto, amistad, honestidad, generosidad) y distribuir enlazado interno.*
- **H3**: Cuentos sobre empatía, respeto y convivencia — *Captar búsquedas específicas de padres y docentes sobre habilidades socioemocionales.*
- **H3**: Cuentos sobre esfuerzo, valentía y autoestima — *Ampliar la cobertura semántica hacia otros valores clave en etapa infantil y primaria.*
- **H2**: Cuentos ilustrados por edades y actividades para familias y colegios — *Diferenciar niveles lectores (3-5 años, 6-8 años, 9-12 años) y destacar las fichas didácticas.*
- **H2**: Por qué educar con cuentos ilustrados y cómo usar nuestras guías — *Aportar contenido editorial rico que refuerce la autoridad temática y la utilidad práctica.*
- **H2**: Preguntas frecuentes sobre Cuentos y Valores — *Resolver dudas sobre uso en el aula, descarga gratuita, edades recomendadas y derechos de uso.*

## Código <head> Recomendado
```html
<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Cuentos con valores para niños | Ilustrados y educativos</title> <meta name="description" content="Lee cuentos infantiles ilustrados con valores y descarga actividades educativas para niños. Recursos ideales para familias y colegios. ¡Explóralos!"> <meta name="robots" content="index, follow"> <link rel="canonical" href="https://www.cuentosyvalores.es/"> <meta property="og:locale" content="es_ES"> <meta property="og:type" content="website"> <meta property="og:title" content="Cuentos con valores para niños | Ilustrados y educativos"> <meta property="og:description" content="Lee cuentos infantiles ilustrados con valores y descarga actividades educativas para niños. Recursos ideales para familias y colegios."> <meta property="og:url" content="https://www.cuentosyvalores.es/"> <meta property="og:site_name" content="Cuentos y Valores"> <meta property="og:image" content="https://www.cuentosyvalores.es/assets/og-cuentos-y-valores.jpg"> <meta property="og:image:alt" content="Ilustración de portada de Cuentos y Valores con cuentos infantiles educativos"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title" content="Cuentos con valores para niños | Ilustrados y educativos"> <meta name="twitter:description" content="Cuentos infantiles ilustrados con valores y actividades educativas para familias y colegios."> <meta name="twitter:image" content="https://www.cuentosyvalores.es/assets/og-cuentos-y-valores.jpg">
```

## Schema.org JSON-LD
```html
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://www.cuentosyvalores.es/#organization","name":"Cuentos y Valores","url":"https://www.cuentosyvalores.es/","logo":{"@type":"ImageObject","url":"https://www.cuentosyvalores.es/assets/logo.png"}},{"@type":"WebSite","@id":"https://www.cuentosyvalores.es/#website","url":"https://www.cuentosyvalores.es/","name":"Cuentos y Valores","description":"Cuentos infantiles ilustrados con valores y actividades educativas para familias y colegios.","inLanguage":"es","publisher":{"@id":"https://www.cuentosyvalores.es/#organization"}},{"@type":"CollectionPage","@id":"https://www.cuentosyvalores.es/#webpage","url":"https://www.cuentosyvalores.es/","name":"Cuentos infantiles con valores y dibujos | Cuentos y Valores","isPartOf":{"@id":"https://www.cuentosyvalores.es/#website"},"about":{"@type":"Thing","name":"Educación en valores mediante cuentos infantiles ilustrados"},"audience":{"@type":"EducationalAudience","educationalRole":"parent, teacher"},"inLanguage":"es"}]}</script>
```