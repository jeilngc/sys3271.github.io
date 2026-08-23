// =========================
// OFFICERS — now backed by /api/officers (D1)
// =========================
let R4_OFFICERS = [];

async function fetchOfficers() {
    try {
        const res = await fetch('/api/officers');
        if (!res.ok) throw new Error('Failed to fetch officers');
        R4_OFFICERS = await res.json();
    } catch (err) {
        console.error(err);
        R4_OFFICERS = [];
    }
}

function renderOfficers() {
    const grid = document.getElementById('r4-grid');
    if (!grid) return;
    grid.innerHTML = R4_OFFICERS.map(officer => `
        <div class="glass-panel p-3 rounded-lg flex items-center gap-3 border border-gray-800 ${officer.span ? 'sm:col-span-2' : ''}">
            <div class="w-10 h-10 rounded-full pfp-border-r4 bg-ice-mid flex-shrink-0 flex items-center justify-center text-slate-400">
                <i class="fa-solid fa-${officer.icon} text-sm"></i>
            </div>
            <div>
                <h4 class="font-heading text-sm text-white uppercase">${officer.name}</h4>
                <p class="text-[9px] ${officer.color} uppercase font-bold">${officer.role}</p>
            </div>
        </div>
    `).join('');
}

async function initOfficers() {
    await fetchOfficers();
    renderOfficers();
}
