import { prefersReducedMotion } from '../utils.js';

export default class InteractiveCards {
    constructor() {
        this.init();
    }

    init() {
        this.initServiceCards();
        this.initPortfolioCards();
        this.initGameCards();
        this.initTestimonialCards();
        this.initPricingPulse();
    }

    initServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.04,
                    borderColor: "rgba(59,130,246,0.45)",
                    boxShadow: "0 0 50px rgba(59,130,246,0.12)",
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "none",
                    duration: 0.35,
                    ease: "power2.inOut",
                    overwrite: "auto",
                });
            });
        });
    }

    initPortfolioCards() {
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
                gsap.to(card, { rotateY: x, rotateX: y, duration: 0.3, ease: "power2.out", transformPerspective: 800 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
            });
        });
    }

    initGameCards() {
        document.querySelectorAll('.game-card').forEach(card => {
            const token = card.querySelector('.game-token');
            const thumb = card.querySelector('.game-thumb');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.015,
                    borderColor: "rgba(96,165,250,0.45)",
                    boxShadow: "0 34px 80px rgba(2,6,23,0.38)",
                    duration: 0.35,
                    overwrite: "auto",
                });

                if (thumb) {
                    gsap.to(thumb, { scale: 1.03, duration: 0.45, overwrite: "auto" });
                }
                if (token) {
                    gsap.to(token, { y: -4, rotate: -4, duration: 0.35, overwrite: "auto" });
                }
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 16px 50px rgba(0,0,0,0.2)",
                    duration: 0.4,
                    overwrite: "auto",
                });

                if (thumb) {
                    gsap.to(thumb, { scale: 1, duration: 0.45, overwrite: "auto" });
                }
                if (token) {
                    gsap.to(token, { y: 0, rotate: 0, duration: 0.4, overwrite: "auto" });
                }
            });
        });
    }

    initTestimonialCards() {
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    rotate: card === document.querySelector('.testimonial-card:nth-child(2)') ? 0 : 1.2,
                    borderColor: "rgba(96,165,250,0.35)",
                    duration: 0.3,
                    overwrite: "auto",
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotate: 0,
                    borderColor: "rgba(255,255,255,0.07)",
                    duration: 0.35,
                    overwrite: "auto",
                });
            });
        });
    }

    initPricingPulse() {
        const popularCard = document.querySelector('.pricing-popular');
        if (popularCard && !prefersReducedMotion.matches) {
            gsap.to(popularCard, {
                boxShadow: "0 0 80px rgba(59,130,246,0.18)",
                repeat: -1,
                yoyo: true,
                duration: 2.5,
                ease: "sine.inOut",
            });
        }
    }
}
