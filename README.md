# 🚀 MOTI | Digital Creative Agency Website

🌐 **Canlı Demo:** [https://mesutyilmazjs.github.io/ajans_sitesi/](https://mesutyilmazjs.github.io/ajans_sitesi/)

MOTI, web tasarımı, fullstack geliştirme ve mobil oyun alanlarında hizmet veren dijital bir kreatif ajans için tasarlanmış modern, yüksek performanslı ve etkileşimli bir web sitesi şablonudur.

Sistem, ES6+ nesne yönelimli (OOP) JavaScript mimarisi, GSAP ScrollTrigger animasyonları, Lenis pürüzsüz kaydırma motoru ve dinamik CSS tema yönetimi (Dark/Light Mode) ile inşa edilmiştir.

---

## ✨ Öne Çıkan Özellikler

* **🌊 Lenis Smooth Scroll:** Web sitesi genelinde ultra akıcı ve kontrollü kaydırma deneyimi.
* **🎭 GSAP & ScrollTrigger Animasyonları:**
  * Giriş (Hero) bölümünde parallax ve dinamik metin animasyonları.
  * Kaydırıldıkça beliren kademeli (reveal) bölüm efektleri.
  * **Projeler** alanında 3D derinlik algılı **yatay kaydırma (Horizontal Scroll)** ve canlı ilerleme çubuğu.
* **🖱️ Özel Fare İmleci (Custom Cursor):** İnteraktif elemanlar (butonlar, bağlantılar) üzerine gelindiğinde büyüyen, `mix-blend-mode` efektli imleç.
* **🌓 Dinamik Tema Desteği (Dark / Light Mode):** Koyu ve açık mod arasında anlık geçiş ve kullanıcının tercihini `localStorage` üzerinde saklama.
* **📊 Canlı İstatistik Sayıcıları:** Görüş alanına girildiğinde otomatik çalışan numaratörler.
* **📱 %100 Duyarlı (Responsive) Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu layout ve hamburger navigasyon menüsü.
* **📩 İletişim Formu Entegrasyonu:** Formspree / AJAX tabanlı, sayfa yenilenmeden çalışan iletişim formu.

---

## 🛠️ Kullanılan Teknolojiler

* **Core:** HTML5, CSS3, JavaScript (ES6+ Modules)
* **Styling & Design:**
  * [Tailwind CSS](https://tailwindcss.com/) - Hızlı ve esnek layout yönetimi.
  * Custom CSS Variables & Glassmorphism (Cam efekti) tasarım sistemi.
  * Google Fonts - *Plus Jakarta Sans*.
* **Animation & Scroll:**
  * [GSAP 3.12](https://greensock.com/gsap/) - Güçlü animasyon kütüphanesi.
  * [ScrollTrigger](https://greensock.com/scrolltrigger/) - Kaydırmaya duyarlı tetikleyiciler.
  * [Lenis Scroll](https://lenis.darkroom.engineering/) - Modern pürüzsüz kaydırma motoru.
* **Icons:** [Lucide Icons](https://lucide.dev/)

---

## 📂 Proje Dizin Yapısı

```text
ajans_sitesi/
├── index.html               # Ana HTML5 dokümanı ve semantik bölüm yapıları
├── README.md                # Proje dokümantasyonu
├── css/
│   └── style.css            # Özel CSS değişkenleri, UI bileşen stilleri & animasyonlar
└── js/
    ├── main.js              # Ana başlama noktası (App sınıfı & kütüphane başlatıcılar)
    ├── utils.js             # Yardımcı JavaScript fonksiyonları
    └── classes/             # Modüler Nesne Yönelimli (OOP) Bileşenler
        ├── ContactForm.js   # İletişim formu yönetimi
        ├── CustomCursor.js  # İnteraktif fare imleci
        ├── Hero.js          # Hero bölümü etkileşimleri
        ├── InteractiveCards.js # 3D Tilt ve kart hover efektleri
        ├── Navigation.js    # Navbar scroll stili ve mobil menü
        ├── Portfolio.js     # Yatay kaydırmalı (Horizontal Scroll) projeler bölümü
        ├── SectionAnimations.js # Scroll tabanlı reveal animasyonları
        ├── SmoothScroll.js  # Lenis kaydırma motoru & bağlantı geçişleri
        ├── Stats.js         # İstatistik sayacı animasyonları
        ├── Testimonials.js  # Müşteri yorumları marquee döngüsü
        └── Theme.js         # Light/Dark mode tema yönetimi
```

---

## 💻 Kurulum ve Çalıştırma

Proje herhangi bir derleme (build) veya Node.js bağımlılığı gerektirmez. Doğrudan tarayıcıda çalıştırılabilir.

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/MesutYilmazJS/ajans_sitesi.git
   cd ajans_sitesi
   ```

2. **Yerel Sunucuda Çalıştırın:**
   * VS Code kullanıyorsanız **Live Server** eklentisi ile `index.html` dosyasını açabilirsiniz.
   * Alternatif olarak Python ile yerel sunucu başlatabilirsiniz:
     ```bash
     python3 -m http.server 8000
     ```
   * Tarayıcınızda `http://localhost:8000` adresine gidin.

---

## ⚙️ Yapılandırma

### İletişim Formu (Formspree)
Formun e-postaları adresinize iletmesi için `index.html` içerisindeki form `action` URL'sini kendi Formspree ID'niz ile değiştirin:

```html
<!-- index.html -->
<form id="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Serbestçe kullanılabilir ve geliştirilebilir.
