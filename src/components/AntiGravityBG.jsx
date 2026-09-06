import { useEffect, useRef } from 'react';
import { djItems } from '../data/portfolio';

export default function AntiGravityBG() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const phaseRef = useRef(djItems.map((_, i) => i * 0.7));

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', onMouseMove);

    let rafId;
    const animate = (timestamp) => {
      const t = timestamp / 1000;
      const sy = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const m = mouseRef.current;

      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const item = djItems[i];
        const speed = item[6];
        const rot = item[5];
        const amp = item[7];
        const period = item[8];
        const phase = phaseRef.current[i];

        const parallaxY = -sy * speed;
        const floatY = Math.sin((t + phase) * (Math.PI * 2 / period)) * amp;
        const floatX = Math.cos((t + phase + 1.5) * (Math.PI * 2 / (period * 1.3))) * amp * 0.4;
        const mouseScale = isMobile ? 0 : speed * 26;
        const mouseOffX = m.x * mouseScale;
        const mouseOffY = m.y * mouseScale * 0.6;
        const dynRot = rot + Math.sin((t + phase) * 0.8) * 3;

        el.style.transform = [
          `translateY(${parallaxY + floatY + mouseOffY}px)`,
          `translateX(${floatX + mouseOffX}px)`,
          `rotate(${dynRot}deg)`
        ].join(' ');
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="ag-bg" ref={containerRef} aria-hidden="true">
      {djItems.map((item, i) => {
        const [size, opacity, blur, topVh, left, rot] = item;
        return (
          <span
            key={i}
            className="ag-dj"
            ref={el => itemRefs.current[i] = el}
            style={{
              fontSize: `${size}px`,
              opacity,
              filter: `blur(${blur}px)`,
              top: `${topVh}vh`,
              left: `${left}%`,
              transform: `rotate(${rot}deg)`,
            }}
          >
            DJ
          </span>
        );
      })}
    </div>
  );
}
