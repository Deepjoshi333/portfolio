<?php
/**
 * Deep Joshi — Anti-Gravity 3D Portfolio
 * Author  : Deep Joshi (DJ)
 * Version : 1.0
 * Stack   : PHP · HTML · CSS · JavaScript (pure, no frameworks)
 */

// ──────────────── PORTFOLIO DATA ────────────────
$portfolio = [
    "name"       => "DEEP JOSHI",
    "shortname"  => "DJ",
    "tagline"    => "Creative Developer",
    "about"      => "I am a passionate creative developer blending design and technology to craft immersive digital experiences. I thrive at the intersection of art and code.",
    "email"      => "deep@example.com",
    "phone"      => "+91 98765 43210",
    "location"   => "India",

    // ── Qualifications ──
    "qualifications" => [
        [
            "year"  => "2024",
            "title" => "B.Tech Computer Science",
            "org"   => "Example University",
            "desc"  => "Specialization in Software Engineering & UX Design"
        ],
        [
            "year"  => "2022",
            "title" => "Full-Stack Certification",
            "org"   => "Online Academy",
            "desc"  => "PHP, JavaScript, Node.js, React & Database Systems"
        ],
        [
            "year"  => "2020",
            "title" => "HSC – Science",
            "org"   => "State Board",
            "desc"  => "PCM with Computer Science · 92%"
        ],
    ],

    // ── Performance / Stats ──
    "stats" => [
        ["value" => "50+",  "label" => "Projects Delivered"],
        ["value" => "3+",   "label" => "Years Experience"],
        ["value" => "98%",  "label" => "Client Satisfaction"],
        ["value" => "12+",  "label" => "Technologies"],
    ],

    // ── Projects ──
    "projects" => [
        [
            "title" => "VisiFlow SaaS",
            "tags"  => ["PHP", "AI", "SaaS"],
            "desc"  => "AI-powered visiting-card scanner & CRM platform with real-time business-card parsing.",
            "icon"  => "🚀"
        ],
        [
            "title" => "Lost & Found Chat",
            "tags"  => ["Groq API", "AI", "Chat"],
            "desc"  => "Groq-LLM backed item-matching chat UI with semantic search and smart notifications.",
            "icon"  => "🔍"
        ],
        [
            "title" => "3D Portfolio",
            "tags"  => ["Three.js", "GSAP", "CSS3D"],
            "desc"  => "Anti-gravity immersive personal portfolio with layered parallax & glassmorphism cards.",
            "icon"  => "🌌"
        ],
        [
            "title" => "E-Commerce Suite",
            "tags"  => ["PHP", "MySQL", "JS"],
            "desc"  => "Full-featured e-commerce solution with real-time inventory and Razorpay integration.",
            "icon"  => "🛒"
        ],
        [
            "title" => "Data Dashboard",
            "tags"  => ["Python", "Chart.js", "REST"],
            "desc"  => "Interactive analytics dashboard with live chart updates and exportable reports.",
            "icon"  => "📊"
        ],
        [
            "title" => "AR Navigation App",
            "tags"  => ["AR.js", "Maps", "JS"],
            "desc"  => "Browser-based AR indoor navigation app using WebXR and SVG floor-plan overlays.",
            "icon"  => "🗺️"
        ],
    ],

    // ── Skills ──
    "skills" => [
        ["name" => "HTML / CSS",     "pct" => 95],
        ["name" => "JavaScript",     "pct" => 90],
        ["name" => "PHP / Laravel",  "pct" => 85],
        ["name" => "UI / UX Design", "pct" => 88],
        ["name" => "MySQL",          "pct" => 82],
        ["name" => "Three.js / GSAP","pct" => 75],
        ["name" => "React / Vue",    "pct" => 78],
        ["name" => "Python / AI",    "pct" => 70],
    ],

    // ── Social Links ──
    "social" => [
        ["label" => "GitHub",   "icon" => "GH", "url" => "#"],
        ["label" => "LinkedIn", "icon" => "LI", "url" => "#"],
        ["label" => "Twitter",  "icon" => "TW", "url" => "#"],
        ["label" => "Behance",  "icon" => "BE", "url" => "#"],
    ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="description" content="<?= htmlspecialchars($portfolio['name']) ?> — <?= htmlspecialchars($portfolio['tagline']) ?>. Personal portfolio showcasing projects, skills and experience."/>
<title><?= htmlspecialchars($portfolio['name']) ?> · Portfolio</title>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

<style>
/* ═══════════════════════════════════════════════════
   TOKENS & RESET
═══════════════════════════════════════════════════ */
:root{
  --bg:       #040D12;
  --primary:  #183D3D;
  --accent:   #5C8374;
  --light:    #93B1A6;
  --white:    #E8F4F1;
  --glass:    rgba(24,61,61,.35);
  --glass-b:  rgba(92,131,116,.12);
  --border:   rgba(147,177,166,.15);

  --ff-head:  'Outfit', sans-serif;
  --ff-body:  'Space Grotesk', sans-serif;

  --nav-h:    72px;
  --r-card:   18px;
  --trans:    .4s cubic-bezier(.25,.8,.25,1);
}

*, *::before, *::after{ box-sizing:border-box; margin:0; padding:0; }

html{ scroll-behavior:smooth; font-size:16px; }

body{
  background:var(--bg);
  color:var(--light);
  font-family:var(--ff-body);
  overflow-x:hidden;
  cursor:none;              /* custom cursor */
}

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════ */
#cursor-dot,#cursor-ring{
  position:fixed;
  border-radius:50%;
  pointer-events:none;
  z-index:9999;
  transform:translate(-50%,-50%);
  transition:opacity .3s;
}
#cursor-dot{
  width:8px; height:8px;
  background:var(--accent);
}
#cursor-ring{
  width:36px; height:36px;
  border:2px solid rgba(92,131,116,.6);
  transition:width .2s,height .2s,transform .1s;
  mix-blend-mode:screen;
}

/* ═══════════════════════════════════════════════════
   ANTI-GRAVITY BACKGROUND LAYER
   — position:absolute so it spans the FULL page
   — each DJ element lives at a unique absolute position
   — JS parallax moves each at a different speed,
     creating depth layers that cover every section
═══════════════════════════════════════════════════ */
#ag-bg{
  position:absolute;   /* NOT fixed — stretches with full doc height */
  top:0; left:0;
  width:100%;
  height:100%;         /* fills the entire scrollable document */
  z-index:0;
  pointer-events:none;
  overflow:hidden;
}
/* Wrapper so the body/html correctly reports scrollHeight */
body{ position:relative; }

