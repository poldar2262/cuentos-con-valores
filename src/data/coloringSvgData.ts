// Vector line art paths and layouts for children coloring sheets
export const COLORING_DESIGNS: Record<string, {
  title: string;
  character: string;
  viewBox: string;
  elements: { id: string; name: string; d?: string; cx?: number; cy?: number; r?: number; rx?: number; ry?: number; points?: string; fillDefault?: string }[];
}> = {
  'dragon-chispa': {
    title: 'Chispa el Dragón Amistoso',
    character: 'Chispa',
    viewBox: '0 0 400 400',
    elements: [
      // Head
      { id: 'head', name: 'Cabeza', d: 'M140,160 C140,100 260,100 260,160 C260,200 240,220 200,225 C160,220 140,200 140,160 Z' },
      // Snout
      { id: 'snout', name: 'Hocico', d: 'M160,180 C160,160 240,160 240,180 C240,210 160,210 160,180 Z' },
      // Left Nostril
      { id: 'nostril-l', name: 'Narina Izquierda', cx: 185, cy: 185, r: 4 },
      // Right Nostril
      { id: 'nostril-r', name: 'Narina Derecha', cx: 215, cy: 185, r: 4 },
      // Smile
      { id: 'smile', name: 'Sonrisa', d: 'M180,200 Q200,212 220,200' },
      // Left Eye
      { id: 'eye-l', name: 'Ojo Izquierdo', cx: 175, cy: 140, r: 12 },
      { id: 'pupil-l', name: 'Pupila Izquierda', cx: 178, cy: 140, r: 6, fillDefault: '#1e293b' },
      // Right Eye
      { id: 'eye-r', name: 'Ojo Derecho', cx: 225, cy: 140, r: 12 },
      { id: 'pupil-r', name: 'Pupila Derecha', cx: 222, cy: 140, r: 6, fillDefault: '#1e293b' },
      // Left Horn
      { id: 'horn-l', name: 'Cuerno Izquierdo', d: 'M155,120 Q140,80 165,85 Q165,105 168,118 Z' },
      // Right Horn
      { id: 'horn-r', name: 'Cuerno Derecho', d: 'M245,120 Q260,80 235,85 Q235,105 232,118 Z' },
      // Body
      { id: 'body', name: 'Cuerpo', d: 'M160,220 C130,240 120,320 150,340 C170,350 230,350 250,340 C280,320 270,240 240,220 Z' },
      // Belly
      { id: 'belly', name: 'Pancita', d: 'M170,235 C150,260 150,320 175,335 C190,340 210,340 225,335 C250,320 250,260 230,235 Z' },
      // Belly stripes
      { id: 'stripe-1', name: 'Línea 1', d: 'M165,265 Q200,275 235,265' },
      { id: 'stripe-2', name: 'Línea 2', d: 'M160,295 Q200,305 240,295' },
      // Left Wing
      { id: 'wing-l', name: 'Ala Izquierda', d: 'M135,225 C90,190 70,240 100,270 C115,285 130,275 138,260 Z' },
      // Right Wing
      { id: 'wing-r', name: 'Ala Derecha', d: 'M265,225 C310,190 330,240 300,270 C285,285 270,275 262,260 Z' },
      // Left Arm
      { id: 'arm-l', name: 'Pata Delantera Izq', d: 'M145,240 C120,255 125,275 145,270 Z' },
      // Right Arm
      { id: 'arm-r', name: 'Pata Delantera Der', d: 'M255,240 C280,255 275,275 255,270 Z' },
      // Left Foot
      { id: 'foot-l', name: 'Pata Trasera Izq', d: 'M140,335 C115,335 115,365 145,365 C165,365 165,345 155,335 Z' },
      // Right Foot
      { id: 'foot-r', name: 'Pata Trasera Der', d: 'M260,335 C285,335 285,365 255,365 C235,365 235,345 245,335 Z' },
      // Tail
      { id: 'tail', name: 'Cola', d: 'M245,320 C290,340 320,310 330,290 C335,280 325,275 315,290 C300,310 270,320 245,325 Z' },
      // Friendly heart / sparkle
      { id: 'sparkle', name: 'Chispa de Verdad', d: 'M200,60 L205,75 L220,80 L205,85 L200,100 L195,85 L180,80 L195,75 Z' }
    ]
  },
  'erizo-pipo': {
    title: 'Pipo el Erizo Valiente',
    character: 'Pipo',
    viewBox: '0 0 400 400',
    elements: [
      // Spikes back
      { id: 'spikes', name: 'Púas Suaves', d: 'M120,260 C80,220 80,140 140,110 C200,80 280,100 310,160 C330,200 320,260 270,300 C230,330 150,320 120,260 Z' },
      // Spikes details
      { id: 'spike-1', name: 'Púa 1', d: 'M100,160 L75,145 L115,140' },
      { id: 'spike-2', name: 'Púa 2', d: 'M140,105 L135,75 L165,95' },
      { id: 'spike-3', name: 'Púa 3', d: 'M200,85 L210,55 L225,85' },
      { id: 'spike-4', name: 'Púa 4', d: 'M270,95 L295,75 L285,115' },
      { id: 'spike-5', name: 'Púa 5', d: 'M315,150 L345,150 L320,175' },
      { id: 'spike-6', name: 'Púa 6', d: 'M315,210 L345,225 L310,240' },
      // Face
      { id: 'face', name: 'Cara Amable', d: 'M130,200 C110,210 90,240 110,265 C130,285 170,285 190,270 C210,250 200,210 170,200 Z' },
      // Nose
      { id: 'nose', name: 'Hocico', cx: 100, cy: 245, r: 8, fillDefault: '#1e293b' },
      // Eye
      { id: 'eye', name: 'Ojo Curioso', cx: 145, cy: 225, r: 9 },
      { id: 'pupil', name: 'Pupila', cx: 147, cy: 224, r: 5, fillDefault: '#1e293b' },
      // Smile
      { id: 'smile', name: 'Sonrisa', d: 'M120,260 Q135,270 150,260' },
      // Ear
      { id: 'ear', name: 'Oreja', d: 'M170,195 C165,180 185,175 190,190 Z' },
      // Belly
      { id: 'belly', name: 'Pancita', d: 'M150,270 C160,310 220,310 240,270 C230,250 180,250 150,270 Z' },
      // Little feet
      { id: 'foot-l', name: 'Patita Delantera', d: 'M140,290 C130,315 155,315 155,290 Z' },
      { id: 'foot-r', name: 'Patita Trasera', d: 'M210,295 C205,320 230,320 230,295 Z' },
      // Little apple on back
      { id: 'apple', name: 'Manzana de la Valentía', d: 'M240,140 C225,125 210,150 225,170 C240,185 265,180 265,160 C265,140 250,125 240,140 Z' },
      { id: 'leaf', name: 'Hoja de la Manzana', d: 'M235,130 Q245,115 255,125 Q245,135 235,130 Z' }
    ]
  },
  'conejito-tamboril': {
    title: 'Tamboril el Conejito Empático',
    character: 'Tamboril',
    viewBox: '0 0 400 400',
    elements: [
      // Left Ear
      { id: 'ear-l', name: 'Oreja Izquierda', d: 'M160,140 C140,60 110,60 140,140 Z' },
      { id: 'ear-in-l', name: 'Interior Oreja Izq', d: 'M155,135 C142,80 125,80 142,135 Z' },
      // Right Ear
      { id: 'ear-r', name: 'Oreja Derecha', d: 'M240,140 C260,60 290,60 260,140 Z' },
      { id: 'ear-in-r', name: 'Interior Oreja Der', d: 'M245,135 C258,80 275,80 258,135 Z' },
      // Head
      { id: 'head', name: 'Cabeza Redondita', cx: 200, cy: 180, r: 55 },
      // Eyes
      { id: 'eye-l', name: 'Ojo Izquierdo', cx: 180, cy: 170, r: 8 },
      { id: 'pupil-l', name: 'Brillo Ojo Izq', cx: 182, cy: 168, r: 4, fillDefault: '#1e293b' },
      { id: 'eye-r', name: 'Ojo Derecho', cx: 220, cy: 170, r: 8 },
      { id: 'pupil-r', name: 'Brillo Ojo Der', cx: 218, cy: 168, r: 4, fillDefault: '#1e293b' },
      // Nose & mouth
      { id: 'nose', name: 'Nariz Rosa', d: 'M195,185 L205,185 L200,192 Z' },
      { id: 'smile-l', name: 'Bigote/Sonrisa Izq', d: 'M200,192 Q190,200 185,195' },
      { id: 'smile-r', name: 'Bigote/Sonrisa Der', d: 'M200,192 Q210,200 215,195' },
      // Body
      { id: 'body', name: 'Cuerpo', d: 'M160,225 C135,260 140,330 170,340 C190,345 210,345 230,340 C260,330 265,260 240,225 Z' },
      // Belly
      { id: 'belly', name: 'Pancita Suave', cx: 200, cy: 285, rx: 32, ry: 40 },
      // Hands holding a flower
      { id: 'hands', name: 'Patitas', d: 'M175,255 C165,265 185,275 195,265 C205,275 225,265 215,255 Z' },
      // Flower
      { id: 'flower-stem', name: 'Tallo Flor', d: 'M195,265 L195,310' },
      { id: 'flower-c', name: 'Centro Flor', cx: 195, cy: 235, r: 8 },
      { id: 'flower-p1', name: 'Pétalo 1', cx: 195, cy: 220, r: 6 },
      { id: 'flower-p2', name: 'Pétalo 2', cx: 210, cy: 235, r: 6 },
      { id: 'flower-p3', name: 'Pétalo 3', cx: 195, cy: 250, r: 6 },
      { id: 'flower-p4', name: 'Pétalo 4', cx: 180, cy: 235, r: 6 },
      // Big paws
      { id: 'paw-l', name: 'Pata Grande Izq', d: 'M150,330 C130,330 130,360 160,360 C180,360 175,335 160,330 Z' },
      { id: 'paw-r', name: 'Pata Grande Der', d: 'M250,330 C270,330 270,360 240,360 C220,360 225,335 240,330 Z' }
    ]
  },
  'ardilla-cascabel': {
    title: 'Cascabel la Ardilla Generosa',
    character: 'Cascabel',
    viewBox: '0 0 400 400',
    elements: [
      // Big fluffy tail
      { id: 'tail', name: 'Cola Exponjosa', d: 'M240,290 C320,300 360,180 320,110 C280,60 230,80 230,120 C230,150 270,150 270,180 C270,240 240,250 220,270 Z' },
      // Body
      { id: 'body', name: 'Cuerpo', d: 'M140,200 C120,230 120,310 160,330 C180,340 210,335 220,300 C230,260 210,210 180,195 Z' },
      // Head
      { id: 'head', name: 'Cabecita', cx: 160, cy: 160, r: 40 },
      // Ears
      { id: 'ear-l', name: 'Oreja Izq', d: 'M140,135 C135,110 150,110 155,130 Z' },
      { id: 'ear-r', name: 'Oreja Der', d: 'M175,135 C170,110 185,110 190,130 Z' },
      // Eye
      { id: 'eye', name: 'Ojo Ilusionado', cx: 150, cy: 155, r: 8 },
      { id: 'pupil', name: 'Pupila', cx: 148, cy: 154, r: 4, fillDefault: '#1e293b' },
      // Nose
      { id: 'nose', name: 'Naricita', cx: 125, cy: 165, r: 5, fillDefault: '#1e293b' },
      // Acorn in hands
      { id: 'acorn-cup', name: 'Sombrerito Bellota', d: 'M130,230 Q145,220 160,230 L158,238 L132,238 Z' },
      { id: 'acorn-nut', name: 'Bellota para Compartir', d: 'M132,238 C132,260 158,260 158,238 Z' },
      // Little paws
      { id: 'paws', name: 'Patitas Delanteras', d: 'M125,235 C120,245 135,250 140,240 C145,250 160,245 155,235 Z' },
      // Feet
      { id: 'foot', name: 'Pata para Saltar', d: 'M140,330 C130,350 170,355 175,335 Z' }
    ]
  },
  'tortuga-clementina': {
    title: 'Clementina la Tortuga Paciente',
    character: 'Clementina',
    viewBox: '0 0 400 400',
    elements: [
      // Big friendly shell
      { id: 'shell-main', name: 'Caparazón', d: 'M110,260 C110,160 270,160 280,260 C250,270 140,270 110,260 Z' },
      // Shell pattern plates
      { id: 'plate-1', name: 'Placa Central', d: 'M170,190 L210,190 L225,220 L195,240 L160,220 Z' },
      { id: 'plate-2', name: 'Placa Delantera', d: 'M140,205 L165,220 L160,250 L125,250 Z' },
      { id: 'plate-3', name: 'Placa Trasera', d: 'M230,205 L265,250 L230,250 L225,220 Z' },
      { id: 'plate-4', name: 'Placa Superior', d: 'M175,175 Q195,160 215,175 L210,190 L170,190 Z' },
      // Head and neck
      { id: 'head', name: 'Cabecita Sonriente', d: 'M265,235 C285,220 325,225 325,250 C325,275 285,275 265,255 Z' },
      // Eye
      { id: 'eye', name: 'Ojo Amable', cx: 305, cy: 240, r: 6 },
      { id: 'pupil', name: 'Pupila', cx: 307, cy: 239, r: 3, fillDefault: '#1e293b' },
      // Smile
      { id: 'smile', name: 'Sonrisa Serena', d: 'M295,260 Q310,265 320,255' },
      // Front Foot
      { id: 'foot-f', name: 'Pata Delantera Fuerte', d: 'M240,265 C240,305 275,305 270,265 Z' },
      // Back Foot
      { id: 'foot-b', name: 'Pata Trasera Firme', d: 'M130,265 C130,305 165,305 160,265 Z' },
      // Tail
      { id: 'tail', name: 'Colita Corta', d: 'M115,260 L95,265 L115,270 Z' }
    ]
  },
  'hormiga-titan': {
    title: 'Titán y el Equipo de Hormiguitas',
    character: 'Titán',
    viewBox: '0 0 400 400',
    elements: [
      // Leaf being carried together
      { id: 'leaf', name: 'Gran Hoja Dorada', d: 'M110,130 C150,90 280,90 320,130 C280,180 150,180 110,130 Z' },
      { id: 'leaf-vein-1', name: 'Nervio Central', d: 'M115,130 L315,130' },
      { id: 'leaf-vein-2', name: 'Nervio Lateral 1', d: 'M180,130 Q210,110 230,105' },
      { id: 'leaf-vein-3', name: 'Nervio Lateral 2', d: 'M220,130 Q250,150 270,155' },
      // Ant Head
      { id: 'head', name: 'Cabeza Hormiguita', cx: 160, cy: 210, r: 24 },
      // Ant Antennae
      { id: 'ant-l', name: 'Antena Izq', d: 'M155,190 Q145,165 130,170' },
      { id: 'ant-r', name: 'Antena Der', d: 'M165,190 Q175,165 190,170' },
      // Ant Eye
      { id: 'eye', name: 'Ojo Feliz', cx: 155, cy: 205, r: 5 },
      { id: 'pupil', name: 'Pupila', cx: 154, cy: 204, r: 2.5, fillDefault: '#1e293b' },
      // Ant Smile
      { id: 'smile', name: 'Sonrisa Enérgica', d: 'M150,220 Q160,228 170,220' },
      // Ant Thorax & Abdomen
      { id: 'thorax', name: 'Tórax', cx: 195, cy: 235, r: 18 },
      { id: 'abdomen', name: 'Abdomen Fuerte', cx: 235, cy: 250, rx: 25, ry: 20 },
      // Legs
      { id: 'leg-1', name: 'Patita 1', d: 'M185,245 L170,290 L160,290' },
      { id: 'leg-2', name: 'Patita 2', d: 'M200,245 L200,290 L210,290' },
      { id: 'leg-3', name: 'Patita 3', d: 'M225,255 L240,290 L250,290' },
      // Arms holding leaf
      { id: 'arms', name: 'Brazos Levantando la Hoja', d: 'M185,225 L180,155 M165,220 L160,155' }
    ]
  },
  'ciervo-valiente': {
    title: 'El Gran Ciervo Blanco y Valerio',
    character: 'El Ciervo Blanco',
    viewBox: '0 0 400 400',
    elements: [
      // Antlers
      { id: 'antler-l', name: 'Cornamenta Izq', d: 'M170,120 C150,60 110,60 100,90 M130,80 L110,50 M150,90 L130,70' },
      { id: 'antler-r', name: 'Cornamenta Der', d: 'M230,120 C250,60 290,60 300,90 M270,80 L290,50 M250,90 L270,70' },
      // Ears
      { id: 'ear-l', name: 'Oreja Izquierda', d: 'M150,150 C110,135 120,165 145,160 Z' },
      { id: 'ear-r', name: 'Oreja Derecha', d: 'M250,150 C290,135 280,165 255,160 Z' },
      // Head
      { id: 'head', name: 'Cabeza Noble', d: 'M160,140 C160,120 240,120 240,140 C240,200 220,230 200,235 C180,230 160,200 160,140 Z' },
      // Snout
      { id: 'snout', name: 'Hocico', d: 'M180,200 C180,185 220,185 220,200 C220,225 180,225 180,200 Z' },
      // Nose
      { id: 'nose', name: 'Nariz', cx: 200, cy: 215, r: 6, fillDefault: '#1e293b' },
      // Eyes
      { id: 'eye-l', name: 'Ojo Sabio Izq', cx: 180, cy: 165, r: 7 },
      { id: 'pupil-l', name: 'Brillo Izq', cx: 181, cy: 164, r: 4, fillDefault: '#1e293b' },
      { id: 'eye-r', name: 'Ojo Sabio Der', cx: 220, cy: 165, r: 7 },
      { id: 'pupil-r', name: 'Brillo Der', cx: 219, cy: 164, r: 4, fillDefault: '#1e293b' },
      // Neck and Chest
      { id: 'neck', name: 'Cuello Elegante', d: 'M170,230 C150,260 140,310 160,350 L240,350 C260,310 250,260 230,230 Z' },
      // Glowing Crystal
      { id: 'crystal', name: 'Cristal de los Ecos', d: 'M200,280 L220,305 L200,335 L180,305 Z' }
    ]
  },
  'luz-nazaret': {
    title: 'La Luz de Nazaret',
    character: 'Jesús de Nazaret',
    viewBox: '0 0 400 400',
    elements: [
      // Sun rays
      { id: 'sun', name: 'Sol Naciente', cx: 200, cy: 110, r: 50 },
      { id: 'ray-1', name: 'Rayo de Luz 1', d: 'M200,45 L200,20' },
      { id: 'ray-2', name: 'Rayo de Luz 2', d: 'M150,65 L130,45' },
      { id: 'ray-3', name: 'Rayo de Luz 3', d: 'M250,65 L270,45' },
      { id: 'ray-4', name: 'Rayo de Luz 4', d: 'M120,110 L90,110' },
      { id: 'ray-5', name: 'Rayo de Luz 5', d: 'M280,110 L310,110' },
      // Hair
      { id: 'hair', name: 'Cabello', d: 'M160,170 C150,130 250,130 240,170 C255,200 245,225 240,240 C235,210 225,190 200,190 C175,190 165,210 160,240 C155,225 145,200 160,170 Z' },
      // Face
      { id: 'face', name: 'Rostro Amable', d: 'M170,165 C170,145 230,145 230,165 C230,210 220,230 200,230 C180,230 170,210 170,165 Z' },
      // Eyes
      { id: 'eye-l', name: 'Ojo Izquierdo', d: 'M180,175 Q188,170 196,175' },
      { id: 'eye-r', name: 'Ojo Derecho', d: 'M204,175 Q212,170 220,175' },
      // Smile
      { id: 'smile', name: 'Sonrisa de Paz', d: 'M190,205 Q200,215 210,205' },
      // Tunic
      { id: 'tunic', name: 'Túnica Blanca', d: 'M160,235 C130,260 120,330 110,380 L290,380 C280,330 270,260 240,235 Z' },
      // Robe sash
      { id: 'sash', name: 'Manto de Amor', d: 'M170,235 C170,290 210,340 260,375 L280,360 C230,320 200,270 195,235 Z' }
    ]
  },
  'mateo-telescopio': {
    title: 'Mateo y el Misterio del Telescopio Roto',
    character: 'Mateo y el Telescopio',
    viewBox: '0 0 400 400',
    elements: [
      // Classroom window frame
      { id: 'window-frame', name: 'Marco de la Ventana', d: 'M60,40 L340,40 L340,240 L60,240 Z' },
      { id: 'window-divider-v', name: 'Parteluz Ventana', d: 'M200,40 L200,240' },
      { id: 'window-divider-h', name: 'Travesaño Ventana', d: 'M60,140 L340,140' },
      // Desk
      { id: 'desk-top', name: 'Mesa de Clase', d: 'M100,250 L300,250 L285,270 L115,270 Z' },
      { id: 'desk-leg-l', name: 'Pata Mesa Izq', d: 'M130,270 L125,380' },
      { id: 'desk-leg-r', name: 'Pata Mesa Der', d: 'M270,270 L275,380' },
      // Telescope Tube
      { id: 'telescope-tube', name: 'Tubo del Telescopio', d: 'M150,195 L270,145 L278,160 L158,210 Z' },
      { id: 'telescope-lens-front', name: 'Lente Principal', d: 'M270,145 C282,150 282,158 278,160 Z' },
      { id: 'telescope-eyepiece', name: 'Ocular', d: 'M150,195 L140,199 L143,208 L153,205 Z' },
      { id: 'telescope-finder', name: 'Buscador Pequeño', d: 'M195,155 L245,135 L248,142 L198,162 Z' },
      { id: 'telescope-mount', name: 'Soporte Dorado', cx: 205, cy: 190, r: 10 },
      // Tripod
      { id: 'tripod-center', name: 'Pata Central Trípode', d: 'M205,195 L205,250' },
      { id: 'tripod-left', name: 'Pata Izquierda Trípode', d: 'M202,195 L175,250' },
      { id: 'tripod-right', name: 'Pata Derecha Trípode', d: 'M208,195 L235,250' },
      // Star of Truth
      { id: 'star-truth', name: 'Estrella de la Honestidad', d: 'M200,65 L207,85 L227,90 L207,95 L200,115 L193,95 L173,90 L193,85 Z' }
    ]
  },
  'mapa-sentimientos': {
    title: 'El Mapa de los Sentimientos y el Cohete',
    character: 'Amigos y Cohete Explorador',
    viewBox: '0 0 400 400',
    elements: [
      // Rocket Body
      { id: 'rocket-cone', name: 'Morro del Cohete', d: 'M170,160 L200,80 L230,160 Z' },
      { id: 'rocket-body', name: 'Cuerpo de Cartón', d: 'M170,160 L230,160 L230,310 L170,310 Z' },
      // Rocket Window
      { id: 'rocket-window-outer', name: 'Marco Ventana', cx: 200, cy: 200, r: 24 },
      { id: 'rocket-window-inner', name: 'Cristal Ventana', cx: 200, cy: 200, r: 16 },
      // Fins
      { id: 'fin-left', name: 'Aleta Izquierda', d: 'M170,250 L135,310 L170,310 Z' },
      { id: 'fin-right', name: 'Aleta Derecha', d: 'M230,250 L265,310 L230,310 Z' },
      // Stars & Badges
      { id: 'star-1', name: 'Pegatina Estrella 1', d: 'M185,250 L188,258 L196,258 L190,263 L192,271 L185,266 L178,271 L180,263 L174,258 L182,258 Z' },
      { id: 'star-2', name: 'Pegatina Estrella 2', d: 'M215,250 L218,258 L226,258 L220,263 L222,271 L215,266 L208,271 L210,263 L204,258 L212,258 Z' },
      // Tree behind
      { id: 'tree-trunk', name: 'Tronco del Árbol', d: 'M290,140 L315,140 L320,310 L285,310 Z' },
      { id: 'tree-leaves', name: 'Copa del Árbol', d: 'M250,110 C250,60 350,60 350,110 C370,130 360,160 340,160 C320,170 280,170 260,150 C240,140 240,120 250,110 Z' },
      // School wall
      { id: 'playground-ground', name: 'Patio del Colegio', d: 'M50,310 L350,310' },
      // Empathy Heart
      { id: 'empathy-heart', name: 'Corazón de Empatía', d: 'M200,120 C190,105 170,105 170,125 C170,145 200,155 200,155 C200,155 230,145 230,125 C230,105 210,105 200,120 Z' }
    ]
  },
  'mision-dos': {
    title: 'Una Misión para Dos: La Nave de Cartón',
    character: 'Leo y Maya',
    viewBox: '0 0 400 400',
    elements: [
      // Cardboard box
      { id: 'box-front', name: 'Frontal Caja Cartón', d: 'M80,240 L320,240 L290,340 L110,340 Z' },
      { id: 'box-flap-l', name: 'Solapa Izquierda', d: 'M80,240 L60,200 L120,225 L100,240 Z' },
      { id: 'box-flap-r', name: 'Solapa Derecha', d: 'M320,240 L340,200 L280,225 L300,240 Z' },
      // Boy Leo (left)
      { id: 'leo-head', name: 'Cabeza de Leo', cx: 160, cy: 155, r: 30 },
      { id: 'leo-hair', name: 'Pelo Rebelde Leo', d: 'M130,150 C125,115 195,115 190,150 C185,125 170,120 155,125 C140,120 135,135 130,150 Z' },
      { id: 'leo-shirt', name: 'Camiseta Verde Leo', d: 'M135,185 L185,185 L190,240 L130,240 Z' },
      { id: 'leo-eye', name: 'Ojo Ilusionado', cx: 168, cy: 155, r: 4, fillDefault: '#1e293b' },
      { id: 'leo-smile', name: 'Sonrisa Leo', d: 'M155,170 Q168,178 178,170' },
      // Girl Maya (right)
      { id: 'maya-head', name: 'Cabeza de Maya', cx: 250, cy: 145, r: 28 },
      { id: 'maya-hair-bun', name: 'Moñito Maya', cx: 250, cy: 105, r: 18 },
      { id: 'maya-pinafore', name: 'Peto Amarillo Maya', d: 'M225,175 L275,175 L280,240 L220,240 Z' },
      { id: 'maya-arm-point', name: 'Brazo Señalando al Cielo', d: 'M270,175 L305,115 L295,110 L260,170 Z' },
      { id: 'maya-eye', name: 'Ojo Soñador', cx: 245, cy: 145, r: 4, fillDefault: '#1e293b' },
      { id: 'maya-smile', name: 'Sonrisa Maya', d: 'M240,160 Q252,168 262,160' },
      // Constellation / Dream Stars in background
      { id: 'friendship-star-1', name: 'Estrella Guía', d: 'M320,80 L324,90 L335,90 L327,96 L330,106 L320,100 L310,106 L313,96 L305,90 L316,90 Z' },
      { id: 'friendship-star-2', name: 'Estrella Compañera', d: 'M90,95 L93,103 L102,103 L95,108 L98,116 L90,111 L82,116 L85,108 L78,103 L87,103 Z' }
    ]
  }
};
