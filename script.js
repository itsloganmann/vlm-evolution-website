/* ==========================================
   VLM Evolution Website - Interactive JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initCounterAnimation();
    initScrollAnimations();
    initNavScroll();
    initParallaxOrbs();
    initTableRowHighlight();
    initSmoothScroll();
    initTypingEffect();
});

/* ==========================================
   Counter Animation for Hero Stats
   ========================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ==========================================
   Scroll-based Animations
   ========================================== */
function initScrollAnimations() {
    // Add animate-on-scroll class to elements
    const animatableElements = [
        '.paradigm-card',
        '.limitation-card',
        '.genre-card',
        '.triad-item',
        '.reflection-block',
        '.work-item',
        '.conc-step'
    ];

    animatableElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grouped elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================
   Navigation Scroll Effects
   ========================================== */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }

        // Hide/show nav on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================
   Parallax Effect for Floating Orbs
   ========================================== */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

/* ==========================================
   Table Row Highlight Effect
   ========================================== */
function initTableRowHighlight() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const cells = table.querySelectorAll('td, th');

    // Column highlight on hover
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            const columnIndex = cell.cellIndex;
            const allCells = table.querySelectorAll(`td:nth-child(${columnIndex + 1}), th:nth-child(${columnIndex + 1})`);
            allCells.forEach(c => c.classList.add('column-highlight'));
        });

        cell.addEventListener('mouseleave', () => {
            const columnIndex = cell.cellIndex;
            const allCells = table.querySelectorAll(`td:nth-child(${columnIndex + 1}), th:nth-child(${columnIndex + 1})`);
            allCells.forEach(c => c.classList.remove('column-highlight'));
        });
    });
}

/* ==========================================
   Smooth Scroll for Anchor Links
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   Typing Effect for Hero Title
   ========================================== */
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--accent-primary)';
    
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    };

    // Start typing after a short delay
    setTimeout(type, 500);
}

/* ==========================================
   Paradigm Card Click Effect
   ========================================== */
document.querySelectorAll('.paradigm-card').forEach(card => {
    card.addEventListener('click', () => {
        const year = card.getAttribute('data-year');
        const targetId = {
            '2021': 'clip',
            '2022': 'flamingo',
            '2023': 'llava'
        }[year];

        if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add a highlight effect
                target.querySelector('.timeline-content').style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.6)';
                setTimeout(() => {
                    target.querySelector('.timeline-content').style.boxShadow = '';
                }, 2000);
            }
        }
    });
});

/* ==========================================
   Easter Egg: Konami Code
   ========================================== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 9999;
            border-radius: 50%;
            pointer-events: none;
        `;
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => confetti.remove();
    }

    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the Easter Egg! 🤖';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'opacity 0.5s, transform 0.5s';
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

/* ==========================================
   Progress Bar on Scroll
   ========================================== */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    z-index: 10001;
    transition: width 0.1s linear;
    width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
});

/* ==========================================
   Interactive Architecture Diagram Hover
   ========================================== */
document.querySelectorAll('.arch-component').forEach(component => {
    component.addEventListener('mouseenter', () => {
        // Pulse effect
        component.style.animation = 'pulse 0.5s ease-in-out';
    });

    component.addEventListener('animationend', () => {
        component.style.animation = '';
    });
});

// Add pulse animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .column-highlight {
        background: rgba(99, 102, 241, 0.1) !important;
    }
    
    .nav-links a.active {
        color: var(--text-primary);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

/* ==========================================
   Tooltip for Technical Terms
   ========================================== */
const technicalTerms = {
    'ViT': 'Vision Transformer - A transformer architecture adapted for image processing',
    'Contrastive Learning': 'A technique that learns by comparing similar and dissimilar examples',
    'Zero-Shot': 'Ability to perform tasks without specific training examples',
    'Few-Shot': 'Learning from just a few examples',
    'Autoregressive': 'Generating outputs one element at a time, each conditioned on previous ones'
};

// Create tooltip element
const tooltip = document.createElement('div');
tooltip.className = 'custom-tooltip';
tooltip.style.cssText = `
    position: fixed;
    background: #1a1a25;
    border: 1px solid rgba(99, 102, 241, 0.4);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    max-width: 280px;
    font-size: 0.85rem;
    color: #a0a0b0;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
`;
document.body.appendChild(tooltip);

console.log('🚀 VLM Evolution Website loaded successfully!');
console.log('💡 Tip: Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)');
