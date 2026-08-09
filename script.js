// Safely register ScrollTrigger with GSAP
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize components with explicit error-proofing guards
    initCustomCursor();
    initMagneticButtons();
    initHeaderLogic();
    initHeroDeckEntrance();
    initAboutAnimations();
    initSkillsAnimations();
    initPortfolioGridAnimations();
    initContactForm();

    // Force ScrollTrigger to calculate all heights and positions accurately
    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
    }
});

/* ==========================================================================
   Custom Luxury Cursor tracking physics
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");
    
    if (!cursor || !cursorDot) return;

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.35,
            ease: "power2.out"
        });
        
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const interactives = document.querySelectorAll("a, button, input, textarea, .deck-card, .grid-project-card");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
}

/* ==========================================================================
   Magnetic Elements Micro-physics
   ========================================================================== */
function initMagneticButtons() {
    const magnets = document.querySelectorAll(".magnetic-element");
    if (magnets.length === 0) return;
    
    magnets.forEach(elem => {
        elem.addEventListener("mousemove", (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        elem.addEventListener("mouseleave", () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1.1, 0.4)"
            });
        });
    });
}

/* ==========================================================================
   Header Scrolling Styles
   ========================================================================== */
function initHeaderLogic() {
    const header = document.querySelector(".main-header");
    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".mobile-nav");
    const links = document.querySelectorAll(".mobile-link");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("open");
            nav.classList.toggle("open");
        });

        links.forEach(l => {
            l.addEventListener("click", () => {
                toggle.classList.remove("open");
                nav.classList.remove("open");
            });
        });
    }
}

/* ==========================================================================
   Hero Interactive Deck Row sequence
   ========================================================================== */
function initHeroDeckEntrance() {
    const deckCards = document.querySelectorAll(".deck-card");
    const navContainer = document.querySelector(".nav-container");
    const heroText = document.querySelector(".hero-text-content > *");

    if (!deckCards.length && !navContainer && !heroText) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (navContainer) {
        tl.fromTo(navContainer, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    }
    if (heroText) {
        tl.fromTo(".hero-text-content > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.6");
    }
    if (deckCards.length) {
        tl.fromTo(deckCards, 
            { scale: 0.8, opacity: 0, y: 100 }, 
            { 
                scale: 1, 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                stagger: 0.1, 
                ease: "back.out(1.4)" 
            }, 
            "-=0.6"
        );
    }
}

/* ==========================================================================
   About Card & Number Ticking
   ========================================================================== */
function initAboutAnimations() {
    const aboutSection = document.querySelector(".about-section");
    const aboutFrame = document.querySelector(".about-image-frame");
    const aboutContent = document.querySelector(".about-content");

    if (!aboutSection) return;

    if (aboutFrame) {
        gsap.from(aboutFrame, {
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 85%"
            },
            x: -40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    if (aboutContent) {
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 85%"
            },
            x: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const dataTarget = stat.getAttribute("data-target");
        const target = dataTarget ? parseInt(dataTarget, 10) : 0;
        if (isNaN(target)) return;

        gsap.fromTo(stat, 
            { textContent: 0 }, 
            {
                textContent: target,
                duration: 2,
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 95%"
                }
            }
        );
    });
}

/* ==========================================================================
   Skills Grid Slide Animations (Optimized for Visibility)
   ========================================================================== */
function initSkillsAnimations() {
    const grid = document.querySelector(".skills-grid");
    const cards = document.querySelectorAll(".skill-group-card");
    
    // Guard clause: Exit gracefully if skills markup is not in the DOM
    if (!grid || cards.length === 0) return;

    // Use fromTo to ensure both initial hidden and final visible states are specified
    gsap.fromTo(cards, 
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: grid,
                start: "top 90%", // Triggers slightly earlier to avoid sticking at 0 opacity
                toggleActions: "play none none none"
            }
        }
    );
}

/* ==========================================================================
   Staggered Portfolio Grid reveals (Optimized for Visibility)
   ========================================================================== */
function initPortfolioGridAnimations() {
    const grid = document.querySelector(".portfolio-interactive-grid");
    const cards = document.querySelectorAll(".grid-project-card");
    
    // Guard clause: Exit gracefully if portfolio markup is not in the DOM
    if (!grid || cards.length === 0) return;

    // Use fromTo to guarantee the animation triggers smoothly on scroll
    gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
                trigger: grid,
                start: "top 90%", // Triggers slightly earlier to ensure execution
                toggleActions: "play none none none"
            }
        }
    );
}

/* ==========================================================================
   Contact Form Submissions
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("portfolio-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector(".submit-btn");
        if (!submitBtn) return;

        const originalText = submitBtn.querySelector("span") ? submitBtn.querySelector("span").textContent : "Send Message";

        gsap.to(submitBtn, { scale: 0.95, duration: 0.1 });

        setTimeout(() => {
            gsap.to(submitBtn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
            submitBtn.style.background = "#34C759"; // Green Success Accent
            
            if (submitBtn.querySelector("span")) {
                submitBtn.querySelector("span").textContent = "Message Sent!";
            }
            form.reset();

            setTimeout(() => {
                submitBtn.style.background = "";
                if (submitBtn.querySelector("span")) {
                    submitBtn.querySelector("span").textContent = originalText;
                }
            }, 3000);
        }, 1000);
    });
}