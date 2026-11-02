/**
 * ScrollFilm — Cinematic 900-Frame Video Background for Hero & About
 *
 * Runs across the Main page (Hero) and About section:
 * - Frames 0..450 play smoothly as you scroll through Hero
 * - Frames 450..899 play smoothly as you scroll through About
 * - Once you scroll past About (into Projects), the canvas gracefully fades out
 *   so the StarField and kinetic DJ slider take over!
 */

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 900;
const FRAMES_DIR   = '/frames/';
const PAD          = 5;
const BATCH_SIZE   = 40;

function padNum(n, len) {
  return String(n).padStart(len, '0');
}
function frameSrc(i) {
  return `${FRAMES_DIR}frame_${padNum(i, PAD)}.jpg`;
}

export default function ScrollFilm({ onProgress, onLoadComplete, retryKey }) {
  const canvasRef  = useRef(null);
  const imagesRef  = useRef([]);
  const loadedFramesRef = useRef(new Set());
  const failedFramesRef = useRef(new Set());
  const rafRef     = useRef(null);
  const lastFrame  = useRef(-1);
  const ctxRef     = useRef(null);

  const [loadedCount, setLoadedCount]         = useState(0);
  const [loadingDone, setLoadingDone]         = useState(false);
  const [opacity, setOpacity]                 = useState(1);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);

  /* ── Draw frame on canvas with cover fit ── */
  const drawFrame = useCallback((fi) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctxRef.current) ctxRef.current = canvas.getContext('2d');
    const ctx = ctxRef.current;
    const img = imagesRef.current[fi];
    if (!ctx || !img || !img.complete) return;
    const { width: cw, height: ch } = canvas;
    if (cw === 0 || ch === 0) return;
    const iw = img.naturalWidth || cw;
    const ih = img.naturalHeight || ch;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ── Resize canvas to window ── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext('2d');
    const fi = Math.max(0, Math.min(TOTAL_FRAMES - 1, lastFrame.current >= 0 ? lastFrame.current : 0));
    if (imagesRef.current[fi]?.complete) drawFrame(fi);
  }, [drawFrame]);

  /* ── Load every frame before revealing the portfolio ── */
  useEffect(() => {
    let cancelled = false;
    let batchTimer;

    if (retryKey === 0) {
      imagesRef.current = new Array(TOTAL_FRAMES);
      loadedFramesRef.current = new Set();
      failedFramesRef.current = new Set();
    }

    const indices = retryKey === 0
      ? Array.from({ length: TOTAL_FRAMES }, (_, index) => index)
      : Array.from(failedFramesRef.current);
    if (retryKey > 0) failedFramesRef.current.clear();

    const loadFrame = (index) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[index] = img;
            loadedFramesRef.current.add(index);
            failedFramesRef.current.delete(index);
            if (index === 0) {
              resizeCanvas();
              drawFrame(0);
            }
          }
          resolve();
        };
        img.onerror = () => {
          if (!cancelled) failedFramesRef.current.add(index);
          resolve();
        };
        img.src = frameSrc(index);
      });

    async function loadBatches() {
      for (let start = 0; start < indices.length; start += BATCH_SIZE) {
        if (cancelled) return;
        const batch = indices.slice(start, start + BATCH_SIZE);
        await Promise.all(batch.map(loadFrame));
        if (cancelled) return;

        const loaded = loadedFramesRef.current.size;
        const failed = failedFramesRef.current.size;
        setLoadedCount(loaded);
        onProgress?.({ loaded, total: TOTAL_FRAMES, failed });

        if (start + BATCH_SIZE < indices.length) {
          await new Promise((resolve) => {
            batchTimer = setTimeout(resolve, 20);
          });
        }
      }

      if (cancelled) return;
      if (loadedFramesRef.current.size === TOTAL_FRAMES && failedFramesRef.current.size === 0) {
        setLoadingDone(true);
        onProgress?.({ loaded: TOTAL_FRAMES, total: TOTAL_FRAMES, failed: 0 });
        onLoadComplete?.();
      }
    }

    loadBatches();

    return () => {
      cancelled = true;
      clearTimeout(batchTimer);
    };
  }, [drawFrame, onLoadComplete, onProgress, resizeCanvas, retryKey]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  /* ── Map scroll position across Hero & About to 900 frames ── */
  useEffect(() => {
    function onScroll() {
      const heroEl  = document.querySelector('#home');
      const aboutEl = document.querySelector('#about');
      if (!heroEl || !aboutEl) return;

      const heroTop     = heroEl.offsetTop;
      const aboutBottom = aboutEl.offsetTop + aboutEl.offsetHeight;
      const totalDist   = Math.max(1, aboutBottom - window.innerHeight);
      const sy          = window.scrollY;

      // Progress 0.0 at top of Hero -> 1.0 through About with increased animation speed
      const SPEED = 1.35;
      const p  = Math.max(0, Math.min(1, ((sy - heroTop) / totalDist) * SPEED));
      const fi = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1))));

      // Fade out smoothly as user scrolls past About into Projects (#work)
      const fadeStart = aboutBottom - window.innerHeight * 0.7;
      const fadeEnd   = aboutBottom;
      let op = 1;
      if (sy > fadeStart) {
        op = Math.max(0, Math.min(1, 1 - (sy - fadeStart) / (fadeEnd - fadeStart)));
      }

      setOpacity(op);
      setCurrentFrameNum(fi + 1);

      if (fi === lastFrame.current) return;
      lastFrame.current = fi;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(fi));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(onScroll, 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [drawFrame]);

  return (
    <div
      className="scroll-film-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: opacity,
        visibility: opacity <= 0.001 ? 'hidden' : 'visible',
        transition: 'opacity 0.2s ease-out',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Cinematic dark vignette for pristine contrast & text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 100%), linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top thin neon progress bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${(currentFrameNum / TOTAL_FRAMES) * 100}%`,
          height: '2px',
          background: 'var(--teal)',
          boxShadow: '0 0 10px var(--teal)',
          transition: 'width 0.05s linear',
        }}
      />

      {/* Frame counter HUD in bottom corner */}
      <div className="sf-hud">
        <span className="sf-hud-frame">
          {String(currentFrameNum).padStart(4, '0')}
          <span> / {TOTAL_FRAMES}</span>
        </span>
        {!loadingDone && (
          <span className="sf-hud-loading">
            Loading {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        )}
      </div>
    </div>
  );
}
