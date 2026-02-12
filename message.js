const conversations = [
    {
        id: 1,
        name: "Sarah Johnson",
        headline: "Senior Product Manager at TechCorp",
        avatar: "https://i.pravatar.cc/150?img=1",
        online: true,
        messages: [
            { id: 1, type: "received", text: "Hi there! I saw your profile and wanted to connect.", time: "10:30 AM" },
            { id: 2, type: "sent", text: "Hello Sarah! Thanks for reaching out. How can I help?", time: "10:35 AM" },
            { id: 3, type: "received", text: "I'm looking for a developer for a new project. Are you available?", time: "10:36 AM" }
        ],
        unread: true,
        lastMsg: "I'm looking for a developer for a new project...",
        lastTime: "10:36 AM"
    },
    {
        id: 2,
        name: "Michael Chen",
        headline: "Software Engineer at Google",
        avatar: "https://i.pravatar.cc/150?img=12",
        online: false,
        messages: [
            { id: 1, type: "sent", text: "Hey Michael, are we still on for the code review?", time: "Yesterday" },
            { id: 2, type: "received", text: "Yes, definitely. Does 2 PM work?", time: "Yesterday" }
        ],
        unread: false,
        lastMsg: "Yes, definitely. Does 2 PM work?",
        lastTime: "Yesterday"
    },
    {
        id: 3,
        name: "Emily Davis",
        headline: "HR Specialist at StartupHub",
        avatar: "https://i.pravatar.cc/150?img=5",
        online: true,
        messages: [
            { id: 1, type: "received", text: "Your application has been received.", time: "Mon" }
        ],
        unread: false,
        lastMsg: "Your application has been received.",
        lastTime: "Mon"
    }
];

let activeChatId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderConversationList();
});

function renderConversationList() {
    const list = document.getElementById('conversationsList');
    list.innerHTML = conversations.map(conv => `
        <div class="conversation-item ${conv.unread ? 'unread' : ''} ${activeChatId === conv.id ? 'active' : ''}" 
             onclick="openChat(${conv.id})">
            <div class="conversation-avatar-wrapper">
                <img src="${conv.avatar}" alt="${conv.name}" class="conversation-avatar">
                ${conv.online ? '<div class="online-status"></div>' : ''}
            </div>
            <div class="conversation-info">
                <div class="info-top">
                    <div class="conversation-name">${conv.name}</div>
                    <div class="conversation-time">${conv.lastTime}</div>
                </div>
                <div class="conversation-preview">${conv.lastMsg}</div>
            </div>
        </div>
    `).join('');
}

function openChat(id) {
    activeChatId = id;
    const chat = conversations.find(c => c.id === id);
    
    if(chat.unread) {
        chat.unread = false;
        renderConversationList();
    }

    document.querySelectorAll('.conversation-item').forEach(el => el.classList.remove('active'));
    renderConversationList(); 

    const chatPanel = document.getElementById('chatPanel');
    chatPanel.classList.add('active');
    chatPanel.classList.remove('empty');

    chatPanel.innerHTML = `
        <div class="chat-header">
            <div class="d-flex align-items-center">
                <button class="back-btn" onclick="closeChat()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <img src="${chat.avatar}" class="rounded-circle me-2" width="40" height="40">
                <div class="chat-user-meta">
                    <h3>${chat.name}</h3>
                    <p>${chat.headline}</p>
                </div>
            </div>
            <div class="dropdown">
                <button class="btn btn-icon" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-h"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">View Profile</a></li>
                    <li><a class="dropdown-item" href="#">Mute</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#">Delete Conversation</a></li>
                </ul>
            </div>
        </div>

        <div class="messages-container" id="messagesContainer">
            ${chat.messages.map(msg => `
                <div class="message ${msg.type}">
                    <div class="message-bubble">
                        ${msg.text}
                    </div>
                    <span class="message-timestamp">${msg.time}</span>
                </div>
            `).join('')}
        </div>

        <div class="message-input-container">
            <div class="input-wrapper">
                <button class="btn-attach"><i class="fas fa-paperclip"></i></button>
                <button class="btn-attach"><i class="far fa-image"></i></button>
                <textarea id="msgInput" class="auto-resize-textarea" placeholder="Write a message..." rows="1"></textarea>
                <button class="btn-send" id="sendBtn" onclick="sendMessage()" disabled>Send</button>
            </div>
        </div>
    `;

    scrollToBottom();
    setupInputListeners();
}

function closeChat() {
    document.getElementById('chatPanel').classList.remove('active');
    activeChatId = null;
    renderConversationList();
}

function setupInputListeners() {
    const input = document.getElementById('msgInput');
    const btn = document.getElementById('sendBtn');

    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        btn.disabled = this.value.trim() === '';
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function sendMessage() {
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (!text) return;

    const chat = conversations.find(c => c.id === activeChatId);
    
    const newMsg = {
        id: Date.now(),
        type: 'sent',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    chat.messages.push(newMsg);
    chat.lastMsg = text;
    chat.lastTime = "Just now";

    const container = document.getElementById('messagesContainer');
    container.insertAdjacentHTML('beforeend', `
        <div class="message sent">
            <div class="message-bubble">${text}</div>
            <span class="message-timestamp">${newMsg.time}</span>
        </div>
    `);

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('sendBtn').disabled = true;
    scrollToBottom();
    renderConversationList();
}

function scrollToBottom() {
    const container = document.getElementById('messagesContainer');
    if (container) container.scrollTop = container.scrollHeight;
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.conversation-item');
    
    items.forEach(item => {
        const name = item.querySelector('.conversation-name').innerText.toLowerCase();
        item.style.display = name.includes(term) ? 'flex' : 'none';
    });
});