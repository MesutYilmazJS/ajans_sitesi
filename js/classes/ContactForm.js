export default class ContactForm {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.formStatus = document.getElementById('form-status');
        this.submitBtn = document.getElementById('submit-btn');

        if (this.contactForm) {
            this.init();
        }
    }

    init() {
        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Gönderiliyor...';

            try {
                const response = await fetch(this.contactForm.action, {
                    method: 'POST',
                    body: new FormData(this.contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    gsap.to(this.contactForm, {
                        opacity: 0,
                        y: -20,
                        duration: 0.4,
                        onComplete: () => {
                            this.contactForm.classList.add('hidden');
                            this.formStatus.classList.remove('hidden');
                            gsap.from(this.formStatus, { opacity: 0, y: 20, duration: 0.5 });
                        }
                    });
                } else {
                    alert('Bir hata oluştu. Lütfen tekrar deneyin.');
                    this.submitBtn.disabled = false;
                    this.submitBtn.textContent = 'Teklif İste';
                }
            } catch {
                alert('Bağlantı hatası. Lütfen internetinizi kontrol edin.');
                this.submitBtn.disabled = false;
                this.submitBtn.textContent = 'Teklif İste';
            }
        });
    }
}
