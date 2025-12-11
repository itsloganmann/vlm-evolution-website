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
    initLLaVADemo();
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

/* ==========================================
   LLaVA Interactive Demo
   ========================================== */
function initLLaVADemo() {
    const pipelineLayers = document.querySelectorAll('.pipeline-layer');
    const detailPanel = document.getElementById('layerDetailPanel');
    
    if (!pipelineLayers.length) return;
    
    // Layer information database
    const layerInfo = {
        'vision-encoder': {
            title: 'CLIP Vision Encoder (ViT-L/14)',
            description: `
                <p>The Vision Encoder is a <strong>Vision Transformer (ViT)</strong> pre-trained by OpenAI as part of CLIP. In LLaVA, this encoder is kept <em>frozen</em> during training.</p>
                <h5>How It Works:</h5>
                <ol>
                    <li><strong>Patch Embedding:</strong> The input image (224×224 pixels) is divided into 14×14 patches, each 16×16 pixels.</li>
                    <li><strong>Linear Projection:</strong> Each patch is flattened and projected to a 1024-dimensional vector.</li>
                    <li><strong>Positional Encoding:</strong> Learned position embeddings are added to preserve spatial information.</li>
                    <li><strong>Transformer Layers:</strong> 24 transformer blocks process the patch sequence with self-attention.</li>
                </ol>
                <div class="info-stats">
                    <div class="info-stat"><span class="stat-val">196</span><span class="stat-desc">Patches per image</span></div>
                    <div class="info-stat"><span class="stat-val">1024</span><span class="stat-desc">Dimensions per patch</span></div>
                    <div class="info-stat"><span class="stat-val">~300M</span><span class="stat-desc">Parameters</span></div>
                </div>
            `,
            color: '#6366f1'
        },
        'projection': {
            title: 'Linear Projection Layer',
            description: `
                <p>This is LLaVA's <strong>key architectural innovation</strong>—a simple linear projection that bridges vision and language spaces.</p>
                <h5>Why It Matters:</h5>
                <p>Unlike complex fusion mechanisms in Flamingo (Perceiver Resampler + Gated Cross-Attention), LLaVA uses just a single trainable matrix multiplication:</p>
                <div class="formula-box">
                    <code>H<sub>v</sub> = W · Z<sub>v</sub></code>
                    <p>Where W is a learnable [1024 × 4096] matrix</p>
                </div>
                <p>This simplicity allows for:</p>
                <ul>
                    <li>Faster training convergence</li>
                    <li>Lower computational cost</li>
                    <li>Easier reproducibility</li>
                </ul>
                <div class="info-stats">
                    <div class="info-stat"><span class="stat-val">~4M</span><span class="stat-desc">Trainable params</span></div>
                    <div class="info-stat"><span class="stat-val">1024→4096</span><span class="stat-desc">Dimension mapping</span></div>
                </div>
            `,
            color: '#ec4899'
        },
        'concatenation': {
            title: 'Token Concatenation',
            description: `
                <p>The projected visual tokens are <strong>concatenated</strong> with the text tokens to form a unified input sequence for the language model.</p>
                <h5>Sequence Structure:</h5>
                <div class="sequence-diagram">
                    <div class="seq-part visual">[Visual Tokens × 196]</div>
                    <div class="seq-separator">+</div>
                    <div class="seq-part system">[System Prompt]</div>
                    <div class="seq-separator">+</div>
                    <div class="seq-part user">[User Question]</div>
                </div>
                <h5>Key Insight:</h5>
                <p>By placing visual tokens at the <em>beginning</em> of the sequence, the LLM can attend to visual information throughout the entire response generation process.</p>
                <div class="info-stats">
                    <div class="info-stat"><span class="stat-val">196+N</span><span class="stat-desc">Total sequence length</span></div>
                    <div class="info-stat"><span class="stat-val">4096D</span><span class="stat-desc">Unified embedding dim</span></div>
                </div>
            `,
            color: '#f59e0b'
        },
        'llm': {
            title: 'Vicuna Language Model',
            description: `
                <p>Vicuna is a <strong>fine-tuned version of LLaMA</strong> trained on user-shared conversations from ShareGPT, making it excellent at following instructions.</p>
                <h5>Architecture Details:</h5>
                <ul>
                    <li><strong>Layers:</strong> 32 transformer decoder blocks</li>
                    <li><strong>Hidden Size:</strong> 4096 dimensions</li>
                    <li><strong>Attention Heads:</strong> 32</li>
                    <li><strong>Context Length:</strong> 2048 tokens</li>
                </ul>
                <h5>Two-Stage Training:</h5>
                <ol>
                    <li><strong>Stage 1 - Alignment:</strong> Only the projection layer is trained on image-caption pairs (frozen LLM)</li>
                    <li><strong>Stage 2 - Instruction Tuning:</strong> Both projection layer and LLM are fine-tuned on 158K visual instruction examples</li>
                </ol>
                <div class="info-stats">
                    <div class="info-stat"><span class="stat-val">7B/13B</span><span class="stat-desc">Parameters</span></div>
                    <div class="info-stat"><span class="stat-val">32</span><span class="stat-desc">Transformer layers</span></div>
                </div>
            `,
            color: '#8b5cf6'
        },
        'output': {
            title: 'Autoregressive Text Generation',
            description: `
                <p>The LLM generates the response <strong>one token at a time</strong>, with each new token conditioned on all previous tokens AND the visual context.</p>
                <h5>Generation Process:</h5>
                <ol>
                    <li><strong>Forward Pass:</strong> Compute attention over entire sequence (visual + text)</li>
                    <li><strong>Logit Prediction:</strong> Output layer produces probability distribution over vocabulary (~32K tokens)</li>
                    <li><strong>Sampling:</strong> Select next token (greedy, top-k, or nucleus sampling)</li>
                    <li><strong>Append & Repeat:</strong> Add new token to sequence and repeat until [EOS] or max length</li>
                </ol>
                <h5>Why Visual Grounding Works:</h5>
                <p>Because visual tokens are in the sequence, the self-attention mechanism allows <em>every generated word</em> to attend to visual features, maintaining coherence with the image.</p>
                <div class="info-stats">
                    <div class="info-stat"><span class="stat-val">~50</span><span class="stat-desc">Tokens/sec (A100)</span></div>
                    <div class="info-stat"><span class="stat-val">32K</span><span class="stat-desc">Vocabulary size</span></div>
                </div>
            `,
            color: '#10b981'
        }
    };
    
    // Click handler for layers
    pipelineLayers.forEach(layer => {
        const card = layer.querySelector('.layer-card');
        
        card.addEventListener('click', () => {
            const layerName = layer.getAttribute('data-layer');
            const info = layerInfo[layerName];
            
            // Remove active class from all layers
            pipelineLayers.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked layer
            layer.classList.add('active');
            
            // Update and show detail panel
            if (detailPanel && info) {
                detailPanel.classList.add('active');
                detailPanel.querySelector('.panel-title').textContent = info.title;
                detailPanel.querySelector('.panel-title').style.color = info.color;
                detailPanel.querySelector('.panel-content').innerHTML = info.description;
                
                // Scroll panel into view
                detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    // Close panel button
    const closeBtn = document.querySelector('.panel-close');
    if (closeBtn && detailPanel) {
        closeBtn.addEventListener('click', () => {
            detailPanel.classList.remove('active');
            pipelineLayers.forEach(l => l.classList.remove('active'));
        });
    }
    
    // Animate data flow through pipeline
    animateDataFlow();
}

function animateDataFlow() {
    const connectors = document.querySelectorAll('.layer-connector');
    
    connectors.forEach((connector, index) => {
        const dot = connector.querySelector('::after');
        connector.style.animationDelay = `${index * 0.3}s`;
    });
}

// Add additional styles for the panel content
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    .panel-content h5 {
        font-size: 1rem;
        color: var(--text-primary);
        margin: 1.5rem 0 0.75rem;
    }
    
    .panel-content h5:first-child {
        margin-top: 0;
    }
    
    .panel-content p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 0.75rem;
    }
    
    .panel-content ul, .panel-content ol {
        color: var(--text-secondary);
        padding-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .panel-content li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .panel-content strong {
        color: var(--accent-primary);
    }
    
    .panel-content em {
        color: var(--accent-secondary);
    }
    
    .panel-content code {
        font-family: 'JetBrains Mono', monospace;
        background: rgba(99, 102, 241, 0.15);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
        color: var(--accent-primary);
    }
    
    .info-stats {
        display: flex;
        gap: 1.5rem;
        margin-top: 1.5rem;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
        flex-wrap: wrap;
    }
    
    .info-stat {
        text-align: center;
    }
    
    .stat-val {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1.2;
    }
    
    .stat-desc {
        font-size: 0.75rem;
        color: var(--text-muted);
    }
    
    .formula-box {
        background: var(--bg-secondary);
        border-left: 3px solid var(--accent-tertiary);
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    }
    
    .formula-box code {
        font-size: 1.1rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .formula-box p {
        font-size: 0.85rem;
        margin: 0;
        color: var(--text-muted);
    }
    
    .sequence-diagram {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
        margin: 1rem 0;
    }
    
    .seq-part {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-family: 'JetBrains Mono', monospace;
    }
    
    .seq-part.visual {
        background: rgba(99, 102, 241, 0.2);
        border: 1px solid rgba(99, 102, 241, 0.4);
        color: var(--accent-primary);
    }
    
    .seq-part.system {
        background: rgba(139, 92, 246, 0.2);
        border: 1px solid rgba(139, 92, 246, 0.4);
        color: var(--accent-secondary);
    }
    
    .seq-part.user {
        background: rgba(16, 185, 129, 0.2);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: var(--accent-success);
    }
    
    .seq-separator {
        font-size: 1.2rem;
        color: var(--text-muted);
    }
`;
document.head.appendChild(demoStyles);

console.log('🚀 VLM Evolution Website loaded successfully!');
console.log('💡 Tip: Try the Konami Code for a surprise! (↑↑↓↓←→←→BA)');
console.log('🦙 Explore the LLaVA demo to see how vision-language models work!');
