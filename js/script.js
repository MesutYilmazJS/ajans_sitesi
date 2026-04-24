/* ============================================================
   THE SCULPT — script.js
   GSAP Optimized | Lenis Smooth Scroll | All Sections
   ============================================================ */

// ============================================================
// 1. GSAP Plugin Kaydı — EN BAŞTA OLMALI
// ============================================================
gsap.registerPlugin(ScrollTrigger);

// Global defaults — tekrarlayan değerleri bir kere tanımla
gsap.defaults({
    ease: "power3.out",
    duration: 0.9,
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isMobileViewport = window.matchMedia("(max-width: 767px)");

// ============================================================
// 2. Lenis Smooth Scroll + ScrollTrigger Senkronizasyonu
// ============================================================
const lenis = new Lenis({
    duration: 1.1,
    lerp: 0.08,
    wheelMultiplier: 1.0,
    infinite: false,
});

// En doğru Lenis + GSAP entegrasyonu
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

// Nav linkleri Lenis ile smooth scroll yapsın
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) lenis.scrollTo(target, { offset: -80, duration: 1.5 });
    });
});

// ============================================================
// 3. Custom Cursor
// ============================================================
const cursor = document.getElementById('cursor');
if (cursor) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.08,
            ease: "power2.out",
            overwrite: "auto", // prevent queuing
        });
    });
}

// ============================================================
// 3.5 Navbar + Hero mikro animasyonları
// ============================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const heroSection = document.getElementById('hero');

const setNavToggleIcon = (iconName) => {
    if (!navToggle) return;
    navToggle.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5"></i>`;
    lucide.createIcons();
};

const closeMobileMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menüyü aç');
    document.body.classList.remove('nav-open');
    setNavToggleIcon('menu-2');
};

const openMobileMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.add('is-open');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menüyü kapat');
    document.body.classList.add('nav-open');
    setNavToggleIcon('x');
};

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('is-open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            if (isMobileViewport.matches) closeMobileMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (!isMobileViewport.matches) closeMobileMenu();
    });
}

if (navbar) {
    gsap.to(navbar, {
        backgroundColor: "rgba(5,5,5,0.88)",
        borderBottomColor: "rgba(255,255,255,0.08)",
        paddingTop: 14,
        paddingBottom: 14,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=220",
            scrub: true,
        }
    });
}

if (heroSection && !prefersReducedMotion.matches) {
    const heroButtons = heroSection.querySelectorAll('.btn-primary, .btn-ghost');
    const heroResetTargets = [ "#hero-title", ...heroButtons].filter(Boolean);

    heroSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
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

    heroSection.addEventListener('mouseleave', () => {
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
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });
}

// ============================================================
// 4. Hero Başlık — Harf Harf Animasyon
// ============================================================
const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
    heroTitle.querySelectorAll('span').forEach(span => {
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

// ============================================================
// 5. Stats — Sayaç Animasyonu (CountUp)
// ============================================================
document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));

    ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: 1.8,
                ease: "power2.out",
                onUpdate() {
                    el.textContent = Math.round(this.targets()[0].val) + "+";
                }
            });
        }
    });
});

// ============================================================
// 6. Section Bazlı GSAP Geçişleri
// ============================================================
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
    const revealHeader = (sectionSelector, options = {}) => {
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
    };

    revealHeader("#services");
    revealHeader("#pricing", { y: 42 });
    revealHeader("#testimonials", { y: 42 });
    revealHeader("#contact", { y: 46 });

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

    // Safety: if any nested pricing elements get stuck at opacity:0 (e.g. due to scroll quirks),
    // force buttons visible once the section is in view.
    ScrollTrigger.create({
        trigger: "#pricing",
        start: "top 85%",
        onEnter: () => gsap.set("#pricing .pricing-btn", { autoAlpha: 1, clearProps: "transform" }),
        onEnterBack: () => gsap.set("#pricing .pricing-btn", { autoAlpha: 1, clearProps: "transform" }),
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: "#testimonials",
            start: "top 72%",
            once: true,
        }
    })
        .from("#testimonials .testimonial-card", {
            x: (index) => index === 1 ? 0 : index === 0 ? -60 : 60,
            y: 32,
            opacity: 0,
            rotate: (index) => index === 1 ? 0 : index === 0 ? -2 : 2,
            stagger: 0.12,
            duration: 0.82,
        }, 0.12)
        .from("#testimonials .testimonial-stars, #testimonials .testimonial-text, #testimonials .testimonial-author", {
            y: 16,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
        }, 0.26);

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
});

