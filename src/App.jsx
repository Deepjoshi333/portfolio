import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import StarField from './components/StarField';
import DJSlider from './components/DJSlider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Qualification from './components/Qualification';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
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
      const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight);
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
      <CustomCursor />
      <StarField />
      <DJSlider />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Qualification />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
