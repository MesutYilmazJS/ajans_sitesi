export default class Portfolio {
    constructor() {
        this.track = document.getElementById('portfolio-track');
        this.workSection = document.getElementById('work');
        this.portfolioProgressBar = document.getElementById('portfolio-progress-bar');
        
        if (this.track && this.workSection) {
            this.mm = gsap.matchMedia();
            this.portfolioCards = gsap.utils.toArray('.portfolio-card');
            this.init();
        }
    }

    init() {
        this.mm.add("(prefers-reduced-motion: no-preference)", () => {
            const isDesktop = () => window.innerWidth >= 1024;
            const getScrollEndBuffer = () => isDesktop()
                ? Math.max(window.innerWidth * 0.28, 220)
                : Math.max(window.innerWidth * 0.18, 120);
            const getScrollDist = () => Math.max(0, this.track.scrollWidth - this.workSection.clientWidth);
            const getTotalScrollDist = () => getScrollDist() + getScrollEndBuffer();
            const getSnapPoints = () => {
                const maxScroll = getTotalScrollDist();
                if (!maxScroll) return [0];

                return [0, ...this.portfolioCards.map((card) => gsap.utils.clamp(0, 1, card.offsetLeft / maxScroll))];
            };

            const introTween = gsap.timeline({
                scrollTrigger: {
                    trigger: this.workSection,
                    start: "top 72%",
                    once: true,
                }
            })
                .from(".portfolio-intro > *", {
                    x: () => isDesktop() ? -48 : -28,
                    opacity: 0,
                    stagger: 0.08,
                    duration: () => isDesktop() ? 0.75 : 0.6,
                }, 0.05)
                .from(this.portfolioCards, {
                    x: () => isDesktop() ? 90 : 52,
                    y: () => isDesktop() ? 40 : 24,
                    opacity: 0,
                    rotateY: (index) => isDesktop() ? (index % 2 === 0 ? -12 : 12) : 0,
                    stagger: 0.12,
                    duration: () => isDesktop() ? 0.95 : 0.72,
                    ease: "power3.out",
                }, 0.14);

            const horizontalTween = gsap.to(this.track, {
                x: () => -getScrollDist(),
                ease: "none",
                scrollTrigger: {
                    trigger: this.workSection,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 1,
                    fastScrollEnd: true,
                    start: "top top",
                    end: () => `+=${Math.max(getTotalScrollDist(), 1)}`,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (this.portfolioProgressBar) {
                            gsap.set(this.portfolioProgressBar, {
                                width: "100%",
                                scaleX: self.progress,
                                transformOrigin: "left center",
                            });
                        }
                    },
                    snap: getScrollDist() > 0 ? {
                        snapTo: (value) => gsap.utils.snap(getSnapPoints(), value),
                        duration: { min: 0.18, max: 0.42 },
                        delay: 0.05,
                        ease: "power1.inOut",
                    } : false,
                }
            });

            this.portfolioCards.forEach((card, index) => {
                const info = card.querySelector('.portfolio-info');
                const tag = card.querySelector('.portfolio-tag');
                const overlay = card.querySelector('.portfolio-overlay');

                gsap.fromTo(card, {
                    rotateZ: isDesktop() ? (index % 2 === 0 ? -1.2 : 1.2) : 0,
                }, {
                    rotateZ: isDesktop() ? (index % 2 === 0 ? 1.2 : -1.2) : 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: horizontalTween,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    }
                });

                if (info) {
                    gsap.fromTo(info, {
                        y: 24,
                        opacity: 0.35,
                    }, {
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalTween,
                            start: "left 82%",
                            end: "center center",
                            scrub: true,
                        }
                    });
                }

                if (tag) {
                    gsap.fromTo(tag, {
                        x: -18,
                        opacity: 0.3,
                    }, {
                        x: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalTween,
                            start: "left 90%",
                            end: "center center",
                            scrub: true,
                        }
                    });
                }

                if (overlay) {
                    gsap.fromTo(overlay, {
                        opacity: 0.48,
                    }, {
                        opacity: 0.12,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalTween,
                            start: "left 85%",
                            end: "center center",
                            scrub: true,
                        }
                    });
                }
            });

            return () => {
                introTween.scrollTrigger?.kill();
                introTween.kill();
                horizontalTween.scrollTrigger?.kill();
                horizontalTween.kill();
                if (this.portfolioProgressBar) {
                    gsap.set(this.portfolioProgressBar, { clearProps: "all" });
                }
                gsap.set(this.track, { clearProps: "transform" });
            };
        });

        this.mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(this.track, { clearProps: "transform" });
            if (this.portfolioProgressBar) {
                gsap.set(this.portfolioProgressBar, { clearProps: "all" });
            }

            const mobileTween = gsap.timeline({
                scrollTrigger: {
                    trigger: this.workSection,
                    start: "top 78%",
                    once: true,
                }
            })
                .from(".portfolio-intro > *", {
                    y: 24,
                    opacity: 0,
                    stagger: 0.06,
                    duration: 0.55,
                }, 0.05)
                .from(this.portfolioCards, {
                    y: 40,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.75,
                }, 0.12);

            return () => {
                mobileTween.scrollTrigger?.kill();
                mobileTween.kill();
            };
        });
    }
}
