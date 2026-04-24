export default class Testimonials {
    constructor() {
        this.track = document.querySelector('#testimonials-track');
        this.marqueePart = document.querySelector('.marquee-part');
        
        if (!this.track || !this.marqueePart) return;
        
        this.init();
    }

    init() {
        // Kartları içeren parçayı klonla ki kesintisiz döngü oluşsun
        const clone = this.marqueePart.cloneNode(true);
        this.track.appendChild(clone);

        // Responsive hız ayarı
        const isMobile = window.innerWidth < 768;
        const duration = isMobile ? 15 : 25;

        // GSAP animasyonu: track'i tam %50 (kendi genişliğinin yarısı) kadar sola kaydır.
        // İki kopya olduğu için %50 kaydığında ikinci kopya tam ilk kopyanın başladığı yere gelir.
        this.animation = gsap.to(this.track, {
            xPercent: -50,
            ease: "none",
            duration: duration,
            repeat: -1
        });

        // Etkileşimler
        this.track.addEventListener('mouseenter', () => {
            gsap.to(this.animation, { timeScale: 0.2, duration: 0.5, ease: "power2.out" });
        });

        this.track.addEventListener('mouseleave', () => {
            gsap.to(this.animation, { timeScale: 1, duration: 0.5, ease: "power2.out" });
        });

        // Yeniden boyutlandırmada hızı güncelle
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth < 768;
            const newDuration = newIsMobile ? 15 : 25;
            if (this.animation.duration() !== newDuration) {
                this.animation.duration(newDuration);
            }
        });
    }
}
