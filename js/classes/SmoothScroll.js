export default class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        if (typeof Lenis === 'undefined') {
            console.warn('Lenis kütüphanesi yüklenemedi. Varsayılan kaydırma kullanılacak.');
            this.initFallbackAnchorLinks();
            return;
        }

        try {
            this.lenis = new Lenis({
                duration: 1.1,
                lerp: 0.08,
                wheelMultiplier: 1.0,
                infinite: false,
            });

            gsap.ticker.add((time) => {
                if (this.lenis) {
                    this.lenis.raf(time * 1000);
                }
            });
            gsap.ticker.lagSmoothing(0);
            this.lenis.on('scroll', ScrollTrigger.update);

            this.initAnchorLinks();
        } catch (error) {
            console.error('Lenis başlatılırken hata oluştu:', error);
            this.initFallbackAnchorLinks();
        }
    }

    initAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (this.lenis) {
                        this.lenis.scrollTo(target, { offset: -80, duration: 1.5 });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    initFallbackAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}
