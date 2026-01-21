// Theme Toggle Functionality
(function() {
    'use strict';

    const THEME_KEY = 'askhere-theme';

    // Get saved theme or default to light
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || 'light';
    }

    // Save theme preference
    function saveTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        toggleButtons.forEach(btn => {
            const sunIcon = btn.querySelector('.fa-sun');
            const moonIcon = btn.querySelector('.fa-moon');
            if (sunIcon && moonIcon) {
                if (theme === 'dark') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        });
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        saveTheme(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Attach event listeners to all toggle buttons
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Expose for manual use if needed
    window.AskHereTheme = {
        toggle: toggleTheme,
        set: function(theme) {
            applyTheme(theme);
            saveTheme(theme);
        },
        get: getSavedTheme
    };
})();
