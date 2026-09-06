import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setFeedback("✓ Message received! I'll get back to you shortly.");
    e.target.reset();
    setTimeout(() => setFeedback(''), 5000);
  }, []);

  return (
    <section className="section" id="contact">
      <motion.p
        className="section-eyebrow"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Initialize Contact
      </motion.p>
      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Get In<br /><span className="o">Touch</span>
      </motion.h2>

      <div className="contact-grid">
        {/* Left column */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-big">
            Let's create something <em>extraordinary</em> together.
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon">✉</div>
            <span>{portfolio.email}</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon">📞</div>
            <span>{portfolio.phone}</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>
            <span>{portfolio.location}</span>
          </div>
        </motion.div>

        {/* Right column: Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="form-field">
            <input
              type="text"
              id="cf-name"
              name="name"
              placeholder="Your Name"
              required
              autoComplete="name"
            />
          </div>
          <div className="form-field">
            <input
              type="email"
              id="cf-email"
              name="email"
              placeholder="Your Email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              id="cf-subject"
              name="subject"
              placeholder="Subject / Project Scope"
              required
            />
          </div>
          <div className="form-field">
            <textarea
              id="cf-message"
              name="message"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Transmit Message →
          </button>

          {feedback && <div className="form-feedback">{feedback}</div>}
        </motion.form>
      </div>
    </section>
  );
}
