 // Sample conversation data
        const conversations = [
            {
                id: 1,
                name: "Sarah Mitchell",
                headline: "Product Manager at TechCorp",
                avatar: "https://i.pravatar.cc/150?img=1",
                lastMessage: "Thanks for connecting! I'd love to discuss the project.",
                timestamp: "2h",
                unread: true,
                messages: [
                    { type: "received", text: "Hi! Thanks for accepting my connection request.", timestamp: "10:30 AM" },
                    { type: "sent", text: "Happy to connect! I saw your profile and was impressed.", timestamp: "10:32 AM" },
                    { type: "received", text: "Thanks for connecting! I'd love to discuss the project.", timestamp: "10:35 AM" }
                ]
            },
            {
                id: 2,
                name: "Michael Chen",
                headline: "Senior Software Engineer at Innovation Labs",
                avatar: "https://i.pravatar.cc/150?img=12",
                lastMessage: "The meeting has been scheduled for tomorrow at 3 PM.",
                timestamp: "5h",
                unread: false,
                messages: [
                    { type: "sent", text: "Hey Michael, are we still on for the code review?", timestamp: "Yesterday" },
                    { type: "received", text: "Yes! Let me send you a calendar invite.", timestamp: "Yesterday" },
                    { type: "received", text: "The meeting has been scheduled for tomorrow at 3 PM.", timestamp: "9:00 AM" }
                ]
            },
            {
                id: 3,
                name: "Emily Rodriguez",
                headline: "UX Designer | Helping brands tell their story",
                avatar: "https://i.pravatar.cc/150?img=5",
                lastMessage: "I've sent over the design mockups. Let me know what you think!",
                timestamp: "1d",
                unread: true,
                messages: [
                    { type: "received", text: "Working on the final designs for the dashboard.", timestamp: "2 days ago" },
                    { type: "sent", text: "Great! Can't wait to see them.", timestamp: "2 days ago" },
                    { type: "received", text: "I've sent over the design mockups. Let me know what you think!", timestamp: "Yesterday" }
                ]
            },
            {
                id: 4,
                name: "David Thompson",
                headline: "Marketing Director at Global Solutions",
                avatar: "https://i.pravatar.cc/150?img=13",
                lastMessage: "Perfect! I'll send the proposal by end of day.",
                timestamp: "2d",
                unread: false,
                messages: [
                    { type: "sent", text: "Hi David, when can we expect the marketing proposal?", timestamp: "3 days ago" },
                    { type: "received", text: "Perfect! I'll send the proposal by end of day.", timestamp: "2 days ago" }
                ]
            },
            {
                id: 5,
                name: "Jennifer Lee",
                headline: "CEO & Founder at StartupHub",
                avatar: "https://i.pravatar.cc/150?img=9",
                lastMessage: "Would love to grab coffee and discuss potential collaboration.",
                timestamp: "1w",
                unread: false,
                messages: [
                    { type: "received", text: "I came across your profile and love what you're doing!", timestamp: "1 week ago" },
                    { type: "sent", text: "Thank you! I appreciate that.", timestamp: "1 week ago" },
                    { type: "received", text: "Would love to grab coffee and discuss potential collaboration.", timestamp: "1 week ago" }
                ]
            }
        ];

        let currentConversationId = null;

        // Initialize conversations list
        function loadConversations() {
            const list = document.getElementById('conversationsList');
            list.innerHTML = conversations.map(conv => `
                <div class="conversation-item ${conv.unread ? 'unread' : ''}" data-id="${conv.id}">
                    <img src="${conv.avatar}" alt="${conv.name}" class="conversation-avatar">
                    <div class="conversation-content">
                        <div class="conversation-header">
                            <span class="conversation-name">${conv.name}</span>
                            <span class="conversation-time">${conv.timestamp}</span>
                        </div>
                        <div class="conversation-preview">${conv.lastMessage}</div>
                    </div>
                    ${conv.unread ? '<span class="unread-dot"></span>' : ''}
                </div>
            `).join('');

            // Add click handlers
            document.querySelectorAll('.conversation-item').forEach(item => {
                item.addEventListener('click', () => {
                    const id = parseInt(item.getAttribute('data-id'));
                    openChat(id);
                });
            });
        }

        // Open chat
        function openChat(id) {
            const conv = conversations.find(c => c.id === id);
            if (!conv) return;

            currentConversationId = id;

            // Update active state
            document.querySelectorAll('.conversation-item').forEach(item => {
                item.classList.remove('active');
                if (parseInt(item.getAttribute('data-id')) === id) {
                    item.classList.add('active');
                    item.classList.remove('unread');
                    const dot = item.querySelector('.unread-dot');
                    if (dot) dot.remove();
                }
            });

            // Update chat panel
            const chatPanel = document.getElementById('chatPanel');
            chatPanel.classList.remove('empty');
            chatPanel.classList.add('active');

            chatPanel.innerHTML = `
                <div class="chat-header">
                    <button class="back-button" onclick="closeChat()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="chat-user-info">
                        <img src="${conv.avatar}" alt="${conv.name}" class="chat-avatar">
                        <div class="chat-user-details">
                            <h3>${conv.name}</h3>
                            <p>${conv.headline}</p>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button><i class="fas fa-search"></i></button>
                        <button><i class="fas fa-ellipsis-v"></i></button>
                    </div>
                </div>
                <div class="messages-container" id="messagesContainer">
                    ${conv.messages.map(msg => `
                        <div class="message ${msg.type}">
                            <div class="message-bubble">
                                <div class="message-text">${msg.text}</div>
                                <div class="message-timestamp">${msg.timestamp}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="message-input-container">
                    <div class="message-input-wrapper">
                        <button><i class="far fa-smile"></i></button>
                        <input type="text" placeholder="Write a message…" id="messageInput">
                        <button><i class="fas fa-paperclip"></i></button>
                        <button class="send-button" id="sendButton" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            `;

            // Scroll to bottom
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Setup message input handlers
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');

            messageInput.addEventListener('input', () => {
                sendButton.disabled = !messageInput.value.trim();
            });

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && messageInput.value.trim()) {
                    sendMessage();
                }
            });

            sendButton.addEventListener('click', sendMessage);
        }

        // Send message
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const text = input.value.trim();
            if (!text) return;

            const conv = conversations.find(c => c.id === currentConversationId);
            const now = new Date();
            const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

            // Add message to conversation data
            conv.messages.push({
                type: 'sent',
                text: text,
                timestamp: timestamp
            });

            // Update last message in conversation list
            conv.lastMessage = text;
            conv.timestamp = 'Just now';

            // Add message to UI
            const messagesContainer = document.getElementById('messagesContainer');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <div class="message-bubble">
                    <div class="message-text">${text}</div>
                    <div class="message-timestamp">${timestamp}</div>
                </div>
            `;
            messagesContainer.appendChild(messageDiv);

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Clear input
            input.value = '';
            document.getElementById('sendButton').disabled = true;

            // Update conversation preview
            loadConversations();

            // Simulate received response after 2 seconds
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! I'll get back to you shortly.",
                    "Got it, let me check and respond soon.",
                    "Sounds good! I'll review and reply.",
                    "Thanks for reaching out!"
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                
                conv.messages.push({
                    type: 'received',
                    text: response,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                });

                const responseDiv = document.createElement('div');
                responseDiv.className = 'message received';
                responseDiv.innerHTML = `
                    <div class="message-bubble">
                        <div class="message-text">${response}</div>
                        <div class="message-timestamp">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                    </div>
                `;
                messagesContainer.appendChild(responseDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;

                conv.lastMessage = response;
                conv.timestamp = 'Just now';
                loadConversations();
            }, 2000);
        }

        // Close chat (mobile)
        function closeChat() {
            document.getElementById('chatPanel').classList.remove('active');
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.conversation-item').forEach(item => {
                const name = item.querySelector('.conversation-name').textContent.toLowerCase();
                const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
                if (name.includes(query) || preview.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Initialize
        loadConversations();