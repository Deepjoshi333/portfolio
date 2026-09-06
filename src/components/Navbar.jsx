import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  // Live clock for HUD
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClick = useCallback((e, href) => {
    e.preventDefault();
    scrollTo(href);
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Top-Left Logo ── */}
      <div className="hud hud-tl">
        <a
          className="hud-logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span>D</span>J
        </a>
      </div>

      {/* ── Top-Right Nav + Hamburger ── */}
      <div className="hud hud-tr" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul className="hud-nav">
          {NAV_ITEMS.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={(e) => handleClick(e, n.href)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="hud-hamburger"
          aria-label="Menu"
          onClick={() => setMobileOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Bottom-Left status ── */}
      <div className="hud hud-bl">
        <div className="hud-status">Available for work</div>
      </div>

      {/* ── Bottom-Right meta (arstraumur-style) ── */}
      <div className="hud hud-br">
        <div className="hud-meta">
          <span>{time}</span>
          <br />
          India · IST
          <br />
          DEEP JOSHI · v2026
        </div>
      </div>

      {/* ── Mobile Overlay ── */}
      <nav className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <button
          className="mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>
        {NAV_ITEMS.map((n) => (
          <a key={n.href} href={n.href} onClick={(e) => handleClick(e, n.href)}>
            {n.label}
          </a>
        ))}
      </nav>
    </>
  );
}
