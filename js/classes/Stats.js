export default class Stats {
    constructor() {
        this.elements = document.querySelectorAll('[data-count]');
        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        this.elements.forEach(el => {
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
    }
}
