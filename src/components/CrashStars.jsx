import { useEffect, useRef } from 'react';
import { COLOR_PALETTES } from './ColorSwitcher';

export default function CrashStars() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 420);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // Dynamic accent RGB matching selected theme
    let activeRgb = '92, 245, 205';
    const savedTheme = localStorage.getItem('dj_accent_theme');
    if (savedTheme) {
      const found = COLOR_PALETTES.find((p) => p.id === savedTheme);
      if (found && found.rgb) activeRgb = found.rgb;
    }

    // Track scroll velocity to accelerate crash stars on scroll
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollBlinkBoost = 0;

    const onScroll = () => {
      const sy = window.scrollY;
      const dy = Math.abs(sy - lastScrollY);
      scrollVelocity = Math.min(dy * 0.35, 16);
      scrollBlinkBoost = Math.min(dy * 0.15, 4.0);
      lastScrollY = sy;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 5 to 6 Crash Stars (Shooting Stellar Comets) ──
    // Baseline speed is SLOW (0.4 - 0.8), but heavily accelerates on scroll!
    const NUM_CRASH_STARS = 6;
    const createCrashStar = (initial = false) => {
      const angle = Math.PI / 4 + (Math.random() * 0.3 - 0.15); // ~45 deg downward streak
      const slowBaseSpeed = Math.random() * 0.4 + 0.45; // Slow at idle
      const isAccent = Math.random() > 0.35;
      return {
        x: initial ? Math.random() * width : Math.random() * width * 1.3 - width * 0.3,
        y: initial ? Math.random() * height : -20 - Math.random() * 100,
        vx: Math.cos(angle) * slowBaseSpeed,
        vy: Math.sin(angle) * slowBaseSpeed,
        length: Math.random() * 70 + 40,
        size: Math.random() * 1.6 + 1.2,
        opacity: Math.random() * 0.5 + 0.5,
        isAccent,
        hue: isAccent ? activeRgb : '255, 255, 255',
        delay: Math.random() * 60,
      };
    };

    const crashStars = Array.from({ length: NUM_CRASH_STARS }, () => createCrashStar(true));

    // ── Exactly 3 to 4 Shining & Blinking Stars ──
    const NUM_SHINE_STARS = 4;
    const shinePositions = [
      { x: 0.22, y: 0.25 },
      { x: 0.78, y: 0.30 },
      { x: 0.35, y: 0.72 },
      { x: 0.68, y: 0.78 },
    ];

    const shineStars = Array.from({ length: NUM_SHINE_STARS }, (_, i) => ({
      x: shinePositions[i].x * width,
      y: shinePositions[i].y * height,
      baseRadius: 2.2,
      phase: i * 1.5,
      speed: 0.035,
      isAccent: i % 2 === 0,
      hue: i % 2 === 0 ? activeRgb : '255, 255, 255',
    }));

    // Listen to theme color change events and update star hues immediately
    const onColorChange = (e) => {
      if (e.detail) {
        activeRgb = e.detail;
        crashStars.forEach((star) => {
          if (star.isAccent) star.hue = activeRgb;
        });
        shineStars.forEach((star) => {
          if (star.isAccent) star.hue = activeRgb;
        });
      }
    };
    window.addEventListener('accentColorChange', onColorChange);

    let rafId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth decay of scroll velocity
      scrollVelocity *= 0.92;
      scrollBlinkBoost *= 0.90;

      // ── 1. Draw 3-4 Shining & Blinking Stars with 4-Point Diffraction Spikes ──
      shineStars.forEach((star) => {
        star.phase += star.speed + scrollBlinkBoost * 0.06;
        const wave = Math.sin(star.phase);
        const brightness = Math.max(0, 0.3 + 0.7 * wave) * (1 + scrollBlinkBoost * 0.6);
        const alpha = Math.min(1, brightness);

        // Core glowing dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.baseRadius * (1 + scrollBlinkBoost * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.hue}, ${alpha * 0.95})`;
        ctx.shadowColor = `rgba(${star.hue}, ${alpha * 0.85})`;
        ctx.shadowBlur = 12 + scrollBlinkBoost * 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer ambient glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.baseRadius * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.hue}, ${alpha * 0.16})`;
        ctx.fill();

        // 4-point cross diffraction shine spikes
        if (alpha > 0.35) {
          const flareLen = (star.baseRadius * 10 + scrollBlinkBoost * 12) * alpha;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();

          // Subtle diagonal secondary spikes
          const diagLen = flareLen * 0.45;
          ctx.strokeStyle = `rgba(${star.hue}, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(star.x - diagLen, star.y - diagLen);
          ctx.lineTo(star.x + diagLen, star.y + diagLen);
          ctx.moveTo(star.x + diagLen, star.y - diagLen);
          ctx.lineTo(star.x - diagLen, star.y + diagLen);
          ctx.stroke();
        }
      });

      // ── 2. Draw 5-6 Crash Stars (Slow at idle, fast on scroll) ──
      crashStars.forEach((star) => {
        if (star.delay > 0) {
          star.delay -= 1 + scrollVelocity * 0.7;
          return;
        }

        // Speed multiplier: base speed is slow, scroll increases speed by up to 10-25x!
        const scrollBoost = 1 + scrollVelocity * 2.2;
        star.x += star.vx * scrollBoost;
        star.y += star.vy * scrollBoost;

        // Dynamic tail length expands as speed increases
        const dynamicLength = star.length * (1 + Math.min(scrollVelocity * 0.3, 1.8));

        // Tail position
        const tailX = star.x - (star.vx / (star.vx + star.vy)) * dynamicLength;
        const tailY = star.y - (star.vy / (star.vx + star.vy)) * dynamicLength;

        // Luminous streak gradient
        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.6, `rgba(${star.hue}, ${star.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = star.size * (1 + Math.min(scrollVelocity * 0.1, 0.8));
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Brilliant glowing crash head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowColor = `rgba(${star.hue}, 0.95)`;
        ctx.shadowBlur = 16 + scrollVelocity * 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Respawn when offscreen
        if (star.x > width + 100 || star.y > height + 100) {
          Object.assign(star, createCrashStar(false));
          star.delay = Math.random() * 40;
        }
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('accentColorChange', onColorChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="crash-stars-transparent-area" ref={containerRef}>
      <canvas ref={canvasRef} className="crash-stars-canvas" />
    </div>
  );
}
