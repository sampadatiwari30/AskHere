
class ThemeManager {
    constructor() {
        this.LIGHT_THEME = 'light';
        this.DARK_THEME = 'dark';
        this.STORAGE_KEY = 'askhere-theme';
        this.TRANSITION_CLASS = 'theme-transitioning';
        this.TRANSITION_DURATION = 300; 
        this.init();
    }
    init() {
        this.setInitialTheme();
        this.attachEventListeners();
        this.detectSystemPreference();
    }
    setInitialTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        
        if (savedTheme) {
            this.setTheme(savedTheme, false);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme(this.DARK_THEME, false);
        } else {
            this.setTheme(this.LIGHT_THEME, false);
        }
    }
    /**
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} animate - whether to animate transition
     */
    setTheme(theme, animate = true) {
        if (![this.LIGHT_THEME, this.DARK_THEME].includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }
        if (animate) {
            document.documentElement.classList.add(this.TRANSITION_CLASS);
        }
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateToggleButtons(theme);
        this.updateMetaThemeColor(theme);
        if (animate) {
            setTimeout(() => {
                document.documentElement.classList.remove(this.TRANSITION_CLASS);
            }, this.TRANSITION_DURATION);
        }
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme, timestamp: new Date().toISOString() }
        }));
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || this.LIGHT_THEME;
        const newTheme = currentTheme === this.LIGHT_THEME ? this.DARK_THEME : this.LIGHT_THEME;
        this.setTheme(newTheme, true);
    }
    /**
     * @returns {string} 
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.LIGHT_THEME;
    }
    /**
     * Update all toggle buttons
     * @param {string} theme 
     */
    updateToggleButtons(theme) {
        const toggleButtons = document.querySelectorAll('[id="theme-toggle"], .theme-toggle-btn');
        const icon = theme === this.DARK_THEME ? '☀️' : '🌙';
        const ariaLabel = theme === this.DARK_THEME ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        toggleButtons.forEach(btn => {
            btn.innerHTML = icon;
            btn.setAttribute('aria-label', ariaLabel);
            btn.setAttribute('title', ariaLabel);
        });
    }

    /**
     * @param {string} theme 
     */
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        const color = theme === this.DARK_THEME ? '#0F172A' : '#FFFFFF';
        metaThemeColor.content = color;
    }

    detectSystemPreference() {
        if (!window.matchMedia) return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        darkModeQuery.addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            if (!savedTheme) {
                const newTheme = e.matches ? this.DARK_THEME : this.LIGHT_THEME;
                this.setTheme(newTheme, true);
            }
        });
    }

    attachEventListeners() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindToggleButtons();
            });
        } else {
            this.bindToggleButtons();
        }
    }

    bindToggleButtons() {
        const toggleButtons = document.querySelectorAll('[id="theme-toggle"], .theme-toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });

            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}
