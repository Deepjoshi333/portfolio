import { useEffect, useRef } from 'react';

export default function StarField() {
  const starRef = useRef(null);
  const gridRef = useRef(null);

  // Star field
  useEffect(() => {
    const canvas = starRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let rafId;
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o * twinkle})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);

  // Perspective grid (Jesper / AMIX style)
  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, offset = 0;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    let lastScroll = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      offset += dy * 0.4;
      lastScroll = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let rafId;
    const drawGrid = () => {
      ctx.clearRect(0, 0, w, h);

      const vp = { x: w / 2, y: 0 }; // vanishing point top-center
      const gridColor = 'rgba(92,245,205,';
      const cols = 14;
      const rows = 14;

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const t = i / cols;
        const x = (t - 0.5) * w * 2.5;
        const intensity = 1 - Math.abs(t - 0.5) * 1.6;
        if (intensity <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(vp.x + x, h);
        ctx.strokeStyle = `${gridColor}${0.12 * intensity})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }

      // Horizontal lines — perspective foreshortening
      for (let j = 0; j <= rows; j++) {
        const t = Math.pow(j / rows, 1.8); // foreshortened
        const y = t * h;
        const xSpread = t * w * 1.25;

        const progress = (offset * 0.01 + t) % 1;
        const alpha = 0.03 + 0.12 * Math.pow(progress, 1.5);

        ctx.beginPath();
        ctx.moveTo(vp.x - xSpread, y);
        ctx.lineTo(vp.x + xSpread, y);
        ctx.strokeStyle = `${gridColor}${alpha})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }

      // Subtle teal glow horizon line
      const grad = ctx.createLinearGradient(0, 2, w, 2);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.4, 'rgba(92,245,205,0.15)');
      grad.addColorStop(0.6, 'rgba(92,245,205,0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(0, 1);
      ctx.lineTo(w, 1);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();

      rafId = requestAnimationFrame(drawGrid);
    };

    resize();
    rafId = requestAnimationFrame(drawGrid);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <canvas id="star-canvas" ref={starRef} aria-hidden="true" />
      <div id="grid-floor" aria-hidden="true">
        <canvas id="grid-canvas" ref={gridRef} />
      </div>
    </>
  );
}
