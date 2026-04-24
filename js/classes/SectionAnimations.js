export default class SectionAnimations {
    constructor() {
        this.mm = gsap.matchMedia();
        this.init();
    }

    init() {
        // Run animations by default
        this.initReveals();
        this.initStats();
        this.initServices();
        this.initProcess();
        this.initImpact();
        this.initPricing();
        this.initContact();

        // Only reset if user explicitly PREFERS reduced motion
        this.mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(".gsap-reveal, .process-step, .section-header, .game-card, .pricing-card, .testimonial-card", {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
            });
        });
    }

    revealHeader(sectionSelector, options = {}) {
        const section = document.querySelector(sectionSelector);
        const header = section?.querySelector('.section-header');
        if (!header) return null;

        return gsap.from(header, {
            y: options.y ?? 36,
            opacity: 0,
            filter: "blur(8px)",
            duration: options.duration ?? 0.8,
            ease: options.ease ?? "power3.out",
            scrollTrigger: {
                trigger: section,
                start: options.start ?? "top 82%",
                once: true,
            }
        });
    }

    initReveals() {
        this.revealHeader("#services");
        this.revealHeader("#pricing", { y: 42 });
        this.revealHeader("#testimonials", { y: 42 });
        this.revealHeader("#contact", { y: 46 });
    }

    initStats() {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#stats",
                start: "top 80%",
                once: true,
            }
        })
            .from("#stats .stat-item", {
                y: 56,
                opacity: 0,
                scale: 0.92,
                stagger: 0.11,
                duration: 0.8,
            })
            .from("#stats .stat-item > div:last-child", {
                y: 16,
                opacity: 0,
                stagger: 0.08,
                duration: 0.5,
            }, 0.12);
    }

    initServices() {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#services",
                start: "top 72%",
                once: true,
            }
        })
            .from("#services .service-card", {
                y: 90,
                opacity: 0,
                rotateX: -14,
                transformOrigin: "center top",
                stagger: 0.12,
                duration: 0.95,
            }, 0.1)
            .from("#services .service-icon", {
                scale: 0.4,
                opacity: 0,
                stagger: 0.12,
                duration: 0.55,
            }, 0.2)
            .from("#services .service-card h3, #services .service-card p, #services .service-arrow", {
                y: 18,
                opacity: 0,
                stagger: 0.04,
                duration: 0.45,
            }, 0.28);
    }

    initProcess() {
        const processTimeline = gsap.timeline({ paused: true })
            .from("#process .section-header", {
                y: 36,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.8,
                ease: "power3.out",
            }, 0)
            .from("#process .process-step", {
                xPercent: (index) => index % 2 === 0 ? -10 : 10,
                opacity: 0,
                stagger: 0.14,
                duration: 0.8,
            }, 0.08)
            .from("#process .process-num", {
                scale: 0.55,
                opacity: 0,
                stagger: 0.14,
                duration: 0.65,
            }, 0.02)
            .from("#process .process-icon", {
                rotate: -30,
                scale: 0.2,
                opacity: 0,
                stagger: 0.14,
                duration: 0.55,
            }, 0.2);

        ScrollTrigger.create({
            trigger: "#process",
            start: "top 74%",
            invalidateOnRefresh: true,
            onEnter: () => processTimeline.restart(),
            onEnterBack: () => processTimeline.restart(),
        });
    }

    initImpact() {
        const impactSection = document.querySelector("#games");
        const impactLine = impactSection?.querySelector(".impact-line");
        const impactWords = [];

        if (impactLine) {
            const words = impactLine.textContent.trim().split(/\s+/);
            impactLine.innerHTML = words.map((word) =>
                `<span class="impact-word-wrap"><span class="impact-word">${word}</span></span>`
            ).join(" ");
            impactWords.push(...impactLine.querySelectorAll(".impact-word"));
        }

        if (impactSection) {
            const isDesktopImpact = window.matchMedia("(min-width: 1024px)").matches;
            const impactPanel = impactSection.querySelector(".impact-panel");
            const createImpactReplayTimeline = (config = {}) => gsap.timeline({ paused: true })
                .from(".impact-panel", {
                    y: config.panelY ?? 48,
                    opacity: config.panelOpacity ?? 0,
                    scale: config.panelScale ?? 0.96,
                    filter: config.panelFilter ?? "blur(18px)",
                    duration: config.panelDuration ?? 1,
                })
                .from(".impact-kicker", {
                    y: config.kickerY ?? 16,
                    opacity: 0,
                    letterSpacing: config.kickerSpacing ?? "0.6em",
                    duration: config.kickerDuration ?? 0.45,
                }, config.kickerAt ?? 0.16)
                .from(impactWords, {
                    yPercent: config.wordsYPercent ?? 120,
                    rotate: config.wordsRotate ?? 4,
                    opacity: 0,
                    filter: config.wordsFilter ?? "blur(10px)",
                    stagger: config.wordsStagger ?? 0.08,
                    duration: config.wordsDuration ?? 0.72,
                }, config.wordsAt ?? 0.22);

            if (isDesktopImpact) {
                let impactDesktopDelayCall;
                const impactDesktopTimeline = createImpactReplayTimeline({
                    panelY: 90,
                    panelOpacity: 0.3,
                    panelScale: 0.9,
                    panelFilter: "blur(24px)",
                    panelDuration: 0.42,
                    kickerY: 20,
                    kickerSpacing: "0.6em",
                    kickerDuration: 0.24,
                    kickerAt: 0.12,
                    wordsYPercent: 135,
                    wordsRotate: 5,
                    wordsFilter: "blur(12px)",
                    wordsStagger: 0.08,
                    wordsDuration: 0.45,
                    wordsAt: 0.14,
                }).to(".impact-panel", {
                    yPercent: -10,
                    scale: 1.02,
                    duration: 0.32,
                }, 0.62)
                    .to(impactWords, {
                        yPercent: -16,
                        stagger: 0.035,
                        duration: 0.3,
                    }, 0.68);

                ScrollTrigger.create({
                    trigger: impactPanel || impactSection,
                    start: "top 78%",
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        impactDesktopDelayCall?.kill();
                        impactDesktopDelayCall = gsap.delayedCall(0.3, () => impactDesktopTimeline.restart());
                    },
                    onEnterBack: () => {
                        impactDesktopDelayCall?.kill();
                        impactDesktopDelayCall = gsap.delayedCall(0.3, () => impactDesktopTimeline.restart());
                    },
                    onLeaveBack: () => {
                        impactDesktopDelayCall?.kill();
                    },
                });
            } else {
                const impactMobileTimeline = createImpactReplayTimeline();

                ScrollTrigger.create({
                    trigger: impactSection,
                    start: "top 72%",
                    invalidateOnRefresh: true,
                    onEnter: () => impactMobileTimeline.restart(),
                    onEnterBack: () => impactMobileTimeline.restart(),
                });

                gsap.to(".impact-panel", {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: impactSection,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }

            gsap.to(".impact-orb-left", {
                xPercent: 12,
                yPercent: -10,
                duration: 5.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".impact-orb-right", {
                xPercent: -10,
                yPercent: 12,
                duration: 6.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
    }

    initPricing() {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#pricing",
                start: "top 70%",
                once: true,
            }
        })
            .from("#pricing .pricing-card", {
                y: 70,
                opacity: 0,
                rotateY: (index) => index === 1 ? 0 : index === 0 ? -10 : 10,
                stagger: 0.12,
                duration: 0.9,
            }, 0.12)
            .from("#pricing .pricing-tier, #pricing .pricing-price, #pricing .pricing-desc, #pricing .pricing-features li", {
                y: 18,
                opacity: 0,
                stagger: 0.025,
                duration: 0.42,
            }, 0.24)
            .from("#pricing .pricing-btn", {
                y: 14,
                opacity: 0,
                duration: 0.45,
                stagger: 0.12,
            }, 0.34);

        ScrollTrigger.create({
            trigger: "#pricing",
            start: "top 85%",
            onEnter: () => gsap.set("#pricing .pricing-btn", { autoAlpha: 1, clearProps: "transform" }),
            onEnterBack: () => gsap.set("#pricing .pricing-btn", { autoAlpha: 1, clearProps: "transform" }),
        });
    }

    initContact() {
        gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 74%",
                once: true,
            }
        })
            .from("#contact h2", {
                y: 64,
                opacity: 0,
                skewY: 4,
                duration: 0.9,
            }, 0.1)
            .from("#contact p", {
                y: 24,
                opacity: 0,
                duration: 0.5,
            }, 0.24)
            .from("#contact-form .form-input, #contact-form .btn-primary", {
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.55,
            }, 0.3);
    }
}
