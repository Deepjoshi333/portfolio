import { useCallback, useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import StarField from './components/StarField';
import DJSlider from './components/DJSlider';
import Navbar from './components/Navbar';
import ScrollFilm from './components/ScrollFilm';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Qualification from './components/Qualification';
import Team from './components/Team';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolio } from './data/portfolio';

function LoadingScreen({ loading, onRetry }) {
  const progress = loading.failed > 0
    ? Math.min(99, Math.floor((loading.loaded / loading.total) * 100))
    : Math.floor((loading.loaded / loading.total) * 100);
  return (
    <div className="portfolio-loading-screen" role="status" aria-live="polite">
      <div className="cyber-loader-ambient" aria-hidden="true" />
      <div className="frame-loader-card">
        <div className="frame-loader-header">
          <span className="cyber-loader-tag">
            <span className="cyber-pulse-dot" />
            LOADING PORTFOLIO
          </span>
          <span className="cyber-loader-id">{portfolio.shortname} · 2026</span>
        </div>
        <div className="frame-loader-info">
          <span className="frame-loader-mark">DJ</span>
          <div>
            <h1 className="frame-loader-name">{portfolio.name}</h1>
            <p className="frame-loader-subtitle">Preparing your experience</p>
          </div>
        </div>
        <div className="frame-loader-track-wrap">
          <div
            className="frame-loader-track"
            role="progressbar"
            aria-label="Portfolio frame loading progress"
            aria-valuemin={0}
            aria-valuemax={loading.total}
            aria-valuenow={loading.loaded}
          >
            <div
              className="frame-loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="frame-loader-meta">
            <span className="frame-loader-status">
              {loading.failed > 0
                ? `${loading.failed} FRAME${loading.failed === 1 ? '' : 'S'} FAILED TO LOAD`
                : 'LOADING FRAME SEQUENCE'}
            </span>
            <span className="frame-loader-count">
              {loading.loaded}<span> / {loading.total} FRAMES</span>
            </span>
          </div>
        </div>
        {loading.failed > 0 && (
          <button className="frame-loader-retry" type="button" onClick={onRetry}>
            Retry failed frames
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState({ loaded: 0, total: 900, failed: 0 });
  const [retryKey, setRetryKey] = useState(0);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);
  const handleRetry = useCallback(() => setRetryKey((key) => key + 1), []);

  // Ensure default clean cyber blue accent matching student ID badge
  useEffect(() => {
    localStorage.removeItem('dj_accent_theme');
    document.documentElement.style.setProperty('--teal', '#0090FF');
    document.documentElement.style.setProperty('--teal-dim', 'rgba(0, 144, 255, 0.14)');
    document.documentElement.style.setProperty('--border-glow', 'rgba(0, 144, 255, 0.38)');
    document.documentElement.style.setProperty('--teal-glow', 'rgba(0, 144, 255, 0.28)');
    document.documentElement.style.setProperty('--accent-rgb', '0, 144, 255');

  }, []);

  // Inertia smooth scroll on desktop (Jesper Landberg feel)
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let sTarget = window.scrollY;
    let sCurrent = window.scrollY;
    let sRafId = null;
    const EASE = 0.085;

    function smoothStep() {
      sCurrent += (sTarget - sCurrent) * EASE;
      if (Math.abs(sTarget - sCurrent) < 0.3) {
        sCurrent = sTarget;
        window.scrollTo(0, sCurrent);
        sRafId = null;
        return;
      }
      window.scrollTo(0, sCurrent);
      sRafId = requestAnimationFrame(smoothStep);
    }

    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * (e.deltaMode === 1 ? 24 : 1);
      sTarget += delta * 0.95;
      const maxScroll = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight);
      sTarget = Math.max(0, Math.min(sTarget, maxScroll));
      sCurrent = window.scrollY;
      if (!sRafId) sRafId = requestAnimationFrame(smoothStep);
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - sCurrent) > 2) {
        sTarget = window.scrollY;
        sCurrent = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      if (sRafId) cancelAnimationFrame(sRafId);
    };
  }, []);

  return (
    <>
      <ScrollFilm
        onProgress={setLoading}
        onLoadComplete={handleLoadingComplete}
        retryKey={retryKey}
      />

      {isLoading ? (
        <LoadingScreen loading={loading} onRetry={handleRetry} />
      ) : (
        <>
          <CustomCursor />
          <StarField />
          <DJSlider />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Projects />
            <Qualification />
            <Team />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
