import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={`skill-item ${inView ? 'animated' : ''}`}
      style={{ '--pct-w': `${skill.pct}%` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct">{skill.pct}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <motion.p
        className="section-eyebrow"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Core Competencies
      </motion.p>
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Technical<br /><span className="o">Arsenal</span>
      </motion.h2>

      <div className="skills-grid">
        {portfolio.skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </section>
  );
}
