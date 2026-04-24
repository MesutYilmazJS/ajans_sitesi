export default class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        if (this.cursor) {
            this.init();
        }
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.08,
                ease: "power2.out",
                overwrite: "auto",
            });
        });
    }
}
