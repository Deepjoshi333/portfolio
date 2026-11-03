import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaDiscord,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
} from 'react-icons/fa';
import { FaXTwitter, FaCode, FaLightbulb } from 'react-icons/fa6';
import {
  SiBehance,
  SiDribbble,
  SiGitlab,
  SiMedium,
  SiPinterest,
  SiReddit,
  SiSnapchat,
  SiStackoverflow,
  SiThreads,
  SiTiktok,
} from 'react-icons/si';
import { portfolio } from '../data/portfolio';

const INITIAL_LIKES = 214;
const MAX_CLICKS = 5;
const LIKES_ENDPOINT = '/.netlify/functions/likes';

const SOCIAL_ICONS = {
  GITHUB: <FaGithub />,
  LINKEDIN: <FaLinkedinIn />,
  TWITTER: <FaXTwitter />,
  INSTAGRAM: <FaInstagram />,
  LEETCODE: <FaCode />,
  DISCORD: <FaDiscord />,
  FACEBOOK: <FaFacebookF />,
  YOUTUBE: <FaYoutube />,
  WHATSAPP: <FaWhatsapp />,
  TELEGRAM: <FaTelegramPlane />,
  TIKTOK: <SiTiktok />,
  THREADS: <SiThreads />,
  SNAPCHAT: <SiSnapchat />,
  PINTEREST: <SiPinterest />,
  MEDIUM: <SiMedium />,
  BEHANCE: <SiBehance />,
  DRIBBBLE: <SiDribbble />,
  REDDIT: <SiReddit />,
  STACK_OVERFLOW: <SiStackoverflow />,
  GITLAB: <SiGitlab />,
  EMAIL: <FaEnvelope />,
};