.ag-dj{
  position:absolute;
  font-family:var(--ff-head);
  font-weight:900;
  text-transform:uppercase;
  /* Multi-layer gradient: accent → primary, changes with depth */
  background:linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  will-change:transform;
  user-select:none;
  letter-spacing:.08em;
  /* Individual opacity & blur set inline */
  transition:none;
}

/* ═══════════════════════════════════════════════════
   HORIZONTAL DJ SLIDER
   — ONE large DJ text fixed on screen
   — Slides LEFT as you scroll DOWN, RIGHT as you scroll UP
   — Tilt angle responds to scroll direction/velocity
   — Positioned vertically at the center of the viewport
   — Appears behind all content (z-index:0)
═══════════════════════════════════════════════════ */
#dj-slider{
  position:fixed;
  top:50%;                     /* vertically centered in viewport */
  left:0;
  width:100vw;
  pointer-events:none;
  z-index:0;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:visible;
  transform:translateY(-50%);  /* vertical centering */
}

#dj-slider-text{
  font-family:var(--ff-head);
  font-weight:900;
  font-size:clamp(14vw, 22vw, 32vw);  /* massive, responsive */
  text-transform:uppercase;
  letter-spacing:-.02em;
  line-height:1;
  user-select:none;
  will-change:transform;
  white-space:nowrap;

  /* Outline only — premium hollow look, doesn’t obscure content */
  color:transparent;
  -webkit-text-stroke:1.5px rgba(92,131,116,.22);

  /* Soft glow that intensifies on scroll */
  filter:drop-shadow(0 0 40px rgba(92,131,116,.06));
  transition:filter .4s ease, -webkit-text-stroke .4s ease;

  /* Translate applied by JS */
  transform:translateX(0px) rotate(0deg);
}

/* While the user is actively scrolling — glow boost */
#dj-slider-text.active{
  filter:drop-shadow(0 0 80px rgba(92,131,116,.20));
  -webkit-text-stroke:1.5px rgba(147,177,166,.40);
}

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
#navbar{
  position:fixed;
  top:0; left:0; right:0;
  height:var(--nav-h);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 5%;
  z-index:1000;
  transition:background .4s,backdrop-filter .4s;
}
#navbar.scrolled{
  background:rgba(4,13,18,.75);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
}
.nav-logo{
  font-family:var(--ff-head);
  font-weight:900;
  font-size:1.6rem;
  letter-spacing:.12em;
  color:var(--white);
  text-decoration:none;
  perspective:400px;
}
.nav-logo span{ color:var(--accent); }

.nav-links{ display:flex; gap:2.2rem; list-style:none; }
.nav-links a{
  font-size:.85rem;
  font-weight:500;
  color:var(--light);
  text-decoration:none;
  letter-spacing:.08em;
  text-transform:uppercase;
  position:relative;
  transition:color var(--trans);
}
.nav-links a::after{
  content:'';
  position:absolute;
  bottom:-4px; left:0;
  width:0; height:2px;
  background:var(--accent);
  transition:width var(--trans);
}
.nav-links a:hover{ color:var(--white); }
.nav-links a:hover::after{ width:100%; }

#hamburger{
  display:none;
  flex-direction:column;
  gap:5px;
  cursor:pointer;
  padding:4px;
}
#hamburger span{
  display:block;
  width:26px; height:2px;
  background:var(--light);
  border-radius:2px;
  transition:var(--trans);
}

/* ═══════════════════════════════════════════════════
   SECTION WRAPPER
═══════════════════════════════════════════════════ */
section{
  position:relative;
  z-index:1;
  padding:120px 8% 80px;
}
.section-tag{
  font-size:.78rem;
  letter-spacing:.3em;
  text-transform:uppercase;
  color:var(--accent);
  margin-bottom:1rem;
  display:flex;
  align-items:center;
  gap:.7rem;
}
.section-tag::before{
  content:'';
  display:inline-block;
  width:30px; height:1px;
  background:var(--accent);
}
.section-title{
  font-family:var(--ff-head);
  font-size:clamp(2.2rem,5vw,3.8rem);
  font-weight:900;
  color:var(--white);
  line-height:1.1;
  perspective:600px;
}
.section-title .accent{ color:var(--accent); }

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
#home{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
  padding-top:var(--nav-h);
  padding-left:8%;
  padding-right:8%;
}

.hero-eyebrow{
  font-size:.8rem;
  letter-spacing:.35em;
  text-transform:uppercase;
  color:var(--accent);
  margin-bottom:1.5rem;
  opacity:0;
  animation:fadeUp .8s .3s forwards;
}

.hero-word{
  display:block;
  font-family:var(--ff-head);
  font-weight:900;
  text-transform:uppercase;
  line-height:1;
  color:var(--white);
}
.hero-word.welcome{
  font-size:clamp(3.5rem,10vw,9rem);
  letter-spacing:-.01em;
  text-shadow:
    0 0 60px rgba(92,131,116,.4),
    4px 8px 0 rgba(24,61,61,.6),
    8px 16px 0 rgba(4,13,18,.8);
  transform:perspective(800px) rotateX(8deg);
  transform-origin:bottom center;
  opacity:0;
  animation:hero3d .9s .5s cubic-bezier(.16,1,.3,1) forwards;
}
.hero-word.name{
  font-size:clamp(2.2rem,7vw,6rem);
  letter-spacing:.12em;
  color:transparent;
  -webkit-text-stroke:1.5px var(--accent);
  text-shadow:
    3px 6px 0 rgba(92,131,116,.25),
    6px 12px 0 rgba(24,61,61,.4);
  transform:perspective(800px) rotateX(8deg);
  transform-origin:bottom center;
  opacity:0;
  animation:hero3d .9s .7s cubic-bezier(.16,1,.3,1) forwards;
}

.hero-tagline{
  margin-top:2rem;
  font-size:clamp(1rem,2vw,1.3rem);
  color:var(--light);
  font-weight:300;
  letter-spacing:.05em;
  opacity:0;
  animation:fadeUp .8s 1s forwards;
}
.hero-tagline em{
  font-style:normal;
  color:var(--accent);
  font-weight:600;
}

.hero-cta{
  margin-top:3rem;
  display:flex;
  gap:1.2rem;
  flex-wrap:wrap;
  opacity:0;
  animation:fadeUp .8s 1.2s forwards;
}
.btn{
  padding:.85rem 2.2rem;
  border-radius:100px;
  font-size:.88rem;
  font-weight:600;
  letter-spacing:.08em;
  text-transform:uppercase;
  text-decoration:none;
  cursor:pointer;
  border:none;
  transition:var(--trans);
  position:relative;
  overflow:hidden;
}
.btn-primary{
  background:var(--accent);
  color:var(--bg);
}
.btn-primary::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.2),transparent 70%);
  transform:translateX(-100%);
  transition:transform .5s;
}
.btn-primary:hover::after{ transform:translateX(100%); }
.btn-primary:hover{ transform:translateY(-3px); box-shadow:0 10px 30px rgba(92,131,116,.4); }
.btn-outline{
  background:transparent;
  color:var(--light);
  border:1px solid var(--border);
}
.btn-outline:hover{
  background:var(--glass);
  border-color:var(--accent);
  color:var(--white);
  transform:translateY(-3px);
}

/* Scroll indicator */
.scroll-hint{
  position:absolute;
  bottom:3rem;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:.5rem;
  opacity:.5;
  font-size:.7rem;
  letter-spacing:.2em;
  text-transform:uppercase;
  animation:fadeUp 1s 1.8s forwards;
  opacity:0;
}
.scroll-hint .wheel{
  width:22px; height:36px;
  border:1.5px solid var(--light);
  border-radius:12px;
  display:flex;
  justify-content:center;
  padding-top:6px;
}
.scroll-hint .wheel::after{
  content:'';
  width:4px; height:8px;
  background:var(--accent);
  border-radius:2px;
  animation:scrollWheel 1.6s infinite;
}

/* ═══════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════ */
#about{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:6rem;
  align-items:center;
}
.about-visual{
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  height:380px;
}
.about-orb{
  width:260px; height:260px;
  border-radius:50%;
  background:radial-gradient(circle at 35% 35%, var(--accent), var(--primary) 60%, var(--bg));
  box-shadow:
    0 0 60px rgba(92,131,116,.3),
    inset 0 0 40px rgba(4,13,18,.5);
  animation:floatOrb 6s ease-in-out infinite;
  position:relative;
  z-index:1;
}
.about-orb-ring{
  position:absolute;
  border-radius:50%;
  border:1px solid rgba(147,177,166,.2);
  animation:expandRing 4s ease-in-out infinite;
}
.about-orb-ring:nth-child(2){ width:320px;height:320px;animation-delay:.5s; }
.about-orb-ring:nth-child(3){ width:380px;height:380px;animation-delay:1s; }
.about-orb-ring:nth-child(4){ width:440px;height:440px;animation-delay:1.5s; }

.about-initials{
  position:absolute;
  font-family:var(--ff-head);
  font-weight:900;
  font-size:5rem;
  color:rgba(147,177,166,.15);
  letter-spacing:.1em;
  top:50%; left:50%;
  transform:translate(-50%,-50%);
  z-index:2;
  pointer-events:none;
}

.about-text .section-title{ margin-bottom:1.5rem; }
.about-text p{
  line-height:1.9;
  color:var(--light);
  margin-bottom:1.2rem;
  font-size:.97rem;
}
.about-tags{
  display:flex;
  flex-wrap:wrap;
  gap:.6rem;
  margin-top:1.8rem;
}
.tag{
  padding:.4rem 1rem;
  border-radius:100px;
  background:var(--glass);
  border:1px solid var(--border);
  font-size:.78rem;
  letter-spacing:.05em;
  color:var(--light);
  backdrop-filter:blur(8px);
  transition:var(--trans);
}
.tag:hover{ border-color:var(--accent);color:var(--white); }

/* ═══════════════════════════════════════════════════
   QUALIFICATION SECTION
═══════════════════════════════════════════════════ */
#qualification{ max-width:780px; margin-inline:auto; }

.timeline{
  margin-top:3.5rem;
  position:relative;
  padding-left:2.5rem;
}
.timeline::before{
  content:'';
  position:absolute;
  left:.75rem; top:0; bottom:0;
  width:1px;
  background:linear-gradient(to bottom,transparent,var(--accent),transparent);
}
.tl-item{
  position:relative;
  margin-bottom:3rem;
  opacity:0;
  transform:translateX(-30px);
  transition:opacity .6s,transform .6s;
}
.tl-item.visible{ opacity:1; transform:translateX(0); }
.tl-dot{
  position:absolute;
  left:-2.1rem;
  top:.35rem;
  width:12px; height:12px;
  border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 12px rgba(92,131,116,.6);
}
.tl-year{
  font-size:.78rem;
  letter-spacing:.2em;
  color:var(--accent);
  text-transform:uppercase;
  margin-bottom:.5rem;
}
.tl-card{
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:var(--r-card);
  padding:1.4rem 1.8rem;
  backdrop-filter:blur(12px);
  transition:transform var(--trans),box-shadow var(--trans);
}
.tl-card:hover{
  transform:translateY(-4px);
  box-shadow:0 16px 40px rgba(4,13,18,.5);
}
.tl-card h3{
  font-family:var(--ff-head);
  font-size:1.1rem;
  font-weight:700;
  color:var(--white);
  margin-bottom:.3rem;
}
.tl-card span.org{
  font-size:.82rem;
  color:var(--accent);
  display:block;
  margin-bottom:.5rem;
}
.tl-card p{ font-size:.88rem; color:var(--light); }

/* ═══════════════════════════════════════════════════
   PERFORMANCE / STATS
═══════════════════════════════════════════════════ */
#performance{ text-align:center; }
.stats-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:1.5rem;
  margin-top:3.5rem;
}
.stat-card{
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:var(--r-card);
  padding:2.5rem 1.5rem;
  backdrop-filter:blur(14px);
  position:relative;
  overflow:hidden;
  transition:transform var(--trans),box-shadow var(--trans);
  transform-style:preserve-3d;
}
.stat-card::before{
  content:'';
  position:absolute;
  top:-50%; left:-50%;
  width:200%; height:200%;
  background:radial-gradient(circle at center,rgba(92,131,116,.08),transparent 60%);
  pointer-events:none;
}
.stat-card:hover{
  transform:translateY(-8px) rotateX(4deg) rotateY(-4deg);
  box-shadow:0 20px 50px rgba(4,13,18,.6);
}
.stat-value{
  font-family:var(--ff-head);
  font-size:3.2rem;
  font-weight:900;
  color:var(--white);
  line-height:1;
  margin-bottom:.5rem;
}
.stat-label{
  font-size:.82rem;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--accent);
}

