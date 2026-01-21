 // ========================================
        // DOM Element References
        // ========================================
        const topNav = document.getElementById('topNav');
        const markAllReadBtn = document.getElementById('markAllReadBtn');
        const filterItems = document.querySelectorAll('.filter-item');
        const mobileFilterItems = document.querySelectorAll('.mobile-filter-item');
        const notificationCards = document.querySelectorAll('.notification-card');

        // ========================================
        // Sticky Header Shadow on Scroll
        // ========================================
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        });

        // ========================================
        // Filter Functionality - Desktop
        // ========================================
        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all filter items
                filterItems.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get selected filter
                const selectedFilter = item.getAttribute('data-filter');
                
                // Apply filter
                filterNotifications(selectedFilter);
            });
        });

        // ========================================
        // Filter Functionality - Mobile
        // ========================================
        mobileFilterItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all mobile filter items
                mobileFilterItems.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get selected filter
                const selectedFilter = item.getAttribute('data-filter');
                
                // Apply filter
                filterNotifications(selectedFilter);
            });
        });

        // ========================================
        // Filter Notifications Based on Category
        // ========================================
        function filterNotifications(filter) {
            notificationCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    // Show all notifications
                    card.classList.remove('d-none-custom');
                } else if (cardCategory === filter) {
                    // Show matching notifications
                    card.classList.remove('d-none-custom');
                } else {
                    // Hide non-matching notifications
                    card.classList.add('d-none-custom');
                }
            });
        }

        // ========================================
        // Mark Individual Notification as Read
        // ========================================
        notificationCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't mark as read if clicking on action buttons
                if (e.target.classList.contains('action-btn')) {
                    return;
                }
                
                // Remove unread status
                card.classList.remove('unread');
                
                // Remove unread indicator dot
                const unreadIndicator = card.querySelector('.unread-indicator');
                if (unreadIndicator) {
                    unreadIndicator.remove();
                }
            });
        });

        // ========================================
        // Mark All Notifications as Read
        // ========================================
        markAllReadBtn.addEventListener('click', () => {
            notificationCards.forEach(card => {
                // Remove unread class
                card.classList.remove('unread');
                
                // Remove unread indicator dot
                const unreadIndicator = card.querySelector('.unread-indicator');
                if (unreadIndicator) {
                    unreadIndicator.remove();
                }
            });
            
            // Optional: Visual feedback
            markAllReadBtn.style.opacity = '0.5';
            setTimeout(() => {
                markAllReadBtn.style.opacity = '1';
            }, 200);
        });

        // ========================================
        // Action Button Click Handlers
        // ========================================
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Prevent notification card click event
                e.stopPropagation();
                
                const card = btn.closest('.notification-card');
                const actionText = btn.textContent.trim();
                
                // Visual feedback
                btn.style.opacity = '0.6';
                setTimeout(() => {
                    btn.style.opacity = '1';
                }, 150);
                
                // Mark notification as read when action is taken
                card.classList.remove('unread');
                const unreadIndicator = card.querySelector('.unread-indicator');
                if (unreadIndicator) {
                    unreadIndicator.remove();
                }
                
                // Optional: Log action for debugging
                console.log(`Action "${actionText}" clicked`);
            });
        });

        // ========================================
        // Initialize: Show all notifications
        // ========================================
        filterNotifications('all');