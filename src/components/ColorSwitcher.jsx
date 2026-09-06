import { useState, useEffect } from 'react';

export const COLOR_PALETTES = [
  {
    id: 'teal',
    label: 'Cyber Teal',
    hex: '#5CF5CD',
    rgb: '92, 245, 205',
    dim: 'rgba(92, 245, 205, 0.12)',
    glow: 'rgba(92, 245, 205, 0.25)',
  },
  {
    id: 'violet',
    label: 'Cosmic Violet',
    hex: '#A78BFA',
    rgb: '167, 139, 250',
    dim: 'rgba(167, 139, 250, 0.14)',
    glow: 'rgba(167, 139, 250, 0.28)',
  },
  {
    id: 'amber',
    label: 'Solar Amber',
    hex: '#FF9E42',
    rgb: '255, 158, 66',
    dim: 'rgba(255, 158, 66, 0.14)',
    glow: 'rgba(255, 158, 66, 0.28)',
  },
  {
    id: 'rose',
    label: 'Neon Rose',
    hex: '#FF5E97',
    rgb: '255, 94, 151',
    dim: 'rgba(255, 94, 151, 0.14)',
    glow: 'rgba(255, 94, 151, 0.28)',
  },
];

export default function ColorSwitcher() {
  const [activeColor, setActiveColor] = useState('teal');

  const applyColor = (palette) => {
    setActiveColor(palette.id);
    document.documentElement.style.setProperty('--teal', palette.hex);
    document.documentElement.style.setProperty('--teal-dim', palette.dim);
    document.documentElement.style.setProperty('--border-glow', palette.glow);
    document.documentElement.style.setProperty('--teal-glow', palette.glow);
    document.documentElement.style.setProperty('--accent-rgb', palette.rgb);
    localStorage.setItem('dj_accent_theme', palette.id);
    window.dispatchEvent(new CustomEvent('accentColorChange', { detail: palette.rgb }));
  };

  useEffect(() => {
    const saved = localStorage.getItem('dj_accent_theme');
    if (saved) {
      const match = COLOR_PALETTES.find((p) => p.id === saved);
      if (match) applyColor(match);
    }
  }, []);

  return (
    <div className="color-switcher-pill" aria-label="Theme Color Options">
      <span className="color-switcher-label">Color:</span>
      <div className="color-swatches">
        {COLOR_PALETTES.map((p) => (
          <button
            key={p.id}
            className={`color-swatch-btn ${activeColor === p.id ? 'active' : ''}`}
            style={{ '--swatch-hex': p.hex }}
            title={p.label}
            aria-label={p.label}
            onClick={() => applyColor(p)}
          >
            <span className="swatch-inner" />
          </button>
        ))}
      </div>
    </div>
  );
}