/* ═══════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════ */
#projects .projects-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:1.8rem;
  margin-top:3.5rem;
}
.project-card{
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:var(--r-card);
  padding:2rem;
  backdrop-filter:blur(14px);
  position:relative;
  overflow:hidden;
  cursor:pointer;
  transition:transform var(--trans),box-shadow var(--trans),border-color var(--trans);
  transform-style:preserve-3d;
  opacity:0;
  transform:translateY(40px);
}
.project-card.visible{
  opacity:1;
  transform:translateY(0);
}
.project-card::before{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(135deg,rgba(92,131,116,.07) 0%,transparent 60%);
  pointer-events:none;
}
.project-card:hover{
  border-color:rgba(92,131,116,.5);
  box-shadow:0 24px 60px rgba(4,13,18,.7);
  transform:translateY(-8px) rotateX(3deg) rotateY(-3deg);
}
.project-icon{
  font-size:2.2rem;
  margin-bottom:1.2rem;
}
.project-title{
  font-family:var(--ff-head);
  font-size:1.2rem;
  font-weight:700;
  color:var(--white);
  margin-bottom:.7rem;
}
.project-desc{
  font-size:.88rem;
  line-height:1.75;
  color:var(--light);
  margin-bottom:1.2rem;
}
.project-tags{ display:flex; flex-wrap:wrap; gap:.5rem; }
.project-tag{
  padding:.3rem .8rem;
  border-radius:100px;
  background:rgba(92,131,116,.15);
  border:1px solid rgba(92,131,116,.25);
  font-size:.72rem;
  color:var(--accent);
  letter-spacing:.05em;
}
.project-arrow{
  position:absolute;
  top:1.5rem; right:1.5rem;
  font-size:1.2rem;
  color:var(--accent);
  opacity:0;
  transform:translateX(-6px);
  transition:var(--trans);
}
.project-card:hover .project-arrow{ opacity:1; transform:translateX(0); }

/* ═══════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════ */
#skills .skills-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:1.2rem;
  margin-top:3.5rem;
}
.skill-item{
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:var(--r-card);
  padding:1.4rem 1.8rem;
  backdrop-filter:blur(12px);
  opacity:0;
  transform:translateY(20px);
  transition:opacity .5s,transform .5s,box-shadow var(--trans);
}
.skill-item.visible{
  opacity:1;
  transform:translateY(0);
}
.skill-item:hover{ box-shadow:0 12px 30px rgba(4,13,18,.5); }
.skill-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:.8rem;
}
.skill-name{
  font-size:.92rem;
  font-weight:600;
  color:var(--white);
}
.skill-pct{
  font-size:.78rem;
  color:var(--accent);
  font-weight:600;
}
.skill-bar{
  height:4px;
  background:rgba(147,177,166,.12);
  border-radius:2px;
  overflow:hidden;
}
.skill-fill{
  height:100%;
  background:linear-gradient(90deg,var(--primary),var(--accent));
  border-radius:2px;
  width:0;
  transition:width 1.2s cubic-bezier(.25,.8,.25,1);
}

/* ═══════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════ */
#contact{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:5rem;
  align-items:start;
}
.contact-info h3{
  font-family:var(--ff-head);
  font-size:1.4rem;
  font-weight:700;
  color:var(--white);
  margin-bottom:1.5rem;
}
.contact-detail{
  display:flex;
  align-items:center;
  gap:1rem;
  margin-bottom:1.2rem;
  font-size:.92rem;
}
.contact-icon{
  width:40px; height:40px;
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1rem;
  flex-shrink:0;
}
.contact-form{
  display:flex;
  flex-direction:column;
  gap:1.2rem;
}
.form-group input,
.form-group textarea{
  width:100%;
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:12px;
  padding:1rem 1.2rem;
  color:var(--white);
  font-family:var(--ff-body);
  font-size:.92rem;
  backdrop-filter:blur(12px);
  transition:border-color var(--trans),box-shadow var(--trans);
  resize:none;
  outline:none;
}
.form-group input::placeholder,
.form-group textarea::placeholder{ color:rgba(147,177,166,.5); }
.form-group input:focus,
.form-group textarea:focus{
  border-color:var(--accent);
  box-shadow:0 0 0 3px rgba(92,131,116,.1);
}
.form-group textarea{ height:140px; }

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
footer{
  position:relative;
  z-index:1;
  text-align:center;
  padding:80px 8% 40px;
  border-top:1px solid var(--border);
  overflow:hidden;
}
.footer-name{
  font-family:var(--ff-head);
  font-size:clamp(3rem,9vw,8rem);
  font-weight:900;
  text-transform:uppercase;
  color:transparent;
  -webkit-text-stroke:1px rgba(147,177,166,.2);
  letter-spacing:.08em;
  line-height:1;
  perspective:600px;
  transform:perspective(800px) rotateX(12deg);
  transform-origin:bottom center;
  margin-bottom:3rem;
  display:inline-block;
  text-shadow:
    0 20px 40px rgba(4,13,18,.8),
    0 40px 80px rgba(4,13,18,.6);
}
.footer-socials{
  display:flex;
  justify-content:center;
  gap:1rem;
  margin-bottom:3rem;
}
.social-btn{
  width:48px; height:48px;
  background:var(--glass);
  border:1px solid var(--border);
  border-radius:12px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:.78rem;
  font-weight:700;
  color:var(--light);
  text-decoration:none;
  letter-spacing:.05em;
  backdrop-filter:blur(10px);
  transition:var(--trans);
}
.social-btn:hover{
  border-color:var(--accent);
  color:var(--white);
  background:rgba(92,131,116,.2);
  transform:translateY(-4px);
}
.footer-copy{
  font-size:.78rem;
  color:rgba(147,177,166,.4);
  letter-spacing:.1em;
}

/* ═══════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════ */
@keyframes fadeUp{
  from{ opacity:0; transform:translateY(20px); }
  to{   opacity:1; transform:translateY(0); }
}
@keyframes hero3d{
  from{ opacity:0; transform:perspective(800px) rotateX(30deg) translateY(30px); }
  to{   opacity:1; transform:perspective(800px) rotateX(8deg); }
}
@keyframes floatOrb{
  0%,100%{ transform:translateY(0) rotate(0deg); }
  50%{     transform:translateY(-18px) rotate(3deg); }
}
@keyframes expandRing{
  0%,100%{ opacity:.3; transform:scale(1); }
  50%{     opacity:.08; transform:scale(1.05); }
}
@keyframes scrollWheel{
  0%{ opacity:1; transform:translateY(0); }
  100%{ opacity:0; transform:translateY(10px); }
}
/* floatDJ handled fully by JS — no CSS keyframe needed */

/* ═══════════════════════════════════════════════════
   REVEAL UTILITY
═══════════════════════════════════════════════════ */
.reveal{
  opacity:0;
  transform:translateY(40px);
  transition:opacity .7s ease,transform .7s ease;
}
.reveal.visible{
  opacity:1;
  transform:translateY(0);
}

