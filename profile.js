let state = {
    role: "Working Professional",
    connected: false,
    msgCount: 0,
    photo: null,
    activeType: '',
    editIdx: null,
    data: { 
        Skills: [
            { title: "JavaScript" }, 
            { title: "React.js" }, 
            { title: "Node.js" }, 
            { title: "Python" }
        ], 
        Education: [
            { title: "Stanford University", sub: "Bachelor's degree, Computer Science", date1: "2018", date2: "2022" }
        ], 
        Achievements: [], 
        Projects: [
            { title: "AskHere Platform", sub: "Web Development", date1: "2025", desc: "Designed and developed the profile architecture.", url: "#" }
        ] 
    }
};

function syncUI() {
    state.role = document.getElementById('roleControl').value;
    const display = document.getElementById('roleDisplay');
    const btn = document.getElementById('postBtn');
    const input = document.getElementById('postInput');
    const warn = document.getElementById('roleWarning');

    if (state.role === "Working Professional") {
        display.innerText = "Senior Software Engineer at Tech Corp";
        btn.disabled = false;
        input.disabled = false;
        warn.classList.add('d-none');
    } else {
        display.innerText = "Student at Stanford University";
        btn.disabled = true;
        input.disabled = true;
        warn.classList.remove('d-none');
    }
}

