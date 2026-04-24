import { prefersReducedMotion } from '../utils.js';

export default class Hero {
    constructor() {
        this.heroSection = document.getElementById('hero');
        this.heroTitle = document.getElementById('hero-title');
        
        if (this.heroTitle) this.initTitleAnim();
        if (this.heroSection) this.initInteractions();
    }

    initTitleAnim() {
        this.heroTitle.querySelectorAll('span').forEach(span => {
            const text = span.textContent;
            span.innerHTML = '';
            [...text].forEach(char => {
                const el = document.createElement('span');
                el.textContent = char === ' ' ? '\u00A0' : char;
                el.style.display = 'inline-block';
                span.appendChild(el);
            });
        });

        gsap.from("#hero-title span span", {
            y: 80,
            opacity: 0,
            duration: 0.75,
            stagger: 0.022,
            ease: "power4.out",
            delay: 0.4,
        });
    }

    initInteractions() {
        if (prefersReducedMotion.matches) return;

        const heroButtons = this.heroSection.querySelectorAll('.btn-primary, .btn-ghost');
        const heroResetTargets = [ "#hero-title", ...heroButtons].filter(Boolean);

        this.heroSection.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = this.heroSection.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to("#hero-title", {
                x: x * 18,
                y: y * 12,
                duration: 0.7,
                overwrite: "auto",
            });

            gsap.to(heroButtons, {
                x: x * -10,
                y: y * -8,
                duration: 0.7,
                stagger: 0.02,
                overwrite: "auto",
            });
        });

        this.heroSection.addEventListener('mouseleave', () => {
            gsap.to(heroResetTargets, {
                x: 0,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                overwrite: "auto",
            });
        });

        gsap.to("#hero-title", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
                trigger: this.heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
    }
}