/* ═══════════════════════════════════════════════════
   MOBILE NAV OVERLAY
═══════════════════════════════════════════════════ */
#mobile-nav{
  display:none;
  position:fixed;
  inset:0;
  z-index:998;
  background:rgba(4,13,18,.95);
  backdrop-filter:blur(24px);
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:2.5rem;
}
#mobile-nav.open{ display:flex; }
#mobile-nav a{
  font-family:var(--ff-head);
  font-size:2rem;
  font-weight:700;
  color:var(--white);
  text-decoration:none;
  letter-spacing:.1em;
  text-transform:uppercase;
  transition:color var(--trans);
}
#mobile-nav a:hover{ color:var(--accent); }

/* ═══════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════ */
@media(max-width:900px){
  #about{ grid-template-columns:1fr; gap:2rem; }
  #contact{ grid-template-columns:1fr; gap:3rem; }
  .about-visual{ height:260px; }
  .about-orb{ width:180px; height:180px; }
  .about-orb-ring:nth-child(2){ width:240px;height:240px; }
  .about-orb-ring:nth-child(3){ width:290px;height:290px; }
  .about-orb-ring:nth-child(4){ display:none; }
}
@media(max-width:768px){
  section{ padding:100px 6% 60px; }
  .nav-links{ display:none; }
  #hamburger{ display:flex; }
  .hero-word.welcome{ font-size:clamp(2.5rem,12vw,5rem); }
  .hero-word.name{ font-size:clamp(1.6rem,8vw,3.5rem); }
  /* reduce parallax intensity on mobile — keep elements visible */
  .ag-dj{ will-change:auto; }
}
@media(max-width:480px){
  .stats-grid{ grid-template-columns:repeat(2,1fr); }
  #projects .projects-grid{ grid-template-columns:1fr; }
  #skills .skills-grid{ grid-template-columns:1fr; }
}
</style>
</head>
<body>

<!-- ── Custom Cursor ── -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>

<!-- ══════════════════════════════════════════════════
     ANTI-GRAVITY BACKGROUND
══════════════════════════════════════════════════ -->
<div id="ag-bg" aria-hidden="true">
<?php
/**
 * 28 DJ elements spread across the ENTIRE document height.
 *
 * Columns:
 *   [size_px, opacity, blur_px, top_vh (multiples of vh = real page %),
 *    left_percent, rotation_deg, parallax_speed, float_amplitude_px, float_period_s]
 *
 * parallax_speed key:
 *   0.0 → moves 1:1 with page (no parallax, just part of content)
 *   0.4 → moves at 40% of scroll speed (slow — appears distant)
 *   0.8 → moves at 80% of scroll speed (fast — appears close)
 *   1.0 → appears completely fixed on screen
 *
 * We store speed as data-speed; JS computes:
 *   translateY = -scrollY * speed  (so speed=0 → static, speed=1 → fixed)
 */
$dj_items = [
  // ── LAYER 1: Hero zone (0-14% of page) — deep background, huge & blurry
  [420, 0.025, 8,   3,   -5,  -8,  0.80, 18, 9.0],
  [160, 0.060, 2,   8,   80,  12,  0.55, 12, 7.5],
  [90,  0.090, 0,   12,  42,  -20, 0.30, 8,  6.0],

  // ── LAYER 2: About zone (15-28%)
  [260, 0.035, 5,   17,  -3,  15,  0.72, 20, 8.5],
  [120, 0.070, 1,   22,  65,  -6,  0.45, 10, 7.0],
  [380, 0.020, 9,   26,  50,  -30, 0.85, 22, 10.0],

  // ── LAYER 3: Qualification zone (29-42%)
  [200, 0.045, 3,   31,  14,  22,  0.60, 15, 7.8],
  [100, 0.080, 0,   36,  88,  -12, 0.35, 9,  6.5],
  [300, 0.030, 6,   40,  28,  -5,  0.75, 18, 9.2],

  // ── LAYER 4: Performance zone (43-56%)
  [140, 0.065, 2,   45,  -4,  -25, 0.50, 12, 7.2],
  [450, 0.018, 10,  49,  60,  10,  0.88, 25, 11.0],
  [80,  0.100, 0,   53,  38,  35,  0.25, 7,  5.5],

  // ── LAYER 5: Projects zone (57-70%)
  [340, 0.022, 7,   58,  -8,  -18, 0.78, 20, 9.5],
  [180, 0.055, 2,   62,  72,  8,   0.48, 14, 7.5],
  [110, 0.075, 1,   67,  25,  -32, 0.33, 10, 6.2],
  [240, 0.038, 4,   70,  92,  20,  0.65, 16, 8.0],

  // ── LAYER 6: Skills zone (71-83%)
  [500, 0.015, 12,  73,  30,  -10, 0.90, 28, 12.0],
  [130, 0.070, 1,   77,  -6,  28,  0.40, 11, 6.8],
  [280, 0.032, 5,   81,  58,  -15, 0.70, 18, 8.8],
  [90,  0.085, 0,   84,  10,  42,  0.28, 8,  5.8],

  // ── LAYER 7: Contact + Footer (84-100%)
  [360, 0.025, 7,   87,  75,  -22, 0.82, 22, 10.5],
  [150, 0.060, 2,   90,  40,  15,  0.52, 13, 7.3],
  [220, 0.040, 3,   93,  -5,  -8,  0.62, 16, 8.2],
  [480, 0.015, 11,  96,  55,  5,   0.88, 26, 11.5],

  // ── EXTRA floating accents — smaller, sharper, scattered
  [70,  0.100, 0,   20,  55,  -38, 0.22, 6,  5.2],
  [95,  0.085, 0,   44,  8,   50,  0.20, 7,  5.0],
  [75,  0.095, 0,   68,  82,  -45, 0.18, 6,  4.8],
  [85,  0.090, 0,   88,  32,  55,  0.15, 5,  4.5],
];
foreach($dj_items as $i => [$size, $opacity, $blur, $topVh, $left, $rot, $speed, $amp, $period]):
  /* top in VH units — JS will convert when it knows page height */
?>
  <span class="ag-dj"
    style="
      font-size:<?= $size ?>px;
      opacity:<?= $opacity ?>;
      filter:blur(<?= $blur ?>px);
      top:<?= $topVh ?>vh;
      left:<?= $left ?>%;
      transform:rotate(<?= $rot ?>deg);
    "
    data-speed="<?= $speed ?>"
    data-rot="<?= $rot ?>"
    data-amp="<?= $amp ?>"
    data-period="<?= $period ?>"
    data-index="<?= $i ?>"
  >DJ</span>