document.getElementById('picInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
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

function logicConnect() {
    const btn = document.getElementById('connBtn');
    btn.innerHTML = '<i class="fas fa-clock me-1"></i> Pending';
    btn.classList.add('disabled');
    setTimeout(() => {
        state.connected = true;
        btn.innerHTML = '<i class="fas fa-check me-1"></i> Connected';
        btn.classList.replace('btn-ah-primary', 'btn-outline-success');
        btn.classList.remove('disabled');
    }, 1500);
}

function logicFollow() {
    const btn = document.getElementById('followBtn');
    if (btn.innerText === "Follow") {
        btn.innerText = "Following";
        btn.classList.add('btn-following');
    } else {
        btn.innerText = "Follow";
        btn.classList.remove('btn-following');
    }
}

function handleMessage() {
    const txt = document.getElementById('msgBody');
    const status = document.getElementById('msgStatus');
    if (!txt.value.trim()) return;

    if (!state.connected) {
        if (state.msgCount >= 1) {
            status.innerText = "Please connect to send more messages.";
            return;
        }
        state.msgCount++;
        alert("Message Sent!");
    } else {
        alert("Message Sent!");
    }
    
    bootstrap.Modal.getInstance(document.getElementById('msgModal')).hide();
    txt.value = "";
    status.innerText = "";
}

function saveAbout() {
    const val = document.getElementById('aboutEditInput').value;
    if(val.trim()) {
        document.getElementById('aboutText').innerText = val;
    }
    bootstrap.Modal.getInstance(document.getElementById('aboutModal')).hide();
}

function openCRUDModal(type, idx = null) {
    state.activeType = type;
    state.editIdx = idx;
    const form = document.getElementById('crudForm');
    form.reset();
    
    document.getElementById('modalTitle').innerText = (idx === null ? 'Add ' : 'Edit ') + type;
    const delBtn = document.getElementById('delBtn');
    if (idx === null) delBtn.classList.add('d-none');
    else delBtn.classList.remove('d-none');
    
    const isSkills = type === 'Skills';
    const isProject = type === 'Projects';
    const isEdu = type === 'Education';

    document.getElementById('subField').classList.toggle('d-none', isSkills);
    document.getElementById('dateFields').classList.toggle('d-none', isSkills);
    document.getElementById('descField').classList.toggle('d-none', !isProject);
    document.getElementById('linkField').classList.toggle('d-none', !isProject);
    document.getElementById('date2Field').classList.toggle('d-none', !isEdu && !isProject);
    
    document.getElementById('subLabel').innerText = 
        type === 'Education' ? 'Degree / Field of Study' : 
        type === 'Achievements' ? 'Issuer' : 'Role / Association';

    if (idx !== null) {
        const item = state.data[type][idx];
        document.getElementById('titleInput').value = item.title;
        if(item.sub) document.getElementById('subInput').value = item.sub;
        if(item.date1) document.getElementById('date1').value = item.date1;
        if(item.date2) document.getElementById('date2').value = item.date2;
        if(item.desc) document.getElementById('descInput').value = item.desc;
        if(item.url) document.getElementById('urlInput').value = item.url;
    }

    new bootstrap.Modal(document.getElementById('crudModal')).show();
}

function saveEntry() {
    const title = document.getElementById('titleInput').value;
    if (!title) return;

    const entry = {
        title: title,
        sub: document.getElementById('subInput').value,
        date1: document.getElementById('date1').value,
        date2: document.getElementById('date2').value,
        desc: document.getElementById('descInput').value,
        url: document.getElementById('urlInput').value
    };

    if (state.editIdx !== null) state.data[state.activeType][state.editIdx] = entry;
    else state.data[state.activeType].push(entry);

    renderSections();
    bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
}

function deleteEntry() {
    if (confirm("Are you sure you want to delete this?")) {
        state.data[state.activeType].splice(state.editIdx, 1);
        renderSections();
        bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
    }
}

function renderSections() {
    document.getElementById('skillsList').innerHTML = state.data.Skills.map((s, i) => `
        <div class="skill-badge" onclick="openCRUDModal('Skills', ${i})">
            ${s.title}
        </div>
    `).join('');

    document.getElementById('eduList').innerHTML = state.data.Education.map((e, i) => `
        <div class="item-row">
            <div class="item-icon-box">
                <i class="fas fa-university"></i>
            </div>
            <div class="item-content">
                <div class="d-flex justify-content-between">
                    <div class="item-title">${e.title}</div>
                    <i class="fas fa-pencil-alt text-muted small cursor-pointer" onclick="openCRUDModal('Education', ${i})"></i>
                </div>
                <div class="item-subtitle">${e.sub}</div>
                <div class="item-meta">${e.date1} - ${e.date2}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('achList').innerHTML = state.data.Achievements.map((a, i) => `
        <div class="item-row">
             <div class="item-icon-box">
                <i class="fas fa-certificate"></i>
            </div>
            <div class="item-content">
                <div class="d-flex justify-content-between">
                    <div class="item-title">${a.title}</div>
                    <i class="fas fa-pencil-alt text-muted small cursor-pointer" onclick="openCRUDModal('Achievements', ${i})"></i>
                </div>
                <div class="item-subtitle">${a.sub}</div>
                <div class="item-meta">Issued ${a.date1}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('projList').innerHTML = state.data.Projects.map((p, i) => `
        <div class="item-row">
            <div class="item-icon-box">
                <i class="fas fa-layer-group"></i>
            </div>
            <div class="item-content">
                <div class="d-flex justify-content-between">
                    <div class="item-title">${p.title}</div>
                    <i class="fas fa-pencil-alt text-muted small cursor-pointer" onclick="openCRUDModal('Projects', ${i})"></i>
                </div>
                <div class="item-meta">${p.date1} • ${p.sub}</div>
                <div class="item-desc">${p.desc}</div>
                ${p.url ? `<a href="${p.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-2 rounded-pill px-3">Show Project <i class="fas fa-external-link-alt ms-1"></i></a>` : ''}
            </div>
        </div>
    `).join('');
}

function handleNewPost() {
    const val = document.getElementById('postInput').value;
    if (!val.trim()) return;
    
    const id = Date.now();
    const html = `
        <div class="post-card animate__animated animate__fadeIn" id="p-${id}">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="d-flex align-items-center gap-2">
                    <img src="${state.photo || './user.png'}" class="rounded-circle" width="40" height="40">
                    <div>
                        <div class="fw-bold small text-dark">Jordan Sterling</div>
                        <div class="text-muted small">Just now • <i class="fas fa-globe-americas"></i></div>
                    </div>
                </div>
                <div class="dropdown">
                    <i class="fas fa-ellipsis-h text-muted cursor-pointer p-2" onclick="deletePost(${id})"></i>
                </div>
            </div>
            <div class="post-body mb-3 text-dark">${val}</div>
            <div class="d-flex justify-content-between border-top pt-2">
                <button class="btn btn-light btn-sm flex-fill"><i class="far fa-thumbs-up"></i> Like</button>
                <button class="btn btn-light btn-sm flex-fill"><i class="far fa-comment-dots"></i> Comment</button>
                <button class="btn btn-light btn-sm flex-fill"><i class="fas fa-share"></i> Share</button>
            </div>
        </div>`;
        
    document.getElementById('postFeed').insertAdjacentHTML('afterbegin', html);
    document.getElementById('postInput').value = "";
}

function deletePost(id) {
    if(confirm("Delete this post?")) {
        document.getElementById('p-'+id).remove();
    }
}

window.onload = () => {
    const saved = localStorage.getItem('ah_p_photo');
    if (saved) {
        state.photo = saved;
        document.getElementById('mainPic').src = saved;
        document.getElementById('postMiniPic').src = saved;
    }
    document.getElementById('aboutEditInput').value = document.getElementById('aboutText').innerText;
    renderSections();
    syncUI();
};