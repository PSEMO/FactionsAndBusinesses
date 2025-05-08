// public/js/script.js

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize Bootstrap Tooltips ---
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        console.log(`Initializing ${tooltipTriggerList.length} tooltips...`); // Debug log
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        console.log("Tooltips initialized:", tooltipList); // Debug log
    } else {
        console.log("No tooltip triggers found."); // Debug log
    }


    // --- Theme Toggle Logic ---
    const themeToggleButton = document.getElementById('theme-toggle-float');
    const htmlElement = document.documentElement;

    if (themeToggleButton && htmlElement) {
        console.log("Theme toggle button found."); // Debug log

        // Function to update button icon and tooltip based on current theme
        const updateThemeUI = (theme) => {
            const isDark = theme === 'dark';
            themeToggleButton.textContent = isDark ? '☀️' : '🌓'; // Sun for dark, Moon for light

            // Get the tooltip instance
            const tooltip = bootstrap.Tooltip.getInstance(themeToggleButton);
            const newTitle = `Switch to ${isDark ? 'light' : 'dark'} mode`;

            if (tooltip) {
                console.log("Tooltip instance found. Attempting to update title."); // Debug log
                try {
                    // --- Preferred & Safer Method ---
                    // Update the attribute Bootstrap uses to store the title
                    themeToggleButton.setAttribute('data-bs-original-title', newTitle);

                } catch (e) {
                    console.error("Error updating tooltip title:", e);
                    // Fallback: Update the regular title attribute just in case
                    themeToggleButton.setAttribute('title', newTitle);
                }
            } else {
                // If the tooltip instance somehow doesn't exist yet (shouldn't happen after init)
                // Just update the original title attribute.
                themeToggleButton.setAttribute('title', newTitle);
                console.warn("Tooltip instance not found for theme toggle button. Updated title attribute directly."); // Debug log
            }

            console.log(`Theme UI updated for: ${theme}. Target Tooltip title: ${newTitle}`); // Debug log
        };

        // Set initial icon/tooltip based on the theme applied by the script in <head>
        const initialTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
        updateThemeUI(initialTheme);

        // Add click listener
        themeToggleButton.addEventListener('click', () => {
            console.log("Theme toggle clicked."); // Debug log
            const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
            console.log(`Theme changed to ${newTheme} and saved.`); // Debug log
        });

    } else {
        if (!themeToggleButton) console.error("Theme toggle button (#theme-toggle-float) not found!");
        if (!htmlElement) console.error("HTML element (document.documentElement) not found!");
    }

}); // End DOMContentLoaded