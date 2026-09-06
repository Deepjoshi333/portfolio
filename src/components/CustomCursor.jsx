import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const mouse = { x: -100, y: -100, isVisible: false };
    const trail = [];
    const MAX_POINTS = 24;
    const POINT_LIFESPAN = 260; // Fast vanish responsive ribbon trail
    let isHovering = false;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isVisible = true;

      const now = performance.now();
      // Only insert point if moved at least 2px to keep line clean and smooth
      if (
        trail.length === 0 ||
        Math.hypot(e.clientX - trail[0].x, e.clientY - trail[0].y) > 2.5
      ) {
        trail.unshift({ x: e.clientX, y: e.clientY, time: now });
        if (trail.length > MAX_POINTS) {
          trail.pop();
        }
      }
    };

    const onMouseLeave = () => {
      mouse.isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const onElementEnter = () => { isHovering = true; };
    const onElementLeave = () => { isHovering = false; };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, .project-card, .about-stat, .skill-item, .footer-social-pill, .about-tag, .tl-card, .footer-like-btn, .color-swatch-btn, .footer-back-to-top-btn'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onElementEnter);
        el.addEventListener('mouseleave', onElementLeave);
      });
    };

    attachHoverListeners();
    const obs = new MutationObserver(() => attachHoverListeners());
    obs.observe(document.body, { childList: true, subtree: true });

    let rafId;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Prune dead points older than POINT_LIFESPAN
      while (trail.length > 0 && time - trail[trail.length - 1].time > POINT_LIFESPAN) {
        trail.pop();
      }

      // Draw the trailing ribbon
      if (trail.length > 1) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];

          // Ratio along the trail (1 at head, 0 at tail)
          const ratio = 1 - i / trail.length;

          // Time decay factor
          const age = time - p1.time;
          const life = Math.max(0, 1 - age / POINT_LIFESPAN);

          const strokeWidth = (isHovering ? 1.4 + ratio * 3.8 : 0.9 + ratio * 3.0) * Math.min(1, life * 1.3);
          const alpha = Math.max(0, ratio * life * 0.88);

          if (alpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = `rgba(242, 246, 255, ${alpha})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
            ctx.shadowBlur = ratio * 7;
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0;
      }

      // Draw bright glowing tip point
      if (mouse.isVisible) {
        const headX = trail.length > 0 ? trail[0].x : mouse.x;
        const headY = trail.length > 0 ? trail[0].y : mouse.y;
        const dotRadius = isHovering ? 4.8 : 3.4;

        // Outer soft glow
        ctx.beginPath();
        ctx.arc(headX, headY, dotRadius * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fill();

        // Core solid white point
        ctx.beginPath();
        ctx.arc(headX, headY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cursor-ribbon-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
