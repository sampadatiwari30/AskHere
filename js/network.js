
  // Handle sidebar menu clicks
        function handleSidebarClick(section) {
            console.log(`Navigating to: ${section}`);
            // Placeholder for navigation logic
            // In a real application, this would route to different pages or filter content
        }

        // Handle connect button click
        function handleConnect(button) {
            button.innerHTML = '<i class="fas fa-clock"></i> Pending';
            button.disabled = true;
            button.style.cursor = 'not-allowed';
            
            // Add animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            console.log('Connection request sent');
            // In a real application, this would send a request to the backend
        }

        // Handle accept invitation
        function handleAccept(button) {
            const card = button.closest('.invitation-card');
            card.style.transition = 'all 0.3s';
            card.style.opacity = '0';
            card.style.transform = 'translateX(100px)';
            
            setTimeout(() => {
                card.remove();
                console.log('Invitation accepted');
                // In a real application, this would send a request to the backend
            }, 300);
        }

        // Handle ignore invitation
        function handleIgnore(button) {
            const card = button.closest('.invitation-card');
            card.style.transition = 'all 0.3s';
            card.style.opacity = '0';
            card.style.transform = 'translateX(-100px)';
            
            setTimeout(() => {
                card.remove();
                console.log('Invitation ignored');
                // In a real application, this would send a request to the backend
            }, 300);
        }

        // Handle tab switching
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                console.log('Tab switched:', this.textContent);
                // In a real application, this would load different invitation data
            });
        });

        // Mobile menu toggle (for future enhancement)
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar-menu');
                sidebar.classList.toggle('show');
            });
        }

        // Add staggered animation to profile cards
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.profile-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });