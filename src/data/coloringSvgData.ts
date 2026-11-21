export interface ColoringElement {
  id: string;
  name: string;
  d?: string;
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  fillDefault?: string;
}

export interface ColoringDesign {
  title: string;
  character: string;
  viewBox: string;
  elements: ColoringElement[];
}

export const COLORING_DESIGNS: Record<string, ColoringDesign> = {
  'dragon-chispa': {
    title: 'Chispa el Dragón Amistoso',
    character: 'Chispa',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'head', name: 'Cabeza', d: 'M140,160 C140,100 260,100 260,160 C260,200 240,220 200,225 C160,220 140,200 140,160 Z' },
      { id: 'snout', name: 'Hocico', d: 'M160,180 C160,160 240,160 240,180 C240,210 160,210 160,180 Z' },
      { id: 'nostril-l', name: 'Narina Izquierda', cx: 185, cy: 185, r: 4 },
      { id: 'nostril-r', name: 'Narina Derecha', cx: 215, cy: 185, r: 4 },
      { id: 'smile', name: 'Sonrisa', d: 'M180,200 Q200,212 220,200' },
      { id: 'eye-l', name: 'Ojo Izquierdo', cx: 175, cy: 140, r: 12 },
      { id: 'pupil-l', name: 'Pupila Izquierda', cx: 178, cy: 140, r: 6, fillDefault: '#1e293b' },
      { id: 'eye-r', name: 'Ojo Derecho', cx: 225, cy: 140, r: 12 },
      { id: 'pupil-r', name: 'Pupila Derecha', cx: 222, cy: 140, r: 6, fillDefault: '#1e293b' },
      { id: 'horn-l', name: 'Cuerno Izquierdo', d: 'M155,120 Q140,80 165,85 Q165,105 168,118 Z' },
      { id: 'horn-r', name: 'Cuerno Derecho', d: 'M245,120 Q260,80 235,85 Q235,105 232,118 Z' },
      { id: 'body', name: 'Cuerpo', d: 'M145,220 C125,270 135,340 200,340 C265,340 275,270 255,220 Z' },
      { id: 'belly', name: 'Barriga', d: 'M165,240 C155,280 165,330 200,330 C235,330 245,280 235,240 Z' },
      { id: 'wing-l', name: 'Ala Izquierda', d: 'M140,240 C90,190 60,240 90,280 C110,295 130,275 138,260 Z' },
      { id: 'wing-r', name: 'Ala Derecha', d: 'M260,240 C310,190 340,240 310,280 C290,295 270,275 262,260 Z' },
      { id: 'arm-l', name: 'Pata Delantera Izq', d: 'M145,240 C120,255 125,275 145,270 Z' },
      { id: 'arm-r', name: 'Pata Delantera Der', d: 'M255,240 C280,255 275,275 255,270 Z' },
      { id: 'foot-l', name: 'Pata Trasera Izq', d: 'M140,335 C115,335 115,365 145,365 C165,365 165,345 155,335 Z' },
      { id: 'foot-r', name: 'Pata Trasera Der', d: 'M260,335 C285,335 285,365 255,365 C235,365 235,345 245,335 Z' },
      { id: 'tail', name: 'Cola', d: 'M245,320 C290,340 320,310 330,290 C335,280 325,275 315,290 C300,310 270,320 245,325 Z' },
      { id: 'sparkle', name: 'Chispa de Verdad', d: 'M200,60 L205,75 L220,80 L205,85 L200,100 L195,85 L180,80 L195,75 Z' },
    ],
  },
  'erizo-pipo': {
    title: 'Pipo el Erizo Valiente',
    character: 'Pipo',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'spikes', name: 'Púas Suaves', d: 'M120,260 C80,220 80,140 140,110 C200,80 280,100 310,160 C330,200 320,260 270,300 C230,330 150,320 120,260 Z' },
      { id: 'face', name: 'Cara Amable', d: 'M130,200 C110,210 90,240 110,265 C130,285 170,285 190,270 C210,250 200,210 170,200 Z' },
      { id: 'nose', name: 'Hocico', cx: 100, cy: 245, r: 8, fillDefault: '#1e293b' },
      { id: 'eye', name: 'Ojo Curioso', cx: 145, cy: 225, r: 9 },
      { id: 'pupil', name: 'Pupila', cx: 147, cy: 224, r: 5, fillDefault: '#1e293b' },
      { id: 'smile', name: 'Sonrisa', d: 'M120,260 Q135,270 150,260' },
      { id: 'belly', name: 'Pancita', d: 'M150,270 C160,310 220,310 240,270 C230,250 180,250 150,270 Z' },
      { id: 'apple', name: 'Manzana de la Valentía', d: 'M240,140 C225,125 210,150 225,170 C240,185 265,180 265,160 C265,140 250,125 240,140 Z' },
    ],
  },
  'conejito-tamboril': {
    title: 'Tamboril el Conejito Empático',
    character: 'Tamboril',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'ear-l', name: 'Oreja Izquierda', d: 'M160,140 C140,60 110,60 140,140 Z' },
      { id: 'ear-r', name: 'Oreja Derecha', d: 'M240,140 C260,60 290,60 260,140 Z' },
      { id: 'head', name: 'Cabeza Redondita', cx: 200, cy: 180, r: 55 },
      { id: 'eye-l', name: 'Ojo Izquierdo', cx: 180, cy: 170, r: 8 },
      { id: 'eye-r', name: 'Ojo Derecho', cx: 220, cy: 170, r: 8 },
      { id: 'body', name: 'Cuerpo', d: 'M160,225 C135,260 140,330 170,340 C190,345 210,345 230,340 C260,330 265,260 240,225 Z' },
      { id: 'belly', name: 'Pancita Suave', cx: 200, cy: 285, rx: 32, ry: 40 },
    ],
  },
  'ardilla-cascabel': {
    title: 'Cascabel la Ardilla Generosa',
    character: 'Cascabel',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'tail', name: 'Cola Esponjosa', d: 'M240,290 C320,300 360,180 320,110 C280,60 230,80 230,120 C230,150 270,150 270,180 C270,240 240,250 220,270 Z' },
      { id: 'body', name: 'Cuerpo', d: 'M140,200 C120,230 120,310 160,330 C180,340 210,335 220,300 C230,260 210,210 180,195 Z' },
      { id: 'head', name: 'Cabecita', cx: 160, cy: 160, r: 40 },
      { id: 'acorn-nut', name: 'Bellota para Compartir', d: 'M132,238 C132,260 158,260 158,238 Z' },
    ],
  },
  'tortuga-clementina': {
    title: 'Clementina la Tortuga Paciente',
    character: 'Clementina',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'shell-main', name: 'Caparazón', d: 'M110,260 C110,160 270,160 280,260 C250,270 140,270 110,260 Z' },
      { id: 'head', name: 'Cabecita Sonriente', d: 'M265,235 C285,220 325,225 325,250 C325,275 285,275 265,255 Z' },
      { id: 'foot-f', name: 'Pata Delantera', d: 'M240,265 C240,305 275,305 270,265 Z' },
      { id: 'foot-b', name: 'Pata Trasera', d: 'M130,265 C130,305 165,305 160,265 Z' },
    ],
  },
  'hormiga-titan': {
    title: 'Titán y el Equipo de Hormiguitas',
    character: 'Titán',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'leaf', name: 'Gran Hoja Dorada', d: 'M110,130 C150,90 280,90 320,130 C280,180 150,180 110,130 Z' },
      { id: 'head', name: 'Cabeza Hormiguita', cx: 160, cy: 210, r: 24 },
      { id: 'thorax', name: 'Tórax', cx: 195, cy: 235, r: 18 },
      { id: 'abdomen', name: 'Abdomen Fuerte', cx: 235, cy: 250, rx: 25, ry: 20 },
    ],
  },
  'ciervo-valiente': {
    title: 'El Gran Ciervo Blanco y Valerio',
    character: 'El Ciervo Blanco',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'antler-l', name: 'Cornamenta Izq', d: 'M170,120 C150,60 110,60 100,90 M130,80 L110,50' },
      { id: 'antler-r', name: 'Cornamenta Der', d: 'M230,120 C250,60 290,60 300,90 M270,80 L290,50' },
      { id: 'head', name: 'Cabeza Noble', d: 'M160,140 C160,120 240,120 240,140 C240,200 220,230 200,235 C180,230 160,200 160,140 Z' },
      { id: 'crystal', name: 'Cristal de los Ecos', d: 'M200,275 L220,305 L200,335 L180,305 Z' },
    ],
  },
  'luz-nazaret': {
    title: 'La Luz de Nazaret',
    character: 'Estrella de Belén y Nazaret',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'star', name: 'Estrella de Oriente', d: 'M200,45 L215,90 L260,95 L225,120 L235,165 L200,140 L165,165 L175,120 L140,95 L185,90 Z' },
      { id: 'hill', name: 'Colina de Nazaret', d: 'M40,340 Q200,220 360,340 Z' },
      { id: 'sun-halo', name: 'Luz de Esperanza', cx: 200, cy: 205, r: 42 },
    ],
  },
  'mateo-telescopio': {
    title: 'Mateo y el Telescopio Dorado',
    character: 'Mateo',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'tube', name: 'Tubo del Telescopio', d: 'M120,165 L290,95 L305,125 L135,195 Z' },
      { id: 'tripod-l', name: 'Pata Izquierda', d: 'M200,175 L135,340' },
      { id: 'tripod-r', name: 'Pata Derecha', d: 'M210,175 L275,340' },
      { id: 'saturn', name: 'Saturno Estrellado', cx: 315, cy: 75, r: 24 },
      { id: 'star-1', name: 'Estrella de la Verdad', d: 'M85,80 L92,98 L110,98 L96,108 L101,126 L85,115 L69,126 L74,108 L60,98 L78,98 Z' },
    ],
  },
  'mapa-sentimientos': {
    title: 'El Mapa de los Sentimientos y el Cohete',
    character: 'Lucas, Sofía y Tomás',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'rocket-body', name: 'Cuerpo del Cohete', d: 'M150,120 C150,80 250,80 250,120 L255,295 L145,295 Z' },
      { id: 'rocket-heart', name: 'Corazón de la Empatía', d: 'M200,215 C180,195 160,210 175,230 L200,255 L225,230 C240,210 220,195 200,215 Z' },
      { id: 'fin-l', name: 'Aleta Izquierda', d: 'M145,240 L105,300 L145,295 Z' },
      { id: 'fin-r', name: 'Aleta Derecha', d: 'M255,240 L295,300 L255,295 Z' },
    ],
  },
  'mision-dos': {
    title: 'La Nave Estelar de Cartón',
    character: 'Leo y Maya',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'box-hull', name: 'Caja Nave Espacial', d: 'M90,170 L310,170 L300,320 L100,320 Z' },
      { id: 'leo-head', name: 'Cabeza de Leo', cx: 155, cy: 140, r: 30 },
      { id: 'maya-head', name: 'Cabeza de Maya', cx: 245, cy: 140, r: 30 },
      { id: 'friendship-star-1', name: 'Estrella Guía', d: 'M320,80 L324,90 L335,90 L327,96 L330,106 L320,100 L310,106 L313,96 L305,90 L316,90 Z' },
      { id: 'friendship-star-2', name: 'Estrella Compañera', d: 'M90,95 L93,103 L102,103 L95,108 L98,116 L90,111 L82,116 L85,108 L78,103 L87,103 Z' },
    ],
  },
  corazon: {
    title: 'Corazón de Valores',
    character: 'Símbolo de Amistad',
    viewBox: '0 0 400 400',
    elements: [
      { id: 'heart-main', name: 'Corazón Grande', d: 'M200,330 C110,270 70,200 70,145 C70,95 110,65 155,65 C180,65 195,80 200,95 C205,80 220,65 245,65 C290,65 330,95 330,145 C330,200 290,270 200,330 Z' },
      { id: 'spark-top', name: 'Estrella Superior', d: 'M200,145 L210,170 L235,175 L215,190 L220,215 L200,200 L180,215 L185,190 L165,175 L190,170 Z' },
    ],
  },
};
