import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function SkillCard({ group, index }) {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="skill-header">
        <h3 className="skill-name">{group.name}</h3>
      </div>
      <div className="skill-tag-list">
        {group.items.map((item) => (
          <span className="skill-tag" key={item}>{item}</span>
        ))}
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
        Business · Technical · Languages
      </motion.p>
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Skills &amp;<br /><span className="o">Interests</span>
      </motion.h2>

      <div className="skills-grid">
        {portfolio.skillGroups.map((group, i) => (
          <SkillCard key={group.name} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