export default function Footer() {
  const [likes, setLikes] = useState(INITIAL_LIKES);
  const [userClicks, setUserClicks] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isLikesLoading, setIsLikesLoading] = useState(true);
  const [isLikePending, setIsLikePending] = useState(false);
  const [likeError, setLikeError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadLikes = async () => {
      try {
        const response = await fetch(LIKES_ENDPOINT);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load likes.');

        if (!cancelled) {
          setLikes(data.likes);
        }
      } catch (error) {
        console.error('Unable to load shared portfolio likes:', error);
        if (!cancelled) {
          setLikeError(error.message || 'Could not load the shared like count. Please refresh to try again.');
        }
      } finally {
        if (!cancelled) setIsLikesLoading(false);
      }
    };

    loadLikes();
    return () => { cancelled = true; };
  }, []);

  const handleLike = async () => {
    if (isLikePending || userClicks >= MAX_CLICKS) return;

    setIsLikePending(true);
    setLikeError('');
    try {
      const response = await fetch(LIKES_ENDPOINT, {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not save your like.');

      setLikes(data.likes);
      setUserClicks((clicks) => clicks + 1);
      const id = Date.now() + Math.random();
      setFloatingHearts((prev) => [...prev, { id, x: (Math.random() - 0.5) * 40 }]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
      }, 900);
    } catch (error) {
      console.error('Unable to save portfolio like:', error);
      setLikeError(error.message || 'Could not save your like. Please try again.');
    } finally {
      setIsLikePending(false);
    }
  };

  const [lampOn, setLampOn] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);

  const toggleLamp = (e) => {
    if (e) e.stopPropagation();
    if (isFlickering) return;
    if (!lampOn) {
      setIsFlickering(true);
      setTimeout(() => {
        setIsFlickering(false);
        setLampOn(true);
      }, 750);
    } else {
      setLampOn(false);
    }
  };

  // Starts at 50% (half filled). With each of the 5 clicks, increases by 10% up to 100% (fully filled).
  const fillPct = userClicks === 0 ? 50 : 50 + userClicks * 10;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    if (!lampOn && !isFlickering) {
      setIsFlickering(true);
      setTimeout(() => {
        setIsFlickering(false);
        setLampOn(true);
      }, 750);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-talk-layout">
      {/* ── Top Bar: Copyright & Back to Top ── */}
      <div className="footer-talk-top">
        <span className="footer-talk-copy">© {new Date().getFullYear()}</span>
        <button
          className="footer-back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <span className="back-to-top-circle">↑</span>
        </button>
      </div>

      {/* ── Centerpiece: HAVE A PROJECT IN MIND? LET'S TALK with Lamp at bottom of text ── */}
      <div className="footer-talk-center">
        <motion.p
          className="footer-talk-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          HAVE A PROJECT IN MIND?
        </motion.p>

        <motion.a
          href="#contact"
          onClick={scrollToContact}
          className={`footer-talk-headline ${lampOn ? 'tube-on' : ''} ${isFlickering ? 'tube-flicker' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          title="Click to get in touch"
        >
          LET'S TALK
        </motion.a>

        <div className="footer-lamp-bottom-bar">
          <button
            type="button"
            className={`footer-lamp-btn ${lampOn ? 'lamp-on' : ''} ${isFlickering ? 'lamp-flicker' : ''}`}
            onClick={toggleLamp}
            aria-label="Toggle fluorescent tube light"
            title={lampOn ? "Turn off lamp" : "Click to illuminate"}
          >
            <FaLightbulb className="footer-lamp-icon" />
            <span className="footer-lamp-label">
              {lampOn ? 'TUBE LIGHT ON' : 'ILLUMINATE'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Bottom Bar: Social Media Pills & Heart Like & Right Corner (Color Switcher + Credits) ── */}
      <div className="footer-talk-bottom">
        {/* Left: Social Media Pill Buttons with FontAwesome Icons */}
        <div className="footer-talk-socials">
          {portfolio.social.map((s) => {
            const icon = SOCIAL_ICONS[s.label];
            if (!icon) return null;

            if (!s.url.trim()) {
              return (
                <span
                  key={s.label}
                  className="footer-social-placeholder"
                  title={`Add your ${s.label} URL in src/data/portfolio.js`}
                  aria-label={`${s.label} URL not added yet`}
                >
                  {icon}
                </span>
              );
            }

            return (
              <a
                key={s.label}
                href={s.url}
                className="footer-social-pill"
                target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={s.label}
                title={s.label}
              >
                <span className="social-fa-icon">{icon}</span>
                <span>{s.label}</span>
              </a>
            );
          })}
        </div>

        {/* Center: Interactive Heart Clapper Button */}
        <div className="footer-like-wrap">
          <button
            className={`footer-like-btn ${userClicks >= MAX_CLICKS ? 'maxed' : ''}`}
            onClick={handleLike}
            disabled={isLikesLoading || isLikePending || userClicks >= MAX_CLICKS}
            aria-label={`Like website. Current count: ${likes}`}
            title={
              likeError || (userClicks >= MAX_CLICKS
                ? 'Thank you for your support! (Max 5 likes reached)'
                : `Like this portfolio (${userClicks}/${MAX_CLICKS})`)
            }
          >
            <svg
              className="heart-svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
              style={{
                filter:
                  userClicks > 0
                    ? `drop-shadow(0 0 ${4 + userClicks * 2}px rgba(255, 51, 102, 0.7))`
                    : 'drop-shadow(0 0 4px rgba(255, 51, 102, 0.3))',
              }}
            >
              <defs>
                <linearGradient id="heartFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF3366" />
                  <stop offset={`${fillPct}%`} stopColor="#FF3366" />
                  <stop offset={`${fillPct}%`} stopColor="rgba(255, 255, 255, 0.18)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.18)" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#heartFillGrad)"
                stroke={userClicks >= MAX_CLICKS ? '#FF3366' : 'rgba(255, 255, 255, 0.45)'}
                strokeWidth="1.2"
              />
            </svg>

            <span className="like-count">{likes}</span>
            <span className="like-progress-badge">{userClicks}/5</span>

            {/* Floating Heart Particles */}
            <AnimatePresence>
              {floatingHearts.map((h) => (
                <motion.span
                  key={h.id}
                  className="floating-heart"
                  initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, x: h.x * 1.5, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  ♥
                </motion.span>
              ))}
            </AnimatePresence>
          </button>
          {likeError && <span className="like-error" role="status">{likeError}</span>}
        </div>

        {/* Right Bottom Corner: Studio Credits */}
        <div className="footer-bottom-right">
          <div className="footer-talk-credits">
            <span>Design by <strong>The Avgxy Design Studio</strong></span>
            <span>Development by <strong>Deep Joshi</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
