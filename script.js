
// Register ScrollTrigger safely
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    initCustomCursor();
    initMagneticButtons();
    initHeaderLogic();
    initHeroDeckEntrance();
    initAboutAnimations();
    initSkillsAnimations();
    initPortfolioGridAnimations();
    initContactForm();
});

/* ==========================================================================
   Custom Luxury Cursor tracking physics
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");
    
    if(!cursor || !cursorDot) return;

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

    // Expand cursor ring when hovering clickables
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

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

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
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".nav-container", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    tl.fromTo(".hero-text-content > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.6");
    
    // Spread visual deck mockups with elastic recovery
    tl.fromTo(".deck-card", 
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

/* ==========================================================================
   About Card & Number Ticking
   ========================================================================== */
function initAboutAnimations() {
    gsap.from(".about-image-frame", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%"
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-content", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%"
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"));
        gsap.fromTo(stat, 
            { textContent: 0 }, 
            {
                textContent: target,
                duration: 2,
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 90%"
                }
            }
        );
    });
}

/* ==========================================================================
   Skills Grid slide animations
   ========================================================================== */
function initSkillsAnimations() {
    gsap.from(".skill-group-card", {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
}

/* ==========================================================================
   Staggered Portfolio Grid reveals
   ========================================================================== */
function initPortfolioGridAnimations() {
    gsap.from(".grid-project-card", {
        scrollTrigger: {
            trigger: ".portfolio-interactive-grid",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
    });
}

/* ==========================================================================
   Tacit Contact Form submissions
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("portfolio-form");
    if(!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.querySelector("span").textContent;

        gsap.to(submitBtn, { scale: 0.95, duration: 0.1 });

        setTimeout(() => {
            gsap.to(submitBtn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
            submitBtn.style.background = "#34C759"; // Green Success Accent
            submitBtn.querySelector("span").textContent = "Message Sent!";
            form.reset();

            setTimeout(() => {
                submitBtn.style.background = "";
                submitBtn.querySelector("span").textContent = originalText;
            }, 3000);
        }, 1000);
    });
}    
