export default class Theme {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.htmlEl = document.documentElement;
        if (this.themeToggleBtn) {
            this.init();
        }
    }

    init() {
        this.themeToggleBtn.addEventListener('click', () => {
            this.htmlEl.classList.toggle('dark');
            if (this.htmlEl.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }
}
