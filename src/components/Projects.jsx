import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
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
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // Floating image preview state following cursor on hover
  const [hoveredProject, setHoveredProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Measure track width to compute exact scroll distance and height
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const paddingOffset = winW > 768 ? winW * 0.14 : winW * 0.08;
        const dist = Math.max(0, trackW - winW + paddingOffset);
        setDistance(dist);
        // Pinned height = exactly 1 viewport sticky view + horizontal travel distance
        // This eliminates the major bottom gap and transitions smoothly at the last card
        setSectionHeight(winH + dist);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Track vertical scroll inside the pinned container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { damping: 25, stiffness: 110, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = portfolio.projects.length;
    const current = Math.min(total, Math.max(1, Math.ceil(latest * total) || 1));
    setActiveIndex(current);
  });

  // Card 3D tilt & cursor tracking
  const onCardMove = useCallback((e, card, proj) => {
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
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
      ref={targetRef}
      className="projects-pinned-section"
      id="work"
      style={{ height: sectionHeight ? `${sectionHeight}px` : '220vh' }}
    >
      <div className="projects-sticky">
        {/* Header */}
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
              Selected<br />
              <span className="o">Projects</span>
            </motion.h2>
          </div>

          <div className="work-count">
            <span>
              {String(activeIndex).padStart(2, '0')} / {String(portfolio.projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div className="projects-track-wrap">
          <motion.div ref={trackRef} className="projects-track" style={{ x }}>
            {portfolio.projects.map((proj, i) => (
              <div
                className="project-card"
                key={i}
                onMouseMove={(e) => onCardMove(e, e.currentTarget, proj)}
                onMouseLeave={(e) => onCardLeave(e.currentTarget)}
              >
                <div className="project-num">
                  <span>
                    {String(i + 1).padStart(2, '0')} / {String(portfolio.projects.length).padStart(2, '0')}
                  </span>
                  <div className="project-arrow">↗</div>
                </div>

                <div className="project-fa-icon">
                  {PROJECT_ICONS[proj.iconKey] || <FaRocket />}
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>

                <div className="project-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Low-Opacity Image Following Cursor on Card Hover */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="project-cursor-preview"
              style={{
                left: cursorPos.x + -130,
                top: cursorPos.y + 0,
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <img
                src={hoveredProject.image}
                alt={hoveredProject.title}
                className="project-preview-img"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar + scroll hint */}
        <div className="projects-progress-row">
          <p className="projects-hint">
            <span>Scroll</span> to navigate reel →
          </p>

          <div className="projects-progress-line">
            <motion.div
              className="projects-progress-fill"
              style={{ scaleX: scrollYProgress }}
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
