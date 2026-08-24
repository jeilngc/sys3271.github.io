// ============================================
// Dashboard logic — talks to /api/* endpoints.
// Session auth is handled via an httpOnly cookie set by /api/auth/login,
// so every fetch() below just needs credentials: 'include'.
// ============================================

const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

async function checkAuth() {
    const res = await fetch('/api/auth/check', { credentials: 'include' });
    const { authenticated } = await res.json();
    return authenticated;
}

async function showCorrectScreen() {
    const authed = await checkAuth();
    if (authed) {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        loadAllTabs();
    } else {
        loginScreen.classList.remove('hidden');
        dashboardScreen.classList.add('hidden');
    }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    errorEl.classList.add('hidden');

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    if (res.ok) {
        await showCorrectScreen();
    } else {
        errorEl.classList.remove('hidden');
    }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    await showCorrectScreen();
});

// ---------- Tabs ----------
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
        document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('hidden');
    });
});

function loadAllTabs() {
    loadGiftCodesAdmin();
    loadAnnouncementsAdmin();
    loadAchievementsAdmin();
    loadOfficersAdmin();
}

// ---------- Shared helpers ----------
async function apiFetch(url, options = {}) {
    const res = await fetch(url, { credentials: 'include', ...options });
    if (res.status === 401) {
        await showCorrectScreen();
        throw new Error('Session expired');
    }
    return res;
}

function rowMeta(dateStr) {
    return `<span class="text-[10px] text-gray-500">${dateStr}</span>`;
}

// ============================================
// GIFT CODES
// ============================================
const gcForm = document.getElementById('giftcode-form');
const gcCancelBtn = document.getElementById('gc-cancel');

