import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

export default function Hero() {
  const leftWingRef = useRef(null);

  // Subtle mouse-parallax on the left wing
  useEffect(() => {
    const onMove = (e) => {
      if (window.innerWidth < 768 || !leftWingRef.current) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 12;
      const cy = (e.clientY / window.innerHeight - 0.5) * 12;
      leftWingRef.current.style.transform = `translate3d(${cx * 0.4}px, ${cy * 0.4}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Subtle radial cyan-blue beam focused behind 3D badge */}
      <div className="hero-badge-spotlight" aria-hidden="true" />

      {/* ── Left Wing: Clean, Punchy Typography (No overlap with 3D ID Badge) ── */}
      <div className="hero-left-wing" ref={leftWingRef}>
        <motion.div
          className="hero-status-pill"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="hero-status-dot" />
          <span>BUSINESS DEVELOPMENT // TECHNICAL SOLUTIONS</span>
        </motion.div>

        <h1 className="hero-display-title">
          <motion.span
            className="hero-title-line line-dim"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            BUSINESS
          </motion.span>
          <motion.span
            className="hero-title-line line-blue"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            &amp; TECHNICAL
          </motion.span>
          <motion.span
            className="hero-title-line line-stroke"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            CONSULTANT
          </motion.span>
        </h1>

        <motion.div
          className="hero-dept-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          <span className="hero-dept-bracket">[</span>
          <span className="hero-dept-text">{portfolio.degree} · {portfolio.institution}</span>
          <span className="hero-dept-bracket">]</span>
        </motion.div>

        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Combining technical knowledge with <em>client-focused consulting</em> to
          connect business needs with practical web and software solutions.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
        >
          <a
            href="#work"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Explore Work ↗</span>
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Let's Talk</span>
          </a>
        </motion.div>

        {/* Micro Telemetry Tags */}
        <motion.div
          className="hero-left-telemetry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="telemetry-item">
            <span className="t-key">LOC:</span> {portfolio.location.toUpperCase()}
          </span>
          <span className="telemetry-separator">/</span>
          <span className="telemetry-item">
            <span className="t-key">FOCUS:</span> WEB SOLUTIONS &amp; CLIENT GROWTH
          </span>
        </motion.div>
      </div>

      {/* ── Right Wing: High-Tech Telemetry HUD Framing 3D Card ── */}
      <motion.aside
        className="hero-right-hud"
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        aria-label="Student ID Credential HUD"
      >
        <div className="hero-hud-card">
          <div className="hero-hud-card-header">
            <span className="hud-card-label">DIGITAL SPECIMEN</span>
            <span className="hud-card-id">GMIU · CE</span>
          </div>

          <div className="hero-hud-body">
            <div className="hud-row">
              <span className="hud-row-k">NAME</span>
              <span className="hud-row-v">{portfolio.name}</span>
            </div>
            <div className="hud-row">
              <span className="hud-row-k">ROLE</span>
              <span className="hud-row-v">{portfolio.tagline}</span>
            </div>
            <div className="hud-row">
              <span className="hud-row-k">INSTITUTE</span>
              <span className="hud-row-v">{portfolio.institution}</span>
            </div>
            <div className="hud-row">
              <span className="hud-row-k">CLEARANCE</span>
              <span className="hud-row-v clearance-v">LEAD GENERATION // WEB SOLUTIONS</span>
            </div>
          </div>

          {/* Interactive 3D Scroll Rotation Cue */}
          <div className="hero-hud-cue">
            <div className="hud-cue-radar">
              <span className="hud-radar-pulse" />
            </div>
            <div className="hud-cue-text">
              <strong>INTERACTIVE 3D BADGE</strong>
              <span>Scroll down to rotate 360°</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* ── Scroll Indicator HUD (Bottom Center) ── */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="hero-scroll-track">
          <div className="hero-scroll-dot" />
        </div>
        <span className="hero-scroll-text">SCROLL DOWN</span>
      </motion.div>
    </section>
  );
}
