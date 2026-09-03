import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CropPhotoModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropSave: (croppedDataUrl: string) => Promise<void>;
}

export const CropPhotoModal: React.FC<CropPhotoModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropSave
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load image when imageSrc changes
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Render preview canvas
  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 260; // Canvas dimensions
    const center = size / 2;
    const cropRadius = 100; // Circle radius

    ctx.clearRect(0, 0, size, size);

    // Calculate base scale so image covers crop area at zoom=1
    const baseScale = Math.max((cropRadius * 2) / img.width, (cropRadius * 2) / img.height);
    const currentScale = baseScale * zoom;

    const drawWidth = img.width * currentScale;
    const drawHeight = img.height * currentScale;

    const drawX = center - drawWidth / 2 + offset.x;
    const drawY = center - drawHeight / 2 + offset.y;

    // Save state & draw image
    ctx.save();
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // Draw dark mask outside circle
    ctx.fillStyle = 'rgba(2, 6, 23, 0.78)';
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.arc(center, center, cropRadius, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw circle ring border
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(center, center, cropRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }, [zoom, offset]);

  useEffect(() => {
    if (isOpen && imageLoaded) {
      drawPreview();
    }
  }, [isOpen, imageLoaded, drawPreview]);

  // Mouse / Touch handlers for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    const img = imgRef.current;
    if (!img) return;

    setSaving(true);
    try {
      const outputCanvas = document.createElement('canvas');
      const outputSize = 160;
      outputCanvas.width = outputSize;
      outputCanvas.height = outputSize;
      const ctx = outputCanvas.getContext('2d');

      if (ctx) {
        const cropRadius = 100;

        const baseScale = Math.max((cropRadius * 2) / img.width, (cropRadius * 2) / img.height);
        const currentScale = baseScale * zoom;

        const ratio = outputSize / (cropRadius * 2);

        const drawWidth = img.width * currentScale * ratio;
        const drawHeight = img.height * currentScale * ratio;
        const drawX = outputSize / 2 - drawWidth / 2 + offset.x * ratio;
        const drawY = outputSize / 2 - drawHeight / 2 + offset.y * ratio;

        // Clip circular path
        ctx.beginPath();
        ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
        ctx.clip();

        // Fill slate background in case of PNG transparency
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, outputSize, outputSize);

        // Draw cropped portion
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        const croppedDataUrl = outputCanvas.toDataURL('image/jpeg', 0.85);
        await onCropSave(croppedDataUrl);
      }
    } catch (err) {
      console.error('Error generating cropped image:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-backdrop-enter"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-modal-title"
    >
      <div
        className="w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-slate-700/80 relative overflow-hidden my-auto text-center animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✂️</span>
            <h3 id="crop-modal-title" className="text-lg font-black text-white">Crop Profile Photo</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Drag to position your photo inside the circle, and use the zoom slider below.
        </p>

        {/* Canvas Viewport */}
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={260}
            height={260}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="rounded-2xl border border-slate-800 shadow-inner cursor-grab active:cursor-grabbing touch-none bg-slate-950"
          />
        </div>

        {/* Controls */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>🔍 Zoom: {zoom.toFixed(1)}x</span>
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
            >
              Reset Position
            </button>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-glow-indigo transition-all disabled:opacity-50"
          >
            {saving ? 'Cropping...' : 'Apply & Save Photo ✂️'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all border border-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CropPhotoModal.displayName = 'CropPhotoModal';