<?php endforeach; ?>
</div>

<!-- ══════════════════════════════════════════════════
     HORIZONTAL DJ SLIDER — 1 large DJ text
     Slides left/right with angle on scroll.
     Fixed to center of viewport, behind all content.
══════════════════════════════════════════════════ -->
<div id="dj-slider" aria-hidden="true">
  <span id="dj-slider-text">DJ</span>
</div>

<!-- ══════════════════════════════════════════════════
     NAVBAR
══════════════════════════════════════════════════ -->
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <a class="nav-logo" href="#home"><span>D</span>J</a>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#qualification">Qualification</a></li>
    <li><a href="#performance">Performance</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div id="hamburger" aria-label="Open menu" role="button" tabindex="0">
    <span></span><span></span><span></span>
  </div>
</nav>

<!-- Mobile Nav Overlay -->
<nav id="mobile-nav" role="navigation" aria-label="Mobile navigation">
  <a href="#home"          onclick="closeMobileNav()">Home</a>
  <a href="#about"         onclick="closeMobileNav()">About</a>
  <a href="#qualification" onclick="closeMobileNav()">Qualification</a>
  <a href="#performance"   onclick="closeMobileNav()">Performance</a>
  <a href="#projects"      onclick="closeMobileNav()">Projects</a>
  <a href="#skills"        onclick="closeMobileNav()">Skills</a>
  <a href="#contact"       onclick="closeMobileNav()">Contact</a>
</nav>

<!-- ══════════════════════════════════════════════════
     HERO
══════════════════════════════════════════════════ -->
<section id="home">
  <p class="hero-eyebrow">Hello, I'm</p>
  <h1>
    <span class="hero-word welcome">WELCOME</span>
    <span class="hero-word name"><?= htmlspecialchars($portfolio['name']) ?></span>
  </h1>
  <p class="hero-tagline">
    <em><?= htmlspecialchars($portfolio['tagline']) ?></em>
    &nbsp;·&nbsp; Crafting immersive digital experiences
  </p>
  <div class="hero-cta">
    <a href="#projects" class="btn btn-primary">View Projects</a>
    <a href="#contact"  class="btn btn-outline">Let's Talk</a>
  </div>
  <div class="scroll-hint" aria-hidden="true">
    <div class="wheel"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     ABOUT
══════════════════════════════════════════════════ -->
<section id="about">
  <div class="about-visual reveal">
    <div class="about-orb-ring"></div>
    <div class="about-orb-ring"></div>
    <div class="about-orb-ring"></div>
    <div class="about-orb"></div>
    <div class="about-initials"><?= htmlspecialchars($portfolio['shortname']) ?></div>
  </div>
  <div class="about-text reveal">
    <p class="section-tag">Who I am</p>
    <h2 class="section-title">About <span class="accent">Me</span></h2>
    <p><?= htmlspecialchars($portfolio['about']) ?></p>
    <p>Currently exploring the boundaries of design systems, motion interfaces, and AI-driven experiences while delivering polished solutions that balance aesthetics with engineering precision.</p>
    <div class="about-tags">
      <span class="tag">Creative Thinker</span>
      <span class="tag">Problem Solver</span>
      <span class="tag">UI Perfectionist</span>
      <span class="tag">Motion Designer</span>
      <span class="tag">Open Source Contributor</span>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     QUALIFICATION
══════════════════════════════════════════════════ -->
<section id="qualification">
  <p class="section-tag reveal">My Journey</p>
  <h2 class="section-title reveal">Qualific<span class="accent">ation</span></h2>
  <div class="timeline">
    <?php foreach($portfolio['qualifications'] as $q): ?>
    <div class="tl-item">
      <div class="tl-dot"></div>
      <p class="tl-year"><?= htmlspecialchars($q['year']) ?></p>
      <div class="tl-card">
        <h3><?= htmlspecialchars($q['title']) ?></h3>
        <span class="org"><?= htmlspecialchars($q['org']) ?></span>
        <p><?= htmlspecialchars($q['desc']) ?></p>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     PERFORMANCE
══════════════════════════════════════════════════ -->
<section id="performance">
  <p class="section-tag reveal">Numbers</p>
  <h2 class="section-title reveal">Perform<span class="accent">ance</span></h2>
  <div class="stats-grid">
    <?php foreach($portfolio['stats'] as $s): ?>
    <div class="stat-card reveal">
      <div class="stat-value"><?= htmlspecialchars($s['value']) ?></div>
      <div class="stat-label"><?= htmlspecialchars($s['label']) ?></div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     PROJECTS
══════════════════════════════════════════════════ -->
<section id="projects">
  <p class="section-tag reveal">What I've Built</p>
  <h2 class="section-title reveal">Selected <span class="accent">Projects</span></h2>
  <div class="projects-grid">
    <?php foreach($portfolio['projects'] as $p): ?>
    <div class="project-card">
      <span class="project-arrow">→</span>
      <div class="project-icon"><?= $p['icon'] ?></div>
      <h3 class="project-title"><?= htmlspecialchars($p['title']) ?></h3>
      <p class="project-desc"><?= htmlspecialchars($p['desc']) ?></p>
      <div class="project-tags">
        <?php foreach($p['tags'] as $t): ?>
        <span class="project-tag"><?= htmlspecialchars($t) ?></span>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     SKILLS
══════════════════════════════════════════════════ -->
<section id="skills">
  <p class="section-tag reveal">Expertise</p>
  <h2 class="section-title reveal">My <span class="accent">Skills</span></h2>
  <div class="skills-grid">
    <?php foreach($portfolio['skills'] as $sk): ?>
    <div class="skill-item" data-pct="<?= $sk['pct'] ?>">
      <div class="skill-header">
        <span class="skill-name"><?= htmlspecialchars($sk['name']) ?></span>
        <span class="skill-pct"><?= $sk['pct'] ?>%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill"></div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- ══════════════════════════════════════════════════
     CONTACT