// prefers-reduced-motion: tüm animasyonları kapat
mm.add("(prefers-reduced-motion: reduce)", () => {
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

// ============================================================
// 7. Portfolio — Yatay Kaydırma (Pin + Scrub)
// ============================================================
const track = document.getElementById('portfolio-track');
const workSection = document.getElementById('work');
const portfolioProgressBar = document.getElementById('portfolio-progress-bar');
if (track && workSection) {
    const portfolioCards = gsap.utils.toArray('.portfolio-card');

    mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isDesktop = () => window.innerWidth >= 1024;
        const getScrollEndBuffer = () => isDesktop()
            ? Math.max(window.innerWidth * 0.28, 220)
            : Math.max(window.innerWidth * 0.18, 120);
        const getScrollDist = () => Math.max(0, track.scrollWidth - workSection.clientWidth);
        const getTotalScrollDist = () => getScrollDist() + getScrollEndBuffer();
        const getSnapPoints = () => {
            const maxScroll = getTotalScrollDist();
            if (!maxScroll) return [0];

            return [0, ...portfolioCards.map((card) => gsap.utils.clamp(0, 1, card.offsetLeft / maxScroll))];
        };

        const introTween = gsap.timeline({
            scrollTrigger: {
                trigger: workSection,
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
            .from(portfolioCards, {
                x: () => isDesktop() ? 90 : 52,
                y: () => isDesktop() ? 40 : 24,
                opacity: 0,
                rotateY: (index) => isDesktop() ? (index % 2 === 0 ? -12 : 12) : 0,
                stagger: 0.12,
                duration: () => isDesktop() ? 0.95 : 0.72,
                ease: "power3.out",
            }, 0.14);

        const horizontalTween = gsap.to(track, {
            x: () => -getScrollDist(),
            ease: "none",
            scrollTrigger: {
                trigger: workSection,
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                fastScrollEnd: true,
                start: "top top",
                end: () => `+=${Math.max(getTotalScrollDist(), 1)}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (portfolioProgressBar) {
                        gsap.set(portfolioProgressBar, {
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

        portfolioCards.forEach((card, index) => {
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
            if (portfolioProgressBar) {
                gsap.set(portfolioProgressBar, { clearProps: "all" });
            }
            gsap.set(track, { clearProps: "transform" });
        };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { clearProps: "transform" });
        if (portfolioProgressBar) {
            gsap.set(portfolioProgressBar, { clearProps: "all" });
        }

        const mobileTween = gsap.timeline({
            scrollTrigger: {
                trigger: workSection,
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
            .from(portfolioCards, {
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

// ============================================================
// 8. Hizmet Kartları — GSAP Hover (CSS yerine)
// ============================================================
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

// ============================================================
// 9. Portfolio Kartları — Hover Tilt Efekti
// ============================================================
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

// ============================================================
// 9.5 Oyun Kartları — Hover Derinliği
// ============================================================
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
            gsap.to(thumb, {
                scale: 1.03,
                duration: 0.45,
                overwrite: "auto",
            });
        }

        if (token) {
            gsap.to(token, {
                y: -4,
                rotate: -4,
                duration: 0.35,
                overwrite: "auto",
            });
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
            gsap.to(thumb, {
                scale: 1,
                duration: 0.45,
                overwrite: "auto",
            });
        }

        if (token) {
            gsap.to(token, {
                y: 0,
                rotate: 0,
                duration: 0.4,
                overwrite: "auto",
            });
        }
    });
});

// ============================================================
// 9.6 Referans Kartları — Hover
// ============================================================
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

// ============================================================
// 10. Pricing Kartları — Popular badge pulse
// ============================================================
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

// ============================================================
// 11. İletişim Formu — Formspree Fetch (Backend'siz)
// ============================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                gsap.to(contactForm, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    onComplete: () => {
                        contactForm.classList.add('hidden');
                        formStatus.classList.remove('hidden');
                        gsap.from(formStatus, { opacity: 0, y: 20, duration: 0.5 });
                    }
                });
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Teklif İste';
            }
        } catch {
            alert('Bağlantı hatası. Lütfen internetinizi kontrol edin.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Teklif İste';
        }
    });
}

// ============================================================
// 12. Lucide Icons — En son çağır (DOM hazır olsun)
// ============================================================
lucide.createIcons();

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// ============================================================
// 10. Theme Toggle
// ============================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        if (htmlEl.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
}
