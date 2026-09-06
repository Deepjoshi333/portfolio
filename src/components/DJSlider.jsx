import { useEffect, useRef } from 'react';

export default function DJSlider() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let currentX = 0;
    let currentAngle = 0;
    let currentSkew = 0;
    let currentScale = 1;

    let targetX = 0;
    let targetAngle = 0;
    let targetSkew = 0;
    let targetScale = 1;

    let lastScrollY = window.scrollY;
    let scrollVel = 0;
    let isScrolling = false;
    let idleTimer = null;

    // Mouse parallax offset
    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Calculate section-based path
    const updateTargets = () => {
      const sy = window.scrollY;
      const winH = window.innerHeight;
      const winW = window.innerWidth;

      // Section positions (falling back to height multiples if elements loading)
      const getTop = (id, fallback) => {
        const sec = document.querySelector(id);
        return sec ? sec.offsetTop : fallback;
      };

      const heroTop = 0;
      const aboutTop = getTop('#about', winH);
      const workTop = getTop('#work', winH * 2);
      const qualTop = getTop('#qualification', winH * 4.5);
      const skillsTop = getTop('#skills', winH * 5.5);
      const contactTop = getTop('#contact', winH * 6.5);

      // Section keypoints: subtle, elegant drift without high rotations
      const points = [
        { top: heroTop, x: 0, rot: 0, scale: 1.0 },
        { top: aboutTop, x: winW * 0.22, rot: 2.2, scale: 0.96 },
        { top: workTop, x: -winW * 0.22, rot: -2.8, scale: 1.02 },
        { top: qualTop, x: winW * 0.18, rot: 1.8, scale: 0.97 },
        { top: skillsTop, x: -winW * 0.16, rot: -1.8, scale: 1.0 },
        { top: contactTop, x: 0, rot: 0, scale: 1.06 },
      ];

      // Find where scrollY is between points
      if (sy <= points[0].top) {
        targetX = points[0].x;
        targetAngle = points[0].rot;
        targetScale = points[0].scale;
      } else if (sy >= points[points.length - 1].top) {
        const last = points[points.length - 1];
        targetX = last.x;
        targetAngle = last.rot;
        targetScale = last.scale;
      } else {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          if (sy >= p1.top && sy <= p2.top) {
            const rawT = (sy - p1.top) / Math.max(1, p2.top - p1.top);
            // Smooth cosine easing
            const t = 0.5 - 0.5 * Math.cos(rawT * Math.PI);
            targetX = p1.x + (p2.x - p1.x) * t;
            targetAngle = p1.rot + (p2.rot - p1.rot) * t;
            targetScale = p1.scale + (p2.scale - p1.scale) * t;
            break;
          }
        }
      }
    };

    const onScroll = () => {
      const sy = window.scrollY;
      scrollVel = sy - lastScrollY;
      lastScrollY = sy;
      isScrolling = true;

      el.classList.add('active');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isScrolling = false;
        el.classList.remove('active');
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let rafId;
    const animate = () => {
      updateTargets();

      // Gentle, subtle velocity additions — no excessive spinning
      const clampedVel = Math.max(-15, Math.min(15, scrollVel));
      const velocityAngle = clampedVel * -0.15;
      const velocitySkew = clampedVel * -0.08;

      const finalTargetAngle = targetAngle + (isScrolling ? velocityAngle : 0);
      const finalTargetSkew = isScrolling ? velocitySkew : 0;

      // Mouse smoothing
      currentMouseX += (mouseX - currentMouseX) * 0.05;
      currentMouseY += (mouseY - currentMouseY) * 0.05;

      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.07;
      currentAngle += (finalTargetAngle - currentAngle) * 0.08;
      currentSkew += (finalTargetSkew - currentSkew) * 0.10;
      currentScale += (targetScale - currentScale) * 0.07;

      el.style.transform = [
        `translate(-50%, -50%)`,
        `translate3d(${currentX + currentMouseX}px, ${currentMouseY}px, 0)`,
        `rotate(${currentAngle}deg)`,
        `skewX(${currentSkew}deg)`,
        `scale(${currentScale})`,
      ].join(' ');

      scrollVel *= 0.85; // Decay velocity
      rafId = requestAnimationFrame(animate);
    };

    // Initial position
    updateTargets();
    currentX = targetX;
    currentAngle = targetAngle;
    currentScale = targetScale;
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div id="dj-slider" ref={containerRef} aria-hidden="true">
      <span id="dj-slider-text" ref={textRef}>
        DJ
      </span>
    </div>
  );
}
