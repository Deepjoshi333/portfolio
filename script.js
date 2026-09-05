// ==========================================================
// 1. GLOBAL VARIABLES & INITIALIZATION
// ==========================================================
gsap.registerPlugin(ScrollTrigger);

// Three.js variables
let scene, camera, renderer;
let textMesh;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// DOM Elements
const canvas = document.getElementById('dj-canvas');
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

// ==========================================================
// 2. LOADER & INIT
// ==========================================================
window.addEventListener('load', () => {
    // Artificial loader delay for effect
    setTimeout(() => {
        const loader = document.getElementById('loader');
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                initThreeJS();
            }
        });

        // Hero animations
        gsap.from(".home-title", { y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
        gsap.from(".home-subtitle", { y: 20, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
        gsap.from(".home-cta-row", { y: 20, opacity: 0, duration: 1, delay: 0.7, ease: "power3.out" });

    }, 2000);
});

// ==========================================================
// 3. THREE.JS SETUP
// ==========================================================
function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    
    // In Three.js Canvas is drawn transparently to show backgrounds beneath
    // we manage backgrounds in CSS
    
    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // Position camera far enough to see the text
    camera.position.set(0, 0, 150);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2); // Primary Blue/Indigo
    dirLight1.position.set(100, 100, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5); // Accent Cyan
    dirLight2.position.set(-100, -100, 50);
    scene.add(dirLight2);
    
    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 200); // Purple glow
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // Load Font and Create Text
    const loader = new THREE.FontLoader();
    loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', function (font) {
        
        const geometry = new THREE.TextGeometry('DJ', {
            font: font,
            size: 40,
            height: 8,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.5,
            bevelOffset: 0,
            bevelSegments: 5
        });

        // Center the geometry
        geometry.computeBoundingBox();
        const xOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        const yOffset = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
        geometry.translate(xOffset, yOffset, 0);

        // Material (Glassy / Neon look)
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x12121a,
            emissive: 0x111122,
            roughness: 0.1,
            metalness: 0.9,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);

        setupScrollAnimations();
        animate();
    });

    // Window Resize
    window.addEventListener('resize', onWindowResize);
    
    // Mouse Move for Parallax
    document.addEventListener('mousemove', onDocumentMouseMove);
}

// ==========================================================
// 4. ANIMATION LOOP & PARALLAX
// ==========================================================
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Apply mouse parallax if mesh exists
    if (textMesh) {
        targetX = mouseX * 0.01;
        targetY = mouseY * 0.01;
        
        // Add subtle constant floating motion combined with mouse drag
        const time = Date.now() * 0.001;
        
        // textMesh.rotation base values are set by ScrollTrigger, 
        // we add offset on top of it. We can do that by creating a parent group, 
        // but for simplicity, we will just lerp rotation offsets in a wrapper object 
        // or add to the current values directly (careful with GSAP overrides).
        
        // Simpler approach: let GSAP handle exact position/rotation. 
        // Here we just add a small independent sine wave to Y position for floating.
        // And mouse look-at effect is added to the mesh rotation directly via GSAP later, 
        // but let's apply mouse based tilt directly here.
        textMesh.rotation.x += 0.05 * (targetY - textMesh.rotation.x);
        textMesh.rotation.y += 0.05 * (targetX - textMesh.rotation.y);
    }

    renderer.render(scene, camera);
}

// ==========================================================
// 5. GSAP SCROLL ANIMATIONS (3D TEXT + DOM)
// ==========================================================
function setupScrollAnimations() {
    // The "DJ" Text Scroll Timeline
    // We animate position and rotation of the textMesh
    
    // We create a single timeline linked to the whole page scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1 // Smooth scrubbing
        }
    });

    // Initial state (Home Section)
    // Mesh is in center. Z is 0.

    // 1. Transition to About Section (Moves to right, rotates)
    tl.to(textMesh.position, {
        x: 35, // Move right
        y: -10, // Move down slightly
        z: -20, // Push back slightly
        ease: "power1.inOut"
    }, 0.1);
    
    tl.to(textMesh.rotation, {
        z: 0.2,
        ease: "power1.inOut"
    }, 0.1);

    // 2. Transition to Projects Section (Moves left, rotates opposite)
    // About ends around 0.3-0.4 progress.
    tl.to(textMesh.position, {
        x: -30,
        y: -30,
        z: 10,  // Move closer
        ease: "power1.inOut"
    }, 0.4);

    tl.to(textMesh.rotation, {
        x: 0.5,
        y: Math.PI / 4, // 45 deg
        z: -0.2,
        ease: "power1.inOut"
    }, 0.4);

    // 3. Transition to Contact Section (Centers again, big rotation)
    tl.to(textMesh.position, {
        x: 0,
        y: -15,   // Stops comfortably on screen
        z: -30,   // Sits behind the form smoothly
        ease: "power1.inOut"
    }, 0.8);

    tl.to(textMesh.rotation, {
        x: 0,
        y: Math.PI * 2, // Full spin
        z: 0,
        ease: "power1.inOut"
    }, 0.8);


    // Background Parallax
    gsap.to("#parallax-bg", {
        y: 200,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });

    // Section Reveals
    const sections = gsap.utils.toArray('.section-title');
    sections.forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// ==========================================================
// 6. UI INTERACTIONS & UTILS
// ==========================================================

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    // Use requestAnimationFrame for smoother cursor
    requestAnimationFrame(() => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Small delay for the ring
        setTimeout(() => {
            cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50);
    });
});

// Cursor Hover Effects on Links/Buttons
const links = document.querySelectorAll('a, button, input, textarea');
links.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

mobLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Contact Form Dummy Submisison
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Minimal validation
        const name = document.getElementById('f-name').value;
        const email = document.getElementById('f-email').value;
        const msg = document.getElementById('f-message').value;

        if (name && email && msg) {
            const btnText = document.querySelector('#form-submit-btn .btn-text');
            btnText.textContent = "Sending...";
            
            setTimeout(() => {
                formSuccess.style.display = 'block';
                contactForm.reset();
                btnText.textContent = "Send Message";
                
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        }
    });
}
