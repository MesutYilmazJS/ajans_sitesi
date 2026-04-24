import SmoothScroll from './classes/SmoothScroll.js';
import CustomCursor from './classes/CustomCursor.js';
import Theme from './classes/Theme.js';
import Navigation from './classes/Navigation.js';
import Hero from './classes/Hero.js';
import Stats from './classes/Stats.js';
import Portfolio from './classes/Portfolio.js';
import SectionAnimations from './classes/SectionAnimations.js';
import InteractiveCards from './classes/InteractiveCards.js';
import ContactForm from './classes/ContactForm.js';
import Testimonials from './classes/Testimonials.js';

class App {
    constructor() {
        this.initGSAP();
        this.initComponents();
        this.initLucideIcons();
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({
            ease: "power3.out",
            duration: 0.9,
        });
    }

    initComponents() {
        // Lenis ile yumuşak kaydırma (smooth scroll) ve çapa (anchor) linklerini yönetir
        this.scroll = new SmoothScroll();
        
        // Ekranda fareyi takip eden özel imleci çalıştırır
        this.cursor = new CustomCursor();
        
        // Açık/Koyu (Light/Dark) tema geçişini ve localStorage kaydını yönetir
        this.theme = new Theme();
        
        // Navbar scroll efektleri ve mobil hamburger menü işlemlerini sağlar
        this.navigation = new Navigation();
        
        // Hero (ana giriş) bölümündeki animasyonları ve fareye duyarlı hareket efektini kontrol eder
        this.hero = new Hero();
        
        // Ekrana girildiğinde istatistik sayılarını (örn. 0'dan 50'ye) artırarak sayan sistem
        this.stats = new Stats();
        
        // "Projeler" bölümündeki yatay kaydırma (horizontal scroll) mantığını yönetir
        this.portfolio = new Portfolio();
        
        // Sayfa aşağı kaydıkça bölümlerin (Hizmetler, Süreç vb.) yavaşça belirmesini (reveal) sağlar
        this.animations = new SectionAnimations();
        
        // Kartların (Hizmet, Portfolyo, Oyun vb.) üzerindeki 3D Tilt ve hover (üzerine gelme) efektlerini uygular
        this.interactiveCards = new InteractiveCards();
        
        // Referanslar (Testimonials) için sonsuz kayan (marquee) animasyonunu yönetir
        this.testimonials = new Testimonials();
        
        // İletişim formunun sayfa yenilenmeden (AJAX/Fetch) gönderilmesini sağlar
        this.contactForm = new ContactForm();
    }

    initLucideIcons() {
        lucide.createIcons();

        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
