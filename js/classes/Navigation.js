import { isMobileViewport } from '../utils.js';

export default class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initScrollEffect();
    }

    setNavToggleIcon(iconName) {
        if (!this.navToggle) return;
        this.navToggle.innerHTML = `<i data-lucide="${iconName}" class="w-5 h-5"></i>`;
        lucide.createIcons();
    }

    closeMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;
        this.navMenu.classList.remove('is-open');
        this.navToggle.classList.remove('is-active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('aria-label', 'Menüyü aç');
        document.body.classList.remove('nav-open');
        this.setNavToggleIcon('menu-2');
    }

    openMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;
        this.navMenu.classList.add('is-open');
        this.navToggle.classList.add('is-active');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navToggle.setAttribute('aria-label', 'Menüyü kapat');
        document.body.classList.add('nav-open');
        this.setNavToggleIcon('x');
    }

    initMobileMenu() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                const isOpen = this.navMenu.classList.contains('is-open');
                if (isOpen) {
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });

            this.navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
                link.addEventListener('click', () => {
                    if (isMobileViewport.matches) this.closeMobileMenu();
                });
            });

            window.addEventListener('resize', () => {
                if (!isMobileViewport.matches) this.closeMobileMenu();
            });
        }
    }

    initScrollEffect() {
        if (this.navbar) {
            gsap.to(this.navbar, {
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                backgroundColor: "rgba(var(--rgb-bg), 0.85)",
                borderColor: "rgba(var(--rgb-text), 0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top -50",
                    end: "+=150",
                    scrub: true,
                }
            });
        }
    }
}