══════════════════════════════════════════════════ -->
<section id="contact">
  <div class="contact-info reveal">
    <p class="section-tag">Get In Touch</p>
    <h2 class="section-title">Let's <span class="accent">Connect</span></h2>
    <p style="margin:1.2rem 0 2rem;line-height:1.9;font-size:.95rem;">Have a project in mind or just want to say hi? Drop a message and I'll get back to you within 24 hours.</p>
    <div class="contact-detail">
      <div class="contact-icon">✉</div>
      <span><?= htmlspecialchars($portfolio['email']) ?></span>
    </div>
    <div class="contact-detail">
      <div class="contact-icon">📞</div>
      <span><?= htmlspecialchars($portfolio['phone']) ?></span>
    </div>
    <div class="contact-detail">
      <div class="contact-icon">📍</div>
      <span><?= htmlspecialchars($portfolio['location']) ?></span>
    </div>
  </div>
  <form class="contact-form reveal" onsubmit="handleForm(event)">
    <div class="form-group">
      <input type="text" id="cf-name" name="name" placeholder="Your name" required autocomplete="name"/>
    </div>
    <div class="form-group">
      <input type="email" id="cf-email" name="email" placeholder="Your email" required autocomplete="email"/>
    </div>
    <div class="form-group">
      <input type="text" id="cf-subject" name="subject" placeholder="Subject"/>
    </div>
    <div class="form-group">
      <textarea id="cf-message" name="message" placeholder="Your message…" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary" style="align-self:flex-start">Send Message →</button>
    <p id="form-feedback" style="font-size:.85rem;color:var(--accent);display:none;"></p>
  </form>
</section>

<!-- ══════════════════════════════════════════════════
     FOOTER
══════════════════════════════════════════════════ -->
<footer>
  <div class="footer-name" aria-hidden="true"><?= htmlspecialchars($portfolio['name']) ?></div>
  <div class="footer-socials">
    <?php foreach($portfolio['social'] as $s): ?>
    <a href="<?= htmlspecialchars($s['url']) ?>" class="social-btn" aria-label="<?= htmlspecialchars($s['label']) ?>" target="_blank" rel="noopener"><?= htmlspecialchars($s['icon']) ?></a>
    <?php endforeach; ?>
  </div>
  <p class="footer-copy">© <?= date('Y') ?> <?= htmlspecialchars($portfolio['name']) ?> · All rights reserved · Crafted with ♥</p>
</footer>

<!-- ══════════════════════════════════════════════════
     JAVASCRIPT
══════════════════════════════════════════════════ -->
<script>
/* ─────────────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

// Ring follows with inertia
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// Grow ring on hovering interactive elements
document.querySelectorAll('a,button,.project-card,.stat-card,.tl-card,.skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '58px';
    ring.style.height = '58px';
    ring.style.borderColor = 'rgba(92,131,116,.9)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(92,131,116,.6)';
  });
});

/* ─────────────────────────────────────────────────
   2. NAVBAR — SCROLL BEHAVIOUR
───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─────────────────────────────────────────────────
   3. HAMBURGER / MOBILE NAV
───────────────────────────────────────────────── */
const ham      = document.getElementById('hamburger');
const mobileNav= document.getElementById('mobile-nav');

function closeMobileNav() { mobileNav.classList.remove('open'); }

ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
ham.addEventListener('keydown', e => { if(e.key==='Enter') mobileNav.classList.toggle('open'); });
mobileNav.addEventListener('click', e => { if(e.target===mobileNav) closeMobileNav(); });

/* ─────────────────────────────────────────────────
   4B. HORIZONTAL DJ SLIDER — scroll-driven left/right
   ─────────────────────────────────────────────────
   EFFECT:
   • 1 large “DJ” text fixed at vertical-center of viewport
   • Slides LEFT  as you scroll DOWN
   • Slides RIGHT as you scroll UP
   • The angle (skewX / rotate) tilts with scroll velocity:
       — fast scroll down  → leans left  (negative angle)
       — fast scroll up    → leans right (positive angle)
       — idle              → returns to 0° smoothly
   • Translation is proportional to scrollY (infinite range)
   • All values lerp to their target for a butter-smooth feel
───────────────────────────────────────────────── */
const djSliderText = document.getElementById('dj-slider-text');

// Slider state (all values lerped each frame)
let slider_x      = 0;   // rendered translateX px
let slider_angle  = 0;   // rendered rotate deg
let slider_skew   = 0;   // rendered skewX deg

let target_x      = 0;
let target_angle  = 0;
let target_skew   = 0;

// Scroll velocity tracking
let djLastScrollY  = window.scrollY;
let djScrollVel    = 0;
let djIdleTimer;
let djIsScrolling  = false;

// DJ starts 120vw off-screen to the RIGHT at scroll=0, slides left as user scrolls
const DJ_START_OFFSET_VW = 120;
const DJ_SCROLL_RATIO    = 0.55;

function djTargetX() {
  const startPx = (DJ_START_OFFSET_VW / 100) * window.innerWidth;
  return startPx - window.scrollY * DJ_SCROLL_RATIO;
}

window.addEventListener('scroll', () => {
  const sy    = window.scrollY;
  djScrollVel = sy - djLastScrollY;
  djLastScrollY = sy;
  djIsScrolling = true;

  clearTimeout(djIdleTimer);
  djIdleTimer = setTimeout(() => { djIsScrolling = false; }, 150);

  if (djSliderText) djSliderText.classList.add('active');
}, { passive: true });

// Init slider_x to correct off-screen position to avoid jump on first frame
slider_x = djTargetX();

/* ─────────────────────────────────────────────────
   4A. BACKGROUND DJ — PARALLAX + FLOAT VARIABLES
───────────────────────────────────────────────── */
const djItems = document.querySelectorAll('.ag-dj');
const djPhase = Array.from(djItems).map((_, i) => i * 0.7);

// Shared mouse parallax state
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

