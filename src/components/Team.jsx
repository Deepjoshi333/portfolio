import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaBullhorn, FaChartLine, FaPalette } from 'react-icons/fa6';

const TEAM_MEMBERS = [
  {
    id: 'DE',
    code: 'TEAM-01',
    initials: 'DJ',
    name: 'Deep Joshi',
    role: 'Business Development Executive (BDE)',
    tagline: 'Connecting client needs with practical technical solutions.',
    bio: 'Computer Engineering student and Business Development Executive with experience in technical sales, client communication, lead generation, and digital marketing.',
    skills: ['Lead Generation', 'Client Relations', 'Technical Consulting', 'Digital Marketing'],
    badge: 'BUSINESS DEVELOPMENT',
    department: 'Business Development · Technical Consulting',
    icon: FaBullhorn,
  },
  {
    id: 'RU',
    code: 'TEAM-02',
    initials: 'RD',
    name: 'Rudra Dodiya',
    role: 'Content Creator & UI/UX Designer',
    tagline: 'Content creation, user experience, and visual design.',
    bio: 'Creates engaging digital content and designs clear, user-friendly interface experiences.',
    skills: ['Content Creation', 'UI/UX Design', 'Visual Design', 'Creative Thinking'],
    badge: 'CONTENT & DESIGN',
    department: 'Content Creation · UI/UX',
    icon: FaPalette,
  },
  {
    id: 'GO',
    code: 'TEAM-03',
    initials: 'GC',
    name: 'Gopal Chudasama',
    role: 'SEO Specialist',
    tagline: 'Helping websites become easier to discover online.',
    bio: 'Focuses on search engine optimization and improving website visibility in search results.',
    skills: ['SEO', 'Keyword Research', 'On-Page Optimization', 'Search Visibility'],
    badge: 'SEARCH OPTIMIZATION',
    department: 'SEO · Digital Growth',
    icon: FaChartLine,
  },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const member = TEAM_MEMBERS[activeTab];
  const IconComponent = member.icon;

  const selectMember = (index) => {
    if (index === activeTab) return;
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const moveMember = (step) => {
    setDirection(step);
    setActiveTab((current) => (
      (current + step + TEAM_MEMBERS.length) % TEAM_MEMBERS.length
    ));
  };

  return (
    <section className="section team-cyber-section" id="team">
      <div className="team-cyber-glow" aria-hidden="true" />

      <motion.p
        className="section-eyebrow team-section-eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        // MEET THE TEAM
      </motion.p>

      <div className="team-header-row">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The <span className="o">Team</span>
        </motion.h2>

        <motion.nav
          className="team-tab-selector"
          aria-label="Select team member"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {TEAM_MEMBERS.map((teamMember, index) => (
            <button
              key={teamMember.id}
              type="button"
              className={`team-tab-btn ${index === activeTab ? 'active' : ''}`}
              aria-current={index === activeTab ? 'true' : undefined}
              onClick={() => selectMember(index)}
            >
              <span className="tab-btn-dot" />
              <span className="tab-btn-name">{teamMember.name}</span>
            </button>
          ))}
        </motion.nav>
      </div>

      <div className="team-carousel">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={member.id}
            className="team-id-card team-carousel-card"
            custom={direction}
            variants={{
              enter: (step) => ({ opacity: 0, x: step * 36 }),
              center: { opacity: 1, x: 0 },
              exit: (step) => ({ opacity: 0, x: step * -36 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: 'easeOut' }}
            aria-live="polite"
          >
            <div className="id-card-top-strip">
              <span className="id-org-tag">{member.badge}</span>
              <span className="id-badge-code">
                {String(activeTab + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="id-avatar-wrap">
              <div className="id-avatar-rings" />
              <div className="id-avatar-circle">
                <span className="id-initials">{member.initials}</span>
              </div>
              <div className="id-role-icon-badge" title={member.role}>
                <IconComponent />
              </div>
            </div>

            <div className="id-info-zone">
              <span className="id-security-badge">{member.department}</span>
              <h3 className="id-member-name">{member.name}</h3>
              <p className="id-member-role">{member.role}</p>
            </div>

            <div className="id-scan-line" aria-hidden="true" />
            <p className="team-member-tagline">{member.tagline}</p>
            <p className="id-member-bio">{member.bio}</p>

            <div className="id-skills-box">
              <span className="id-skills-label">FOCUS AREAS</span>
              <div className="id-skills-list">
                {member.skills.map((skill) => (
                  <span key={skill} className="id-skill-chip">{skill}</span>
                ))}
              </div>
            </div>

            <div className="id-card-footer">
              <div className="id-stats-badge">
                <span className="stats-dot" />
                <span>{member.code}</span>
              </div>
              <a
                href="#contact"
                className="id-collab-btn"
                onClick={(event) => {
                  event.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Connect</span>
                <FaArrowRight />
              </a>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="team-carousel-controls" aria-label="Team carousel controls">
          <button
            type="button"
            className="team-carousel-arrow"
            onClick={() => moveMember(-1)}
            aria-label="Previous team member"
          >
            <FaArrowLeft />
          </button>
          <span className="team-carousel-position" aria-live="polite">
            {String(activeTab + 1).padStart(2, '0')} <span>/ {String(TEAM_MEMBERS.length).padStart(2, '0')}</span>
          </span>
          <button
            type="button"
            className="team-carousel-arrow"
            onClick={() => moveMember(1)}
            aria-label="Next team member"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