async function loadGiftCodesAdmin() {
    const res = await apiFetch('/api/giftcodes');
    const codes = await res.json();
    const list = document.getElementById('giftcode-list');
    list.innerHTML = codes.map(c => `
        <div class="row-card flex items-center justify-between gap-3">
            <div>
                <p class="font-mono font-bold text-white">${c.code}</p>
                <p class="text-xs text-gray-400">${c.description || ''}</p>
                ${rowMeta(c.dateAdded)}
            </div>
            <div class="flex gap-2 shrink-0">
                <button class="btn btn-secondary" onclick='editGiftCode(${JSON.stringify(c)})'><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteGiftCode(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('') || `<p class="text-gray-500 text-sm">No gift codes yet.</p>`;
}

function editGiftCode(c) {
    document.getElementById('gc-id').value = c.id;
    document.getElementById('gc-code').value = c.code;
    document.getElementById('gc-date').value = c.dateAdded;
    document.getElementById('gc-desc').value = c.description || '';
    gcCancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

gcCancelBtn.addEventListener('click', () => { gcForm.reset(); document.getElementById('gc-id').value=''; gcCancelBtn.classList.add('hidden'); });

gcForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('gc-id').value;
    const payload = {
        code: document.getElementById('gc-code').value.trim(),
        dateAdded: document.getElementById('gc-date').value,
        description: document.getElementById('gc-desc').value.trim()
    };
    const url = id ? `/api/giftcodes/${id}` : '/api/giftcodes';
    const method = id ? 'PUT' : 'POST';
    const res = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const err = await res.json(); alert(err.error || 'Failed to save'); return; }
    gcForm.reset(); document.getElementById('gc-id').value=''; gcCancelBtn.classList.add('hidden');
    loadGiftCodesAdmin();
});

async function deleteGiftCode(id) {
    if (!confirm('Delete this gift code?')) return;
    await apiFetch(`/api/giftcodes/${id}`, { method: 'DELETE' });
    loadGiftCodesAdmin();
}

// ============================================
// ANNOUNCEMENTS
// ============================================
const anForm = document.getElementById('announcement-form');
const anCancelBtn = document.getElementById('an-cancel');

async function loadAnnouncementsAdmin() {
    const res = await apiFetch('/api/announcements');
    const items = await res.json();
    const list = document.getElementById('announcement-list');
    list.innerHTML = items.map(a => `
        <div class="row-card flex items-start justify-between gap-3">
            <div class="flex-grow">
                <p class="text-sm text-white whitespace-pre-wrap">${a.message}</p>
                ${rowMeta(a.date)}
            </div>
            <div class="flex gap-2 shrink-0">
                <button class="btn btn-secondary" onclick='editAnnouncement(${JSON.stringify(a)})'><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteAnnouncement(${a.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('') || `<p class="text-gray-500 text-sm">No announcements yet.</p>`;
}

function editAnnouncement(a) {
    document.getElementById('an-id').value = a.id;
    document.getElementById('an-date').value = a.date;
    document.getElementById('an-message').value = a.message;
    anCancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

anCancelBtn.addEventListener('click', () => { anForm.reset(); document.getElementById('an-id').value=''; anCancelBtn.classList.add('hidden'); });

anForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('an-id').value;
    const payload = {
        date: document.getElementById('an-date').value,
        message: document.getElementById('an-message').value
    };
    const url = id ? `/api/announcements/${id}` : '/api/announcements';
    const method = id ? 'PUT' : 'POST';
    const res = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const err = await res.json(); alert(err.error || 'Failed to save'); return; }
    anForm.reset(); document.getElementById('an-id').value=''; anCancelBtn.classList.add('hidden');
    loadAnnouncementsAdmin();
});

async function deleteAnnouncement(id) {
    if (!confirm('Delete this announcement?')) return;
    await apiFetch(`/api/announcements/${id}`, { method: 'DELETE' });
    loadAnnouncementsAdmin();
}

// ============================================
// ACHIEVEMENTS
// ============================================
const achForm = document.getElementById('achievement-form');
const achCancelBtn = document.getElementById('ach-cancel');

async function loadAchievementsAdmin() {
    const res = await apiFetch('/api/achievements');
    const items = await res.json();
    const list = document.getElementById('achievement-list');
    list.innerHTML = items.map(a => `
        <div class="row-card flex items-start justify-between gap-3">
            <div class="flex-grow">
                <p class="font-bold text-white text-sm">${a.title} ${a.highlight ? '<span class="text-red-400 text-xs">🔥 highlighted</span>' : ''}</p>
                <p class="text-xs text-gray-400">${a.description || ''}</p>
                <p class="text-xs text-gray-500">${a.category}${a.damage ? ' • ' + a.damage : ''}</p>
                ${rowMeta(a.date)}
            </div>
            <div class="flex gap-2 shrink-0">
                <button class="btn btn-secondary" onclick='editAchievement(${JSON.stringify(a)})'><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteAchievement(${a.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('') || `<p class="text-gray-500 text-sm">No achievements yet.</p>`;
}

function editAchievement(a) {
    document.getElementById('ach-id').value = a.id;
    document.getElementById('ach-title').value = a.title;
    document.getElementById('ach-date').value = a.date;
    document.getElementById('ach-category').value = a.category;
    document.getElementById('ach-desc').value = a.description || '';
    document.getElementById('ach-damage').value = a.damage || '';
    document.getElementById('ach-image').value = a.image || '';
    document.getElementById('ach-highlight').checked = !!a.highlight;
    achCancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

achCancelBtn.addEventListener('click', () => { achForm.reset(); document.getElementById('ach-id').value=''; achCancelBtn.classList.add('hidden'); });

achForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('ach-id').value;
    const payload = {
        title: document.getElementById('ach-title').value.trim(),
        date: document.getElementById('ach-date').value,
        category: document.getElementById('ach-category').value,
        description: document.getElementById('ach-desc').value.trim(),
        damage: document.getElementById('ach-damage').value.trim(),
        image: document.getElementById('ach-image').value.trim(),
        highlight: document.getElementById('ach-highlight').checked
    };
    const url = id ? `/api/achievements/${id}` : '/api/achievements';
    const method = id ? 'PUT' : 'POST';
    const res = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const err = await res.json(); alert(err.error || 'Failed to save'); return; }
    achForm.reset(); document.getElementById('ach-id').value=''; achCancelBtn.classList.add('hidden');
    loadAchievementsAdmin();
});

async function deleteAchievement(id) {
    if (!confirm('Delete this achievement?')) return;
    await apiFetch(`/api/achievements/${id}`, { method: 'DELETE' });
    loadAchievementsAdmin();
}

// ============================================
// OFFICERS
// ============================================
const ofForm = document.getElementById('officer-form');
const ofCancelBtn = document.getElementById('of-cancel');

async function loadOfficersAdmin() {
    const res = await apiFetch('/api/officers');
    const items = await res.json();
    const list = document.getElementById('officer-list');
    list.innerHTML = items.map(o => `
        <div class="row-card flex items-center justify-between gap-3">
            <div>
                <p class="font-bold text-white text-sm">${o.name} ${o.span ? '<span class="text-xs text-gray-500">(spans 2 cols)</span>' : ''}</p>
                <p class="text-xs text-gray-400">${o.role}</p>
                <p class="text-[10px] text-gray-500">icon: ${o.icon} • color: ${o.color} • order: ${o.sortOrder}</p>
            </div>
            <div class="flex gap-2 shrink-0">
                <button class="btn btn-secondary" onclick='editOfficer(${JSON.stringify(o)})'><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteOfficer(${o.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('') || `<p class="text-gray-500 text-sm">No officers yet.</p>`;
}

function editOfficer(o) {
    document.getElementById('of-id').value = o.id;
    document.getElementById('of-name').value = o.name;
    document.getElementById('of-role').value = o.role;
    document.getElementById('of-sort').value = o.sortOrder ?? 0;
    document.getElementById('of-icon').value = o.icon || '';
    document.getElementById('of-color').value = o.color || 'text-slate-400';
    document.getElementById('of-span').checked = !!o.span;
    ofCancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

ofCancelBtn.addEventListener('click', () => { ofForm.reset(); document.getElementById('of-id').value=''; ofCancelBtn.classList.add('hidden'); });

ofForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('of-id').value;
    const payload = {
        name: document.getElementById('of-name').value.trim(),
        role: document.getElementById('of-role').value.trim(),
        sortOrder: Number(document.getElementById('of-sort').value) || 0,
        icon: document.getElementById('of-icon').value.trim() || 'user',
        color: document.getElementById('of-color').value,
        span: document.getElementById('of-span').checked
    };
    const url = id ? `/api/officers/${id}` : '/api/officers';
    const method = id ? 'PUT' : 'POST';
    const res = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const err = await res.json(); alert(err.error || 'Failed to save'); return; }
    ofForm.reset(); document.getElementById('of-id').value=''; ofCancelBtn.classList.add('hidden');
    loadOfficersAdmin();
});

async function deleteOfficer(id) {
    if (!confirm('Delete this officer?')) return;
    await apiFetch(`/api/officers/${id}`, { method: 'DELETE' });
    loadOfficersAdmin();
}

// ---------- Init ----------
showCorrectScreen();
