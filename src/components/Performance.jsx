import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const counted = useRef(false);

  useEffect(() => {
    if (!inView || counted.current || !ref.current) return;
    counted.current = true;
    const el = ref.current;
    const target = parseInt(value);
    const duration = 1600;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const prog = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, suffix]);

  return (
    <div className="stat-value" ref={ref}>
      {value}{suffix}
    </div>
  );
}

function StatCard({ stat, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      translateY(-8px)
      rotateX(${-y * 14}deg)
      rotateY(${x * 14}deg)
    `;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  // Parse the value: e.g. "50+" → number=50, suffix="+"
  const raw = stat.value;
  const match = raw.match(/(\d+)([%+]*)/);
  const numVal = match ? match[1] : '0';
  const suffix = match ? match[2] : '';

  return (
    <motion.div
      className="stat-card"
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedCounter value={numVal} suffix={suffix} />
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
}

export default function Performance() {
  return (
    <section id="performance">
      <motion.p
        className="section-tag"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        Numbers
      </motion.p>
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Perform<span className="accent">ance</span>
      </motion.h2>
      <div className="stats-grid">
        {portfolio.stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
