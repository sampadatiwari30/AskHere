 // Posts Data
        const posts = [
            {
                id: 1,
                author: {
                    name: "Michael Chen",
                    headline: "Software Engineer at Google | Full-Stack Developer",
                    image: "https://i.pravatar.cc/150?img=12"
                },
                timestamp: "2h",
                content: "🚀 Excited to share that our team just launched a new feature that will revolutionize how developers collaborate on code reviews!\n\nAfter 6 months of hard work, we've built an AI-powered code review assistant that:\n\n✅ Identifies potential bugs before they reach production\n✅ Suggests performance optimizations\n✅ Ensures consistent code style across the team\n\nWhat tools do you use for code reviews? Would love to hear your thoughts!\n\n#SoftwareEngineering #AI #Development",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
                reactions: { count: 247, types: ['like', 'love', 'support'] },
                comments: 38,
                reposts: 12
            },
            {
                id: 2,
                author: {
                    name: "Emily Rodriguez",
                    headline: "Product Designer at Figma | UX/UI Specialist",
                    image: "https://i.pravatar.cc/150?img=45"
                },
                timestamp: "4h",
                content: "Design thinking isn't just about making things look pretty - it's about solving real problems for real people. 💡\n\nJust wrapped up a 3-month project where we redesigned the entire onboarding flow for a fintech app. The results?\n\n📈 User retention increased by 45%\n📈 Time to first transaction decreased by 60%\n📈 User satisfaction scores jumped from 3.2 to 4.7\n\nKey takeaway: Always validate your assumptions with real user data. What looked good in Figma didn't always translate to better user experience.\n\n#ProductDesign #UX #UserExperience",
                reactions: { count: 512, types: ['like', 'love', 'support'] },
                comments: 67,
                reposts: 28
            },
            {
                id: 3,
                author: {
                    name: "David Thompson",
                    headline: "CEO at StartupLabs | Angel Investor | Mentor",
                    image: "https://i.pravatar.cc/150?img=68"
                },
                timestamp: "6h",
                content: "Had an incredible conversation with a founder today who's building in the AI space. 🤖\n\nThey shared something that really resonated with me: \"We're not trying to replace humans - we're building tools that make humans superhuman.\"\n\nThis is the mindset that separates good AI companies from great ones. The future isn't about AI vs humans - it's about AI + humans creating things neither could do alone.\n\nTo all the founders out there: What problem are you solving that makes people's lives genuinely better?\n\n#Startups #AI #Entrepreneurship #Innovation",
                reactions: { count: 891, types: ['like', 'love', 'support'] },
                comments: 124,
                reposts: 56
            },
            {
                id: 4,
                author: {
                    name: "Jessica Kim",
                    headline: "Data Scientist at Amazon | ML Engineer",
                    image: "https://i.pravatar.cc/150?img=23"
                },
                timestamp: "8h",
                content: "Just published my first research paper on interpretable machine learning! 📊🎉\n\nSpent the last year working on methods to make ML models more transparent and explainable. It's crucial that we understand WHY models make certain predictions, especially in high-stakes domains like healthcare and finance.\n\nLink to the paper in comments. Would love feedback from the ML community!\n\n#MachineLearning #DataScience #Research #AI",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
                reactions: { count: 324, types: ['like', 'love', 'support'] },
                comments: 45,
                reposts: 89
            },
            {
                id: 5,
                author: {
                    name: "Robert Martinez",
                    headline: "VP of Engineering at Stripe | Tech Leader",
                    image: "https://i.pravatar.cc/150?img=51"
                },
                timestamp: "12h",
                content: "Leadership lesson from 15 years in tech:\n\nThe best leaders don't have all the answers. They ask the right questions.\n\nYour job as a leader isn't to be the smartest person in the room - it's to:\n\n1. Create an environment where smart people can do their best work\n2. Remove blockers that slow your team down\n3. Provide context and direction, not micromanagement\n4. Celebrate wins and learn from failures together\n\nWhat's the best leadership advice you've received?\n\n#Leadership #Engineering #Management #TechCareers",
                reactions: { count: 1247, types: ['like', 'love', 'support'] },
                comments: 189,
                reposts: 234
            }
        ];

        // Theme Toggle - handled by theme.js

        // Render Posts
        function renderPosts() {
            const container = document.getElementById('postsContainer');
            
            // Simulate loading
            setTimeout(() => {
                container.innerHTML = posts.map(post => `
                    <div class="card post-card">
                        <div class="post-header">
                            <img src="${post.author.image}" alt="${post.author.name}" class="post-author-img">
                            <div class="post-author-info">
                                <div>
                                    <span class="post-author-name">${post.author.name}</span>
                                </div>
                                <div class="post-author-headline">${post.author.headline}</div>
                                <div class="post-timestamp">
                                    ${post.timestamp} • <i class="fas fa-globe-americas"></i>
                                </div>
                            </div>
                            <div class="post-menu" onclick="toggleMenu(event, ${post.id})">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        
                        <div class="post-content collapsed" id="content-${post.id}">
                            ${post.content}
                        </div>
                        ${post.content.length > 200 ? `
                            <div class="post-see-more" onclick="toggleContent(${post.id})">
                                <span id="see-more-${post.id}">...see more</span>
                            </div>
                        ` : ''}
                        
                        ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                        
                        <div class="post-reactions">
                            <div class="post-reaction-icons">
                                ${post.reactions.types.map(type => `
                                    <div class="reaction-icon ${type}">
                                        ${type === 'like' ? '👍' : type === 'love' ? '❤️' : '💡'}
                                    </div>
                                `).join('')}
                                <span>${post.reactions.count}</span>
                            </div>
                            <div class="post-comments-count">
                                ${post.comments} comments • ${post.reposts} reposts
                            </div>
                        </div>
                        
                        <div class="post-divider"></div>
                        
                        <div class="post-actions">
                            <div class="post-action" onclick="toggleLike(event, ${post.id})">
                                <i class="far fa-thumbs-up"></i>
                                <span>Like</span>
                            </div>
                            <div class="post-action">
                                <i class="far fa-comment"></i>
                                <span>Comment</span>
                            </div>
                            <div class="post-action">
                                <i class="fas fa-retweet"></i>
                                <span>Repost</span>
                            </div>
                            <div class="post-action">
                                <i class="far fa-paper-plane"></i>
                                <span>Send</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }, 800);
        }

        // Toggle See More
        function toggleContent(postId) {
            const content = document.getElementById(`content-${postId}`);
            const btn = document.getElementById(`see-more-${postId}`);
            
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                btn.textContent = 'see less';
            } else {
                content.classList.add('collapsed');
                btn.textContent = '...see more';
            }
        }

        // Toggle Like
        function toggleLike(event, postId) {
            const btn = event.currentTarget;
            btn.classList.toggle('liked');
            const icon = btn.querySelector('i');
            
            if (btn.classList.contains('liked')) {
                icon.className = 'fas fa-thumbs-up';
                btn.style.color = '#378fe9';
            } else {
                icon.className = 'far fa-thumbs-up';
                btn.style.color = '';
            }
        }

        // Toggle Menu
        function toggleMenu(event, postId) {
            event.stopPropagation();
            
            // Remove existing menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => menu.remove());
            
            const menu = document.createElement('div');
            menu.className = 'dropdown-menu show';
            menu.innerHTML = `
                <div class="dropdown-item">
                    <i class="fas fa-bookmark"></i>
                    <span>Save</span>
                </div>
                <div class="dropdown-item">
                    <i class="fas fa-user-plus"></i>
                    <span>Follow</span>
                </div>
                <div class="dropdown-item">
                    <i class="fas fa-link"></i>
                    <span>Copy link to post</span>
                </div>
                <div class="dropdown-item">
                    <i class="fas fa-eye-slash"></i>
                    <span>Hide post</span>
                </div>
                <div class="dropdown-item">
                    <i class="fas fa-flag"></i>
                    <span>Report</span>
                </div>
            `;
            
            const menuBtn = event.currentTarget;
            menuBtn.style.position = 'relative';
            menuBtn.appendChild(menu);
            
            // Close menu when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeMenu() {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                });
            }, 0);
        }

        // Initialize
        renderPosts();