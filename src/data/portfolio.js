// ── Portfolio Data ──
// All content extracted from the original PHP $portfolio array

export const portfolio = {
  name: "DEEP JOSHI",
  shortname: "DJ",
  tagline: "Creative Developer",
  about: "I am a passionate creative developer blending design and technology to craft immersive digital experiences. I thrive at the intersection of art and code.",
  email: "deep@example.com",
  phone: "+91 98765 43210",
  location: "India",

  // ── Qualifications ──
  qualifications: [
    {
      year: "2024",
      title: "B.Tech Computer Science",
      org: "Example University",
      desc: "Specialization in Software Engineering & UX Design",
    },
    {
      year: "2022",
      title: "Full-Stack Certification",
      org: "Online Academy",
      desc: "PHP, JavaScript, Node.js, React & Database Systems",
    },
    {
      year: "2020",
      title: "HSC – Science",
      org: "State Board",
      desc: "PCM with Computer Science · 92%",
    },
  ],

  // ── Performance / Stats ──
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "3+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "12+", label: "Technologies" },
  ],

  // ── Projects ──
  projects: [
    {
      title: "VisiFlow SaaS",
      tags: ["PHP", "AI", "SaaS"],
      desc: "AI-powered visiting-card scanner & CRM platform with real-time business-card parsing.",
      iconKey: "rocket",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Lost & Found Chat",
      tags: ["Groq API", "AI", "Chat"],
      desc: "Groq-LLM backed item-matching chat UI with semantic search and smart notifications.",
      iconKey: "chat",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "3D Portfolio",
      tags: ["Three.js", "GSAP", "CSS3D"],
      desc: "Anti-gravity immersive personal portfolio with layered parallax & glassmorphism cards.",
      iconKey: "cube",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "E-Commerce Suite",
      tags: ["PHP", "MySQL", "JS"],
      desc: "Full-featured e-commerce solution with real-time inventory and Razorpay integration.",
      iconKey: "cart",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Data Dashboard",
      tags: ["Python", "Chart.js", "REST"],
      desc: "Interactive analytics dashboard with live chart updates and exportable reports.",
      iconKey: "chart",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "AR Navigation App",
      tags: ["AR.js", "Maps", "JS"],
      desc: "Browser-based AR indoor navigation app using WebXR and SVG floor-plan overlays.",
      iconKey: "compass",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80",
    },
  ],

  // ── Skills ──
  skills: [
    { name: "HTML / CSS", pct: 95 },
    { name: "JavaScript", pct: 90 },
    { name: "PHP / Laravel", pct: 85 },
    { name: "UI / UX Design", pct: 88 },
    { name: "MySQL", pct: 82 },
    { name: "Three.js / GSAP", pct: 75 },
    { name: "React / Vue", pct: 78 },
    { name: "Python / AI", pct: 70 },
  ],

  // ── Social Links ──
  social: [
    { label: "GITHUB", url: "https://github.com" },
    { label: "LINKEDIN", url: "https://linkedin.com" },
    { label: "TWITTER", url: "https://twitter.com" },
    { label: "INSTAGRAM", url: "https://instagram.com" },
    { label: "LEETCODE", url: "https://leetcode.com" },
    { label: "DISCORD", url: "https://discord.com" },
    { label: "EMAIL", url: "mailto:deep@example.com" },
  ],
};

// ── Anti-Gravity DJ Background Items ──
// [size, opacity, blur, topVh, left%, rotation, parallaxSpeed, floatAmplitude, floatPeriod]
export const djItems = [
  // LAYER 1: Hero zone
  [420, 0.025, 8, 3, -5, -8, 0.80, 18, 9.0],
  [160, 0.060, 2, 8, 80, 12, 0.55, 12, 7.5],
  [90, 0.090, 0, 12, 42, -20, 0.30, 8, 6.0],
  // LAYER 2: About zone
  [260, 0.035, 5, 17, -3, 15, 0.72, 20, 8.5],
  [120, 0.070, 1, 22, 65, -6, 0.45, 10, 7.0],
  [380, 0.020, 9, 26, 50, -30, 0.85, 22, 10.0],
  // LAYER 3: Qualification zone
  [200, 0.045, 3, 31, 14, 22, 0.60, 15, 7.8],
  [100, 0.080, 0, 36, 88, -12, 0.35, 9, 6.5],
  [300, 0.030, 6, 40, 28, -5, 0.75, 18, 9.2],
  // LAYER 4: Performance zone
  [140, 0.065, 2, 45, -4, -25, 0.50, 12, 7.2],
  [450, 0.018, 10, 49, 60, 10, 0.88, 25, 11.0],
  [80, 0.100, 0, 53, 38, 35, 0.25, 7, 5.5],
  // LAYER 5: Projects zone
  [340, 0.022, 7, 58, -8, -18, 0.78, 20, 9.5],
  [180, 0.055, 2, 62, 72, 8, 0.48, 14, 7.5],
  [110, 0.075, 1, 67, 25, -32, 0.33, 10, 6.2],
  [240, 0.038, 4, 70, 92, 20, 0.65, 16, 8.0],
  // LAYER 6: Skills zone
  [500, 0.015, 12, 73, 30, -10, 0.90, 28, 12.0],
  [130, 0.070, 1, 77, -6, 28, 0.40, 11, 6.8],
  [280, 0.032, 5, 81, 58, -15, 0.70, 18, 8.8],
  [90, 0.085, 0, 84, 10, 42, 0.28, 8, 5.8],
  // LAYER 7: Contact + Footer
  [360, 0.025, 7, 87, 75, -22, 0.82, 22, 10.5],
  [150, 0.060, 2, 90, 40, 15, 0.52, 13, 7.3],
  [220, 0.040, 3, 93, -5, -8, 0.62, 16, 8.2],
  [480, 0.015, 11, 96, 55, 5, 0.88, 26, 11.5],
  // EXTRA floating accents
  [70, 0.100, 0, 20, 55, -38, 0.22, 6, 5.2],
  [95, 0.085, 0, 44, 8, 50, 0.20, 7, 5.0],
  [75, 0.095, 0, 68, 82, -45, 0.18, 6, 4.8],
  [85, 0.090, 0, 88, 32, 55, 0.15, 5, 4.5],
];
