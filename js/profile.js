 // --- GLOBAL STATE ---
    let state = {
        role: "Working Professional",
        connected: false,
        msgCount: 0,
        photo: null,
        activeType: '',
        editIdx: null,
        data: { Skills: [], Education: [], Achievements: [], Projects: [] }
    };

    // --- ROLE LOGIC ---
    function syncUI() {
        state.role = document.getElementById('roleControl').value;
        document.getElementById('roleDisplay').innerText = state.role;
        const btn = document.getElementById('postBtn');
        const warn = document.getElementById('roleWarning');

        if(state.role === "Working Professional") {
            btn.disabled = false; warn.classList.add('d-none');
        } else {
            btn.disabled = true; warn.classList.remove('d-none');
        }
    }

    // --- PHOTO LOGIC ---
    document.getElementById('picInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                state.photo = ev.target.result;
                document.getElementById('mainPic').src = state.photo;
                document.getElementById('postMiniPic').src = state.photo;
                localStorage.setItem('ah_p_photo', state.photo);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- CONNECTION & MESSAGING ---
    function logicConnect() {
        const btn = document.getElementById('connBtn');
        btn.innerText = "Request Sent"; btn.disabled = true;
        setTimeout(() => {
            state.connected = true; btn.innerText = "Connected";
            btn.classList.replace('btn-ah-primary', 'btn-outline-success');
        }, 2000);
    }

    function logicFollow() {
        const btn = document.getElementById('followBtn');
        btn.innerText = (btn.innerText === "Follow") ? "Following" : "Follow";
        btn.classList.toggle('btn-following');
    }

    function handleMessage() {
        const txt = document.getElementById('msgBody');
        const status = document.getElementById('msgStatus');
        if(!txt.value.trim()) return;

        if(!state.connected) {
            if(state.msgCount >= 1) {
                status.innerText = "To continue the conversation, please connect.";
                txt.disabled = true; document.getElementById('sendMsgBtn').disabled = true;
                return;
            }
            alert("One-time message sent!"); state.msgCount++;
        } else { alert("Message sent to connection!"); }
        txt.value = "";
    }

    // --- ABOUT CRUD ---
    function saveAbout() {
        const val = document.getElementById('aboutEditInput').value;
        document.getElementById('aboutText').innerText = val;
        bootstrap.Modal.getInstance(document.getElementById('aboutModal')).hide();
    }

    // --- SECTION CRUD (Skills, Edu, Achieve, Projects) ---
    function openCRUDModal(type, idx = null) {
        state.activeType = type;
        state.editIdx = idx;
        const form = document.getElementById('crudForm');
        form.reset();
        
        document.getElementById('modalTitle').innerText = (idx === null ? 'Add ' : 'Edit ') + type;
        document.getElementById('delBtn').classList.toggle('d-none', idx === null);
        
        // Dynamic Fields visibility
        document.getElementById('subField').classList.toggle('d-none', type === 'Skills');
        document.getElementById('dateFields').classList.toggle('d-none', type === 'Skills');
        document.getElementById('descField').classList.toggle('d-none', type !== 'Projects');
        document.getElementById('linkField').classList.toggle('d-none', type !== 'Projects');
        document.getElementById('date2Field').classList.toggle('d-none', type !== 'Education');
        
        document.getElementById('subLabel').innerText = 
            type === 'Education' ? 'Course / Degree' : 
            type === 'Achievements' ? 'Associated With' : 'Associated With';

        if(idx !== null) {
            const item = state.data[type][idx];
            document.getElementById('titleInput').value = item.title;
            document.getElementById('subInput').value = item.sub || '';
            document.getElementById('date1').value = item.date1 || '';
            document.getElementById('date2').value = item.date2 || '';
            document.getElementById('descInput').value = item.desc || '';
            document.getElementById('urlInput').value = item.url || '';
        }

        new bootstrap.Modal(document.getElementById('crudModal')).show();
    }

    function saveEntry() {
        const title = document.getElementById('titleInput').value;
        if(!title) return;

        const entry = {
            title: title,
            sub: document.getElementById('subInput').value,
            date1: document.getElementById('date1').value,
            date2: document.getElementById('date2').value,
            desc: document.getElementById('descInput').value,
            url: document.getElementById('urlInput').value
        };

        if(state.editIdx !== null) state.data[state.activeType][state.editIdx] = entry;
        else state.data[state.activeType].push(entry);

        renderSections();
        bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
    }

    function deleteEntry() {
        if(confirm("Are you sure?")) {
            state.data[state.activeType].splice(state.editIdx, 1);
            renderSections();
            bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
        }
    }

    function renderSections() {
        // Skills
        document.getElementById('skillsList').innerHTML = state.data.Skills.map((s, i) => `
            <span class="badge bg-light text-dark border p-2 cursor-pointer" onclick="openCRUDModal('Skills', ${i})">${s.title} <i class="fas fa-pencil-alt ms-1 small text-primary"></i></span>
        `).join('');

        // Education
        document.getElementById('eduList').innerHTML = state.data.Education.map((e, i) => `
            <div class="item-row border-bottom pb-2">
                <div class="d-flex gap-3">
                    <i class="fas fa-university item-icon"></i>
                    <div>
                        <h6 class="fw-bold mb-0">${e.title}</h6>
                        <p class="text-secondary mb-0">${e.sub}</p>
                        <small class="text-muted">${e.date1} - ${e.date2}</small>
                    </div>
                </div>
                <i class="fas fa-pencil-alt text-primary cursor-pointer" onclick="openCRUDModal('Education', ${i})"></i>
            </div>
        `).join('');

        // Achievements
        document.getElementById('achList').innerHTML = state.data.Achievements.map((a, i) => `
            <div class="item-row border-bottom pb-2">
                <div class="d-flex gap-3">
                    <i class="fas fa-award text-warning item-icon"></i>
                    <div>
                        <h6 class="fw-bold mb-0">${a.title}</h6>
                        <p class="text-secondary mb-0">${a.sub}</p>
                        <small class="text-muted">Issued ${a.date1}</small>
                    </div>
                </div>
                <i class="fas fa-pencil-alt text-primary cursor-pointer" onclick="openCRUDModal('Achievements', ${i})"></i>
            </div>
        `).join('');

        // Projects
        document.getElementById('projList').innerHTML = state.data.Projects.map((p, i) => `
            <div class="item-row border-bottom pb-2">
                <div class="d-flex gap-3">
                    <i class="fas fa-project-diagram text-info item-icon"></i>
                    <div class="w-100">
                        <h6 class="fw-bold mb-0">${p.title}</h6>
                        <p class="text-secondary mb-1 small">${p.sub} • ${p.date1}</p>
                        <p class="mb-2 small text-dark">${p.desc}</p>
                        ${p.url ? `<a href="${p.url}" target="_blank" class="btn btn-sm btn-outline-primary py-0">View Live</a>` : ''}
                    </div>
                </div>
                <i class="fas fa-pencil-alt text-primary cursor-pointer" onclick="openCRUDModal('Projects', ${i})"></i>
            </div>
        `).join('');
    }

    // --- POSTS CRUD ---
    function handleNewPost() {
        const val = document.getElementById('postInput').value;
        if(!val.trim()) return;
        const id = Date.now();
        const html = `
            <div class="post-card animate__animated animate__fadeIn" id="p-${id}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${state.photo || 'https://via.placeholder.com/40'}" class="rounded-circle" width="40" height="40">
                        <div><div class="fw-bold small">Jordan Sterling</div><div class="text-muted small">Just now</div></div>
                    </div>
                    <div><i class="fas fa-edit text-primary me-2 cursor-pointer" onclick="editPost(${id})"></i><i class="fas fa-trash-alt text-danger cursor-pointer" onclick="deletePost(${id})"></i></div>
                </div>
                <p class="post-body mb-3">${val}</p>
                <div class="d-flex border-top pt-2 justify-content-around">
                    <span class="interaction-btn" onclick="this.classList.toggle('active')"><i class="far fa-thumbs-up"></i> Like</span>
                    <span class="interaction-btn" onclick="addComment(this)"><i class="far fa-comment"></i> Comment</span>
                    <span class="interaction-btn" onclick="alert('Shared!')"><i class="fas fa-share"></i> Share</span>
                </div>
            </div>`;
        document.getElementById('postFeed').insertAdjacentHTML('afterbegin', html);
        document.getElementById('postInput').value = "";
    }
    function deletePost(id) { if(confirm("Delete post?")) document.getElementById('p-'+id).remove(); }
    function editPost(id) {
        const p = document.getElementById('p-'+id).querySelector('.post-body');
        const updated = prompt("Edit your post:", p.innerText);
        if(updated) p.innerText = updated;
    }
    function addComment(btn) { const c = prompt("Enter comment:"); if(c) alert("Comment added!"); }

    // --- INIT ---
    window.onload = () => {
        const saved = localStorage.getItem('ah_p_photo');
        if(saved) {
            state.photo = saved; document.getElementById('mainPic').src = saved;
            document.getElementById('postMiniPic').src = saved;
        }
        document.getElementById('aboutEditInput').value = document.getElementById('aboutText').innerText;
        syncUI();
    };