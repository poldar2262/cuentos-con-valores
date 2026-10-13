import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Printer, RotateCcw, Download, Sparkles, Paintbrush, Eraser, Check, Palette, Undo2 } from 'lucide-react';
import { Story } from '../types';
import { COLORING_DESIGNS } from '../data/coloringSvgData';

interface ColoringStudioModalProps {
  story: Story | null;
  onClose: () => void;
}

const PALETTE_COLORS = [
  { name: 'Rojo Amapola', hex: '#ef4444' },
  { name: 'Naranja Cítrico', hex: '#f97316' },
  { name: 'Amarillo Sol', hex: '#fbbf24' },
  { name: 'Verde Hoja', hex: '#22c55e' },
  { name: 'Verde Esmeralda', hex: '#10b981' },
  { name: 'Celeste Cielo', hex: '#38bdf8' },
  { name: 'Azul Real', hex: '#3b82f6' },
  { name: 'Violeta Mágico', hex: '#8b5cf6' },
  { name: 'Rosa Pastel', hex: '#f472b6' },
  { name: 'Marrón Bosque', hex: '#92400e' },
  { name: 'Gris Piedra', hex: '#94a3b8' },
  { name: 'Blanco Papel', hex: '#ffffff' },
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export const ColoringStudioModal: React.FC<ColoringStudioModalProps> = ({
  story,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('#38bdf8');
  const [fillState, setFillState] = useState<Record<string, string>>({});
  const [isBrushMode, setIsBrushMode] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 672,
    height: 900,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lineArtBufferRef = useRef<ImageData | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const svgHistoryRef = useRef<Record<string, string>[]>([]);

  const design = story
    ? COLORING_DESIGNS[story.coloringSheet.svgId] || COLORING_DESIGNS['mateo-telescopio']
    : COLORING_DESIGNS['mateo-telescopio'];

  const saveCanvasSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(snapshot);
    if (historyRef.current.length > 20) {
      historyRef.current.shift();
    }
    setCanUndo(true);
  }, []);

  // Initialize canvas when story changes
  useEffect(() => {
    if (!story) return;

    if (story.coloringSheet.lineartImage) {
      setIsImageLoaded(false);
      historyRef.current = [];
      setCanUndo(false);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = story.coloringSheet.lineartImage;
      img.onload = () => {
        const nw = img.naturalWidth || 800;
        const nh = img.naturalHeight || 800;

        // Keep high resolution (max dimension 900px) while preserving exact natural aspect ratio
        const MAX_DIM = 900;
        let w = nw;
        let h = nh;
        if (nw >= nh) {
          w = MAX_DIM;
          h = Math.round((nh / nw) * MAX_DIM);
        } else {
          h = MAX_DIM;
          w = Math.round((nw / nh) * MAX_DIM);
        }

        setCanvasSize({ width: w, height: h });

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
          }
        }

        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d');
        if (offCtx) {
          offCtx.fillStyle = '#ffffff';
          offCtx.fillRect(0, 0, w, h);
          offCtx.filter = 'contrast(1.2) brightness(1.02)';
          offCtx.drawImage(img, 0, 0, w, h);
          lineArtBufferRef.current = offCtx.getImageData(0, 0, w, h);
        }
        setIsImageLoaded(true);
      };
    } else {
      setCanvasSize({ width: 600, height: 600 });
      setFillState({});
      svgHistoryRef.current = [];
      setCanUndo(false);
    }
  }, [story]);

  // Flood Fill algorithm for raster lineart
  const floodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const colorPixels = imgData.data;
    const lineArtPixels = lineArtBufferRef.current?.data;

    let targetX = startX;
    let targetY = startY;

    // If clicked on or too close to a dark outline, try nearby pixels to find the region
    if (lineArtPixels) {
      const getLineLum = (px: number, py: number) => {
        const idx = (py * width + px) * 4;
        return (
          lineArtPixels[idx] * 0.299 +
          lineArtPixels[idx + 1] * 0.587 +
          lineArtPixels[idx + 2] * 0.114
        );
      };

      if (getLineLum(targetX, targetY) < 115) {
        let found = false;
        const offsets = [
          [-2, 0], [2, 0], [0, -2], [0, 2],
          [-3, 0], [3, 0], [0, -3], [0, 3],
          [-2, -2], [2, 2], [-2, 2], [2, -2],
        ];
        for (const [ox, oy] of offsets) {
          const nx = targetX + ox;
          const ny = targetY + oy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (getLineLum(nx, ny) >= 120) {
              targetX = nx;
              targetY = ny;
              found = true;
              break;
            }
          }
        }
        if (!found) return;
      }
    }

    const startIdx = (targetY * width + targetX) * 4;
    const targetR = colorPixels[startIdx];
    const targetG = colorPixels[startIdx + 1];
    const targetB = colorPixels[startIdx + 2];

    const [fillR, fillG, fillB] = hexToRgb(selectedColor);

    // If already the same color, no-op
    if (
      Math.abs(targetR - fillR) < 8 &&
      Math.abs(targetG - fillG) < 8 &&
      Math.abs(targetB - fillB) < 8
    ) {
      return;
    }

    // Save snapshot for undo
    saveCanvasSnapshot();

    // Fast queue-based scanline/BFS flood fill
    const queue = new Int32Array(width * height);
    let head = 0;
    let tail = 0;

    const visited = new Uint8Array(width * height);

    queue[tail++] = (targetY << 16) | targetX;
    visited[targetY * width + targetX] = 1;

    const colorTolerance = 45;

    while (head < tail) {
      const pos = queue[head++];
      const x = pos & 0xffff;
      const y = pos >> 16;
      const idx = (y * width + x) * 4;

      colorPixels[idx] = fillR;
      colorPixels[idx + 1] = fillG;
      colorPixels[idx + 2] = fillB;
      colorPixels[idx + 3] = 255;

      // 4-neighborhood
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      for (let i = 0; i < 4; i++) {
        const nx = neighbors[i][0];
        const ny = neighbors[i][1];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;

        const pIdx = ny * width + nx;
        if (visited[pIdx]) continue;

        const lIdx = pIdx * 4;

        // Check if dark outline in line art
        if (lineArtPixels) {
          const lum =
            lineArtPixels[lIdx] * 0.299 +
            lineArtPixels[lIdx + 1] * 0.587 +
            lineArtPixels[lIdx + 2] * 0.114;
          if (lum < 115) {
            continue; // Stop at black outlines
          }
        }

        // Check if matches target color
        const cr = colorPixels[lIdx];
        const cg = colorPixels[lIdx + 1];
        const cb = colorPixels[lIdx + 2];

        if (
          Math.abs(cr - targetR) <= colorTolerance &&
          Math.abs(cg - targetG) <= colorTolerance &&
          Math.abs(cb - targetB) <= colorTolerance
        ) {
          visited[pIdx] = 1;
          queue[tail++] = (ny << 16) | nx;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const handleElementClick = (elementId: string) => {
    if (isBrushMode) return;
    svgHistoryRef.current.push(fillState);
    setCanUndo(true);
    setFillState((prev) => ({
      ...prev,
      [elementId]: selectedColor,
    }));
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    if (!isBrushMode) {
      // Relleno Mágico (Flood Fill)
      floodFill(x, y);
    } else {
      // Pincel Libre
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      saveCanvasSnapshot();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      setIsDrawing(true);
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isBrushMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleCanvasPointerUp = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (story?.coloringSheet?.lineartImage) {
      const canvas = canvasRef.current;
      if (!canvas || historyRef.current.length === 0) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const previous = historyRef.current.pop();
      if (previous) {
        ctx.putImageData(previous, 0, 0);
      }
      setCanUndo(historyRef.current.length > 0);
    } else {
      if (svgHistoryRef.current.length === 0) return;
      const previous = svgHistoryRef.current.pop();
      if (previous) {
        setFillState(previous);
      }
      setCanUndo(svgHistoryRef.current.length > 0);
    }
  };

  const handleReset = () => {
    if (story?.coloringSheet?.lineartImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      saveCanvasSnapshot();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      svgHistoryRef.current.push(fillState);
      setCanUndo(true);
      setFillState({});
    }
  };

  // Export colored artwork as downloadable PNG
  const handleDownloadColoredImage = () => {
    if (!story) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    // Draw colors
    expCtx.drawImage(canvas, 0, 0);

    // Draw line art with multiply blend mode so outlines remain crisp
    if (story.coloringSheet.lineartImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = story.coloringSheet.lineartImage;
      img.onload = () => {
        expCtx.globalCompositeOperation = 'multiply';
        expCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const link = document.createElement('a');
        link.download = `dibujo-coloreado-${story.id}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
      };
    } else {
      const link = document.createElement('a');
      link.download = `dibujo-coloreado-${story.id}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!story) return null;

  return (
    <div
      id="coloring-studio-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-sky-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header (No print) */}
        <div className="no-print bg-sky-50 px-4 sm:px-6 py-4 border-b border-sky-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-sky-500 text-white">
              <Palette className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-slate-800 text-base sm:text-lg">
                Taller de Dibujo: {story.coloringSheet.title}
              </h3>
              <p className="text-xs text-sky-700">
                Valor: <strong>{story.value}</strong> • Colorea online o descarga en PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Colored button */}
            {story.coloringSheet.lineartImage && (
              <button
                id="btn-save-colored"
                type="button"
                onClick={handleDownloadColoredImage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Descargar mi dibujo coloreado como imagen para guardar o compartir"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Guardar Mi Dibujo</span>
              </button>
            )}

            {/* Download/Print PDF button */}
            <button
              id="btn-print-coloring-sheet"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Descargar lámina limpia en PDF para imprimir en papel"
            >
              <Printer className="w-4 h-4 text-sky-300" />
              <span className="hidden sm:inline">Descargar Lámina (PDF)</span>
            </button>

            {/* Close */}
            <button
              id="btn-close-coloring"
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar taller de dibujo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-sky-50/20">
          {/* Printable Sheet View (VISIBLE IN PRINT MODE ONLY) */}
          <div className="hidden print-only max-w-xl mx-auto p-8 border-4 border-dashed border-slate-400 rounded-3xl text-center">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-slate-900 font-display">
                {story.coloringSheet.title}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Cuento: &quot;{story.title}&quot; • Valor: {story.value}
              </p>
            </div>

            {/* Clean lineart without fills for paper coloring */}
            <div className="w-full aspect-square max-w-md mx-auto my-4 bg-white p-4 flex items-center justify-center">
              {story.coloringSheet.lineartImage ? (
                <img
                  src={story.coloringSheet.lineartImage}
                  alt={story.coloringSheet.title}
                  className="w-full h-full object-contain filter contrast-125"
                />
              ) : (
                <svg
                  viewBox={design.viewBox}
                  className="w-full h-full stroke-black stroke-[3.5] fill-none"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  {design.elements.map((el) => {
                    if (el.d) {
                      return <path key={el.id} d={el.d} />;
                    }
                    if (el.cx !== undefined && el.cy !== undefined && el.r !== undefined) {
                      return <circle key={el.id} cx={el.cx} cy={el.cy} r={el.r} />;
                    }
                    if (el.cx !== undefined && el.cy !== undefined && el.rx !== undefined) {
                      return <ellipse key={el.id} cx={el.cx} cy={el.cy} rx={el.rx} ry={el.ry} />;
                    }
                    return null;
                  })}
                </svg>
              )}
            </div>

            <div className="mt-8 pt-4 border-t-2 border-slate-300 grid grid-cols-2 gap-4 text-left text-sm text-slate-700">
              <div>
                <strong>Pequeño Artista:</strong> ______________________
              </div>
              <div className="text-right">
                <strong>Edad:</strong> _______ años
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-400">
              Cuentos con Valores y Dibujos para Colorear • ¡Imprime tantas veces como quieras y colorea con lápices, ceras o rotuladores!
            </div>
          </div>

          {/* Interactive Screen Studio (No print) */}
          <div className="no-print flex flex-col items-center">
            {/* Palette & Tools Bar */}
            <div className="w-full max-w-2xl bg-white rounded-2xl p-4 border border-sky-100 shadow-xs mb-3">
              {/* Color Swatches */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                {PALETTE_COLORS.map((col) => (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => {
                      setSelectedColor(col.hex);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform cursor-pointer relative flex items-center justify-center ${
                      selectedColor === col.hex
                        ? 'scale-115 border-slate-800 shadow-md ring-2 ring-sky-300'
                        : 'border-slate-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {selectedColor === col.hex && (
                      <Check
                        className={`w-4 h-4 ${
                          col.hex === '#ffffff' || col.hex === '#fbbf24'
                            ? 'text-slate-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Mode toggles & action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs font-semibold">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsBrushMode(false)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      !isBrushMode
                        ? 'bg-sky-500 text-white shadow-xs font-bold ring-2 ring-sky-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Haz clic con el ratón sobre cualquier zona para rellenar de color"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Relleno Mágico (Cubo)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBrushMode(true)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      isBrushMode
                        ? 'bg-sky-500 text-white shadow-xs font-bold ring-2 ring-sky-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Dibuja o colorea con trazo libre"
                  >
                    <Paintbrush className="w-3.5 h-3.5" />
                    <span>Pincel Libre</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedColor('#ffffff')}
                    className={`px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                      selectedColor === '#ffffff'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Borrador (color blanco)"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Borrador</span>
                  </button>

                  {isBrushMode && (
                    <div className="flex items-center gap-1 ml-1 text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                      <span>Grosor:</span>
                      <input
                        type="range"
                        min="3"
                        max="28"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className="w-16 accent-sky-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                    title="Deshacer última acción"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                    <span>Deshacer</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer flex items-center gap-1"
                    title="Limpiar todos los colores"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpiar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mode Guide Banner */}
            <div className="w-full max-w-2xl mb-3 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2">
                {!isBrushMode ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>Relleno Mágico Activo:</strong> Elige un color y <strong>haz clic en cualquier zona</strong> del dibujo para pintarla al instante como con un bote de pintura.
                    </span>
                  </>
                ) : (
                  <>
                    <Paintbrush className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>
                      <strong>Pincel Libre Activo:</strong> Mantén pulsado y arrastra el ratón o el dedo para dibujar y colorear con trazos.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Drawing Stage */}
            <div
              className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl border-4 border-amber-200 shadow-md p-2 select-none touch-none flex items-center justify-center mx-auto"
              style={{
                aspectRatio: `${canvasSize.width} / ${canvasSize.height}`,
                maxHeight: 'min(72vh, 580px)',
              }}
            >
              {story.coloringSheet.lineartImage ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  {/* Underlay Canvas (Colors and flood fills) */}
                  <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onPointerDown={handleCanvasPointerDown}
                    onPointerMove={handleCanvasPointerMove}
                    onPointerUp={handleCanvasPointerUp}
                    onPointerLeave={handleCanvasPointerUp}
                    className={`w-full h-full block ${
                      !isBrushMode ? 'cursor-pointer' : 'cursor-crosshair'
                    }`}
                  />

                  {/* Multiply Line Art Image on top of colors */}
                  <img
                    src={story.coloringSheet.lineartImage}
                    alt={story.coloringSheet.title}
                    className="absolute inset-0 w-full h-full object-fill filter contrast-125 select-none pointer-events-none"
                    style={{ mixBlendMode: 'multiply' }}
                    draggable={false}
                  />

                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex flex-col items-center justify-center text-sky-700 text-xs font-semibold gap-2">
                      <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <span>Cargando lámina de dibujo...</span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* SVG interactive layer */}
                  <svg
                    viewBox={design.viewBox}
                    className="w-full h-full stroke-slate-800 stroke-[3] transition-colors"
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  >
                    {design.elements.map((el) => {
                      const fillColor = fillState[el.id] || el.fillDefault || '#ffffff';
                      if (el.d) {
                        return (
                          <path
                            key={el.id}
                            id={`svg-element-${el.id}`}
                            d={el.d}
                            fill={fillColor}
                            onClick={() => handleElementClick(el.id)}
                            className={`transition-colors cursor-pointer ${
                              !isBrushMode ? 'hover:opacity-85' : ''
                            }`}
                          />
                        );
                      }
                      if (el.cx !== undefined && el.cy !== undefined && el.r !== undefined) {
                        return (
                          <circle
                            key={el.id}
                            id={`svg-element-${el.id}`}
                            cx={el.cx}
                            cy={el.cy}
                            r={el.r}
                            fill={fillColor}
                            onClick={() => handleElementClick(el.id)}
                            className={`transition-colors cursor-pointer ${
                              !isBrushMode ? 'hover:opacity-85' : ''
                            }`}
                          />
                        );
                      }
                      if (el.cx !== undefined && el.cy !== undefined && el.rx !== undefined) {
                        return (
                          <ellipse
                            key={el.id}
                            id={`svg-element-${el.id}`}
                            cx={el.cx}
                            cy={el.cy}
                            rx={el.rx}
                            ry={el.ry}
                            fill={fillColor}
                            onClick={() => handleElementClick(el.id)}
                            className={`transition-colors cursor-pointer ${
                              !isBrushMode ? 'hover:opacity-85' : ''
                            }`}
                          />
                        );
                      }
                      return null;
                    })}
                  </svg>
                </>
              )}
            </div>

            {/* Hint message */}
            <p className="text-xs text-slate-500 mt-3 text-center">
              🎨 <strong>¡Lámina lista para colorear!</strong> Selecciona tu color favorito y haz clic en las áreas para rellenarlas con el <strong>Relleno Mágico</strong>, usa el <strong>Pincel Libre</strong> para detalles, o pulsa <strong>&quot;Descargar Lámina (PDF)&quot;</strong> para imprimirla en papel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
