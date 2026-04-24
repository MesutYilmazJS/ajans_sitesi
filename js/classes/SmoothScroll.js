export default class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.lenis = new Lenis({
            duration: 1.1,
            lerp: 0.08,
            wheelMultiplier: 1.0,
            smoothTouch: true, // Enable Lenis on mobile devices
            infinite: false,
        });

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        this.lenis.on('scroll', ScrollTrigger.update);

        this.initAnchorLinks();
    }

    initAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) this.lenis.scrollTo(target, { offset: -80, duration: 1.5 });
            });
        });
    }
}
