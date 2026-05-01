const R4_OFFICERS = [
    { name: "JEI", role: "Site Admin", icon: "code", color: "text-sys-gold" },
    { name: "JOR", role: "War • Events", icon: "shield-halved", color: "text-red-400" },
    { name: "PSY", role: "Recruit • Events", icon: "bullhorn", color: "text-blue-400" },
    { name: "LipBite", role: "Events & Comms", icon: "bullhorn", color: "text-slate-400" },
    { name: "YANI", role: "Diplomacy • Events", icon: "comments", color: "text-blue-400" },
    { name: "KERINA", role: "War • Diplomacy", icon: "scroll", color: "text-slate-400", span: true }
];

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

