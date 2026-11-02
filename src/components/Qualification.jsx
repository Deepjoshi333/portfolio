import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Qualification() {
  const leftItems = portfolio.qualifications.filter((_, i) => i % 2 === 0);
  const rightItems = portfolio.qualifications.filter((_, i) => i % 2 === 1);

  return (
    <section className="section" id="qualification">
      <motion.p
        className="section-eyebrow"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Work &amp; Education
      </motion.p>
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Experience &amp;<br /><span className="o">Education</span>
      </motion.h2>

      <div className="timeline-wrap">
        {/* Left Column */}
        <div className="tl-col">
          {leftItems.map((q, i) => (
            <motion.div
              className="tl-card"
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="tl-year">{q.year}</div>
              <h3 className="tl-title">{q.title}</h3>
              <span className="tl-org">{q.org}</span>
              <p className="tl-desc">{q.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Center glowing line */}
        <div className="timeline-line" />

        {/* Right Column */}
        <div className="tl-col right">
          {rightItems.map((q, i) => (
            <motion.div
              className="tl-card"
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.1 }}
            >
              <div className="tl-year">{q.year}</div>
              <h3 className="tl-title">{q.title}</h3>
              <span className="tl-org">{q.org}</span>
              <p className="tl-desc">{q.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
