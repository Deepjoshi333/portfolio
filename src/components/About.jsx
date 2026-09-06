import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CrashStars from './CrashStars';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function AnimatedCounter({ rawValue }) {
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = rawValue.match(/(\d+)([%+]*)/);
    if (!match) { el.textContent = rawValue; return; }
    const num = parseInt(match[1]);
    const suffix = match[2];

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered.current) return;
      triggered.current = true;
      const dur = 1800;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * num) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.disconnect();
    }, { threshold: 0.5 });
    obs.observe(el);
    el.textContent = '0' + suffix;
    return () => obs.disconnect();
  }, [rawValue]);

  return <div className="about-stat-val" ref={ref}>{rawValue}</div>;
}

const TAGS = ['Creative Thinker', 'Problem Solver', 'UI Perfectionist', 'Motion Designer', 'Open Source'];

export default function About() {
  return (
    <section className="section" id="about">
      <motion.p className="section-eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: .7 }}>
        Who I am
      </motion.p>
      <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: .7, delay: .1 }}>
        About<br /><span className="o">Me</span>
      </motion.h2>

      <div className="about-grid">
        {/* Cosmic Crash Stars & Blinking Lights Visual */}
        <motion.div
          className="about-visual-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9 }}
        >
          <CrashStars />
        </motion.div>

        {/* Text */}
        <motion.div className="about-body" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} transition={{ duration: .9, delay: .2 }}>
          <p>{portfolio.about}</p>
          <p>Currently exploring design systems, motion interfaces, and AI-driven experiences — delivering polished solutions that balance aesthetics with engineering precision.</p>
          <div className="about-tags stagger" style={{ marginTop: '2rem' }}>
            {TAGS.map(t => <span key={t} className="about-tag">{t}</span>)}
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div className="about-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, delay: .3 }}>
        {portfolio.stats.map((s, i) => (
          <div className="about-stat" key={i}>
            <AnimatedCounter rawValue={s.value} />
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