document.addEventListener('mousemove', e => {
  targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ═══════════════════════════════════════════════════
   MASTER ANIMATION LOOP
   • Handles: bg parallax + horizontal DJ slider
═══════════════════════════════════════════════════ */
let lastTime = 0;
function masterLoop(timestamp) {
  const dt = Math.min(timestamp - lastTime, 50);
  lastTime  = timestamp;

  mouseX += (targetMouseX - mouseX) * 0.06;
  mouseY += (targetMouseY - mouseY) * 0.06;

  const sy       = window.scrollY;
  const isMobile = window.innerWidth <= 768;
  const t        = timestamp / 1000;

  /* ══ 4A: Background parallax + float ══ */
  djItems.forEach((el, i) => {
    const speed  = parseFloat(el.dataset.speed)  || 0.3;
    const rot    = parseFloat(el.dataset.rot)    || 0;
    const amp    = parseFloat(el.dataset.amp)    || 12;
    const period = parseFloat(el.dataset.period) || 7.0;

    const parallaxY  = -sy * speed;
    const floatY     = Math.sin((t + djPhase[i]) * (Math.PI * 2 / period)) * amp;
    const floatX     = Math.cos((t + djPhase[i] + 1.5) * (Math.PI * 2 / (period * 1.3))) * amp * 0.4;
    const mouseScale = isMobile ? 0 : speed * 26;
    const mouseOffX  = mouseX * mouseScale;
    const mouseOffY  = mouseY * mouseScale * 0.6;
    const dynRot     = rot + Math.sin((t + djPhase[i]) * 0.8) * 3;

    el.style.transform = [
      `translateY(${parallaxY + floatY + mouseOffY}px)`,
      `translateX(${floatX + mouseOffX}px)`,
      `rotate(${dynRot}deg)`
    ].join(' ');
  });

  /* ══ 4B: Horizontal DJ Slider ══
     Formula:
       X position   = -(scrollY × 0.35)   → slides left as you scroll
       Tilt angle   = clamped velocity × -2.5 (lean with direction)
       SkewX        = clamped velocity × -1.2 (perspective slant)
     All lerped at 0.07–0.09 for smooth motion.
  ══════════════════════════════════════════ */
  if (djSliderText) {
    // Target X: start off-screen right, slide left as user scrolls
    target_x = djTargetX();

    // Tilt + skew driven by scroll velocity (±30 px/frame cap)
    const clampedVel = Math.max(-30, Math.min(30, djScrollVel));
    target_angle = clampedVel * -2.2;
    target_skew  = clampedVel * -1.0;

    // When idle, relax tilt back to 0
    if (!djIsScrolling) {
      target_angle = 0;
      target_skew  = 0;
      djSliderText.classList.remove('active');
    }

    // Buttery lerp — position slightly slower than angle for parallax feel
    const easePos   = 0.06;   // position ease (lower = smoother/slower)
    const easeAngle = 0.10;   // angle snaps back a bit faster
    slider_x     += (target_x     - slider_x)     * easePos;
    slider_angle += (target_angle - slider_angle) * easeAngle;
    slider_skew  += (target_skew  - slider_skew)  * easeAngle;

    djSliderText.style.transform = [
      `translateX(${slider_x}px)`,
      `rotate(${slider_angle}deg)`,
      `skewX(${slider_skew}deg)`
    ].join(' ');
  }

  // Reset per-frame velocity
  djScrollVel = 0;

  requestAnimationFrame(masterLoop);
}
requestAnimationFrame(masterLoop);

/* ─────────────────────────────────────────────────
   6. INTERSECTION OBSERVER — REVEAL ELEMENTS
───────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.reveal, .tl-item, .project-card, .skill-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // If it's a skill item, animate the bar
      if (entry.target.classList.contains('skill-item')) {
        const pct  = entry.target.dataset.pct;
        const fill = entry.target.querySelector('.skill-fill');
        setTimeout(() => { fill.style.width = pct + '%'; }, 150);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────────
   7. PROJECT CARD — 3D TILT ON MOUSE MOVE
───────────────────────────────────────────────── */
document.querySelectorAll('.project-card, .stat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `
      translateY(-8px)
      rotateX(${-y * 14}deg)
      rotateY(${ x * 14}deg)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─────────────────────────────────────────────────
   8. COUNTER ANIMATION — STAT CARDS
───────────────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1600;
  const step = timestamp => {
    if (!start) start = timestamp;
    const prog = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const valEl = entry.target.querySelector('.stat-value');
      if (!valEl || valEl.dataset.counted) return;
      valEl.dataset.counted = '1';
      const raw = valEl.textContent.trim();
      const match = raw.match(/(\d+)([%+]*)/);
      if (match) animateCounter(valEl, parseInt(match[1]), match[2]);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(c => statObserver.observe(c));

/* ─────────────────────────────────────────────────
   9. BUTTERY SMOOTH SCROLL (desktop wheel)
   ─────────────────────────────────────────────────
   Uses a custom lerp scroll with exponential ease-out.
   • scrollEaseOut: how quickly it decelerates (0.08 = very smooth)
   • Each wheel tick adds delta to a target; position lerps toward it
   • Disabled on mobile (touch has native momentum already)
───────────────────────────────────────────────── */
if (window.innerWidth > 768) {
  let sTarget  = window.scrollY;   // where we want to be
  let sCurrent = window.scrollY;   // where we are right now
  let sRafId   = null;
  const EASE   = 0.08;             // lerp factor — lower = smoother

  function smoothStep() {
    // Exponential ease-out
    sCurrent += (sTarget - sCurrent) * EASE;

    // Snap when close enough
    if (Math.abs(sTarget - sCurrent) < 0.4) {
      sCurrent = sTarget;
      window.scrollTo(0, sCurrent);
      sRafId = null;
      return;
    }

    window.scrollTo(0, sCurrent);
    sRafId = requestAnimationFrame(smoothStep);
  }

  window.addEventListener('wheel', e => {
    e.preventDefault();

    // Scale delta by device pixel ratio for consistent feel
    const delta   = e.deltaY * (e.deltaMode === 1 ? 20 : 1); // mode 1 = lines
    sTarget += delta * 0.9;
    sTarget  = Math.max(0, Math.min(sTarget, document.body.scrollHeight - window.innerHeight));

    // Also keep sCurrent synced if user resizes / tab switches
    sCurrent = window.scrollY;

    if (!sRafId) sRafId = requestAnimationFrame(smoothStep);
  }, { passive: false });

  // Keep target in sync if user uses keyboard/touch
  window.addEventListener('scroll', () => {
    // If the gap is tiny, external scroll (keyboard etc.) moved it
    if (Math.abs(window.scrollY - sCurrent) > 2) {
      sTarget  = window.scrollY;
      sCurrent = window.scrollY;
    }
  }, { passive: true });
}

/* ─────────────────────────────────────────────────
   10. CONTACT FORM HANDLER (front-end demo)
───────────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const fb = document.getElementById('form-feedback');
  fb.textContent = '✓ Message sent! I\'ll get back to you soon.';
  fb.style.display = 'block';
  e.target.reset();
  setTimeout(() => { fb.style.display = 'none'; }, 5000);
}

/* ─────────────────────────────────────────────────
   11. HERO TEXT — SUBTLE MOUSE-DRIVEN 3D TILT
───────────────────────────────────────────────── */
const heroWords = document.querySelectorAll('.hero-word');
document.addEventListener('mousemove', e => {
  if (window.innerWidth <= 768) return;
  const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
  const cy = (e.clientY / window.innerHeight - 0.5) * 2;
  heroWords.forEach(w => {
    w.style.transform = `
      perspective(800px)
      rotateX(${8 - cy * 4}deg)
      rotateY(${cx * 4}deg)
    `;
  });
});
</script>

</body>
</html>
