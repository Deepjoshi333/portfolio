import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

export default function Hero() {
  const wordsRef = useRef([]);

  // Mouse-parallax 3D tilt on name
  useEffect(() => {
    const onMove = (e) => {
      if (window.innerWidth < 768) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      wordsRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = i === 0 ? 6 : 3;
        el.style.transform = `perspective(900px) rotateX(${-cy * depth}deg) rotateY(${cx * depth}deg)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollDown = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split name into two lines for huge display
  const nameParts = portfolio.name.split(' ');

  return (
    <section className="hero" id="home">
      <motion.p
        className="hero-label"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Creative Developer & Digital Architect
      </motion.p>

      <h1 className="hero-name" aria-label={portfolio.name}>
        <motion.span
          ref={el => wordsRef.current[0] = el}
          className="outline"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {nameParts[0]}
        </motion.span>
        <motion.span
          ref={el => wordsRef.current[1] = el}
          className="outline-teal"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {nameParts[1]}
        </motion.span>
      </h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        Blending <em>design & technology</em> to craft<br />
        immersive digital experiences.
      </motion.p>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <a href="#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({behavior:'smooth'}); }}>
          View Work ↗
        </a>
        <a href="#contact" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}); }}>
          Let's Talk
        </a>
      </motion.div>

      {/* HUD index */}
      <motion.div
        className="hero-index"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        01 / Home
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
