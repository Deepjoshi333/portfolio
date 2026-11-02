import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import {
  FaRocket,
  FaComments,
  FaLayerGroup,
  FaBagShopping,
  FaChartLine,
  FaCompass,
} from 'react-icons/fa6';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const PROJECT_ICONS = {
  rocket: <FaRocket />,
  chat: <FaComments />,
  cube: <FaLayerGroup />,
  cart: <FaBagShopping />,
  chart: <FaChartLine />,
  compass: <FaCompass />,
};

export default function Projects() {
  const sectionRef  = useRef(null);
  const viewportRef = useRef(null);
  const trackRef    = useRef(null);
  const progressRef = useRef(null);
  const dimsRef     = useRef({ scrollDist: 0 });

  const [activeIndex,    setActiveIndex]    = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos,      setCursorPos]      = useState({ x: 0, y: 0 });

  /* ── JS-driven pinning & horizontal scroll ─────────────────────
     Uses position:fixed / position:absolute instead of CSS sticky,
     so parent overflow:hidden cannot break it.
  ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const section  = sectionRef.current;
    const viewport = viewportRef.current;
    const track    = trackRef.current;
    const fill     = progressRef.current;
    if (!section || !viewport || !track || !fill) return;

    /* Measure track width → compute scroll distance & section height */
    const measure = () => {
      const trackW = track.scrollWidth;
      const winW   = window.innerWidth;
      const winH   = window.innerHeight;
      const padL   = winW * (winW > 768 ? 0.07 : 0.04);
      // How far the track must translate so the last card is visible
      const d = Math.max(0, trackW + padL - winW);
      dimsRef.current.scrollDist = d;
      // Section height = scroll distance + viewport height (for pin hold)
      section.style.height = `${d + winH}px`;
    };

    /* On every scroll tick, compute pin state + horizontal translate */
    const update = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const d    = dimsRef.current.scrollDist;

      if (rect.top > 0) {
        /* ── Before pin: section hasn't reached top ── */
        viewport.className = 'projects-sticky projects-pin-before';
        track.style.transform = 'translate3d(0,0,0)';
        fill.style.transform  = 'scaleX(0)';
        setActiveIndex(1);
      } else if (rect.bottom <= winH) {
        /* ── After pin: section has scrolled past ── */
        viewport.className = 'projects-sticky projects-pin-after';
        track.style.transform = `translate3d(${-d}px,0,0)`;
        fill.style.transform  = 'scaleX(1)';
        setActiveIndex(portfolio.projects.length);
      } else {
        /* ── Pinned: lock viewport, slide track ── */
        viewport.className = 'projects-sticky projects-pin-active';
        const scrolled = -rect.top;
        const p = d > 0 ? Math.min(1, Math.max(0, scrolled / d)) : 0;
        track.style.transform = `translate3d(${-d * p}px,0,0)`;
        fill.style.transform  = `scaleX(${p})`;
        const total = portfolio.projects.length;
        setActiveIndex(Math.min(total, Math.max(1, Math.ceil(p * total) || 1)));
      }
    };

    measure();
    update();

    /* Re-measure after fonts/images load */
    const t1 = setTimeout(() => { measure(); update(); }, 200);
    const t2 = setTimeout(() => { measure(); update(); }, 800);

    const onResize = () => { measure(); update(); };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ── Card 3-D tilt on hover ── */
  const onCardMove = useCallback((e, card, proj) => {
    const r  = card.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width  - 0.5;
    const ny = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `rotateX(${-ny * 10}deg) rotateY(${nx * 10}deg) translateZ(10px)`;
    setCursorPos({ x: e.clientX, y: e.clientY });
    setHoveredProject(proj);
  }, []);

  const onCardLeave = useCallback((card) => {
    card.style.transform = '';
    setHoveredProject(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="projects-pinned-section"
    >
      {/* Viewport — JS toggles between relative / fixed / absolute */}
      <div ref={viewportRef} className="projects-sticky projects-pin-before">

        {/* ── Header ── */}
        <div className="work-header">
          <div>
            <motion.p
              className="section-eyebrow"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              What I've Built
            </motion.p>
            <motion.h2
              className="section-title"
              style={{ marginBottom: 0 }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Selected<br /><span className="o">Projects</span>
            </motion.h2>
          </div>

          <div className="work-count">
            <span>
              {String(activeIndex).padStart(2, '0')} /{' '}
              {String(portfolio.projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Horizontal track ── */}
        <div className="projects-track-wrap">
          <div ref={trackRef} className="projects-track">
            {portfolio.projects.map((proj, i) => (
              <div
                key={i}
                className="project-card"
                onMouseMove={(e) => onCardMove(e, e.currentTarget, proj)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
              >
                <div className="project-num">
                  <span>
                    {String(i + 1).padStart(2, '0')} /{' '}
                    {String(portfolio.projects.length).padStart(2, '0')}
                  </span>
                  <div className="project-arrow">↗</div>
                </div>

                <div className="project-fa-icon">
                  {PROJECT_ICONS[proj.iconKey] || <FaRocket />}
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p  className="project-desc">{proj.desc}</p>

                <div className="project-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>

                <a
                  className="project-link"
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${proj.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit project ↗
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Floating cursor image preview ── */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="project-cursor-preview"
              style={{ left: cursorPos.x - 130, top: cursorPos.y }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <img
                src={hoveredProject.hoverImage}
                alt={hoveredProject.title}
                className="project-preview-img"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Progress row ── */}
        <div className="projects-progress-row">
          <p className="projects-hint"><span>Scroll</span> to navigate reel →</p>

          <div className="projects-progress-line">
            <div
              ref={progressRef}
              className="projects-progress-fill"
            />
          </div>

          <p className="projects-hint">
            <span>{portfolio.projects.length}</span> works
          </p>
        </div>
      </div>
    </section>
  );
}
