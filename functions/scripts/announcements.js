// =========================
// ANNOUNCEMENTS — now backed by /api/announcements (D1)
// =========================
let ANNOUNCEMENTS = [];
let visibleCount = 3; // start with 3

async function fetchAnnouncements() {
    try {
        const res = await fetch('/api/announcements');
        if (!res.ok) throw new Error('Failed to fetch announcements');
        ANNOUNCEMENTS = await res.json();
    } catch (err) {
        console.error(err);
        ANNOUNCEMENTS = [];
    }
}

function loadAnnouncements() {
    const wrapper = document.getElementById('announcement-wrapper');
    const showMoreBtn = document.getElementById('show-more-btn');
    const container = document.getElementById('show-more-container');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sorted = [...ANNOUNCEMENTS]
        .filter(ann => {
            const annDate = new Date(ann.date);
            annDate.setHours(0, 0, 0, 0);
            return annDate <= today;
        })
        .sort((a, b) => b.id - a.id);

    if (sorted.length === 0) {
        wrapper.innerHTML = `
            <div class="glass-panel p-6 rounded-xl text-center border border-gray-700">
                <i class="fa-solid fa-calendar-alt text-gray-500 text-2xl mb-2"></i>
                <p class="text-gray-400 text-sm">No announcements yet.</p>
                <p class="text-gray-500 text-xs mt-1">Check back later for updates!</p>
            </div>`;
        container.classList.add('hidden');
        return;
    }

    sorted.forEach((ann, index) => {
        const annElement = document.createElement('div');
        annElement.className = "bg-gradient-to-r from-ice-mid to-ice-light border-l-4 border-sys-gold rounded-r-lg p-4 shadow-lg transition-all hover:scale-[1.01]";

        if (index >= visibleCount) {
            annElement.classList.add('announcement-hidden');
        }

        annElement.innerHTML = `
            <div class="flex items-start">
                <div class="ml-3 w-full">
                    <div class="flex justify-between items-center mb-1">
                        <h3 class="text-[10px] font-bold text-sys-gold uppercase tracking-widest">Announcement</h3>
                        <span class="text-[9px] text-gray-500 font-bold uppercase">${getRelativeTime(ann.date)}</span>
                    </div>
                    <div class="text-sm text-white font-medium whitespace-pre-wrap">${ann.message}</div>
                </div>
            </div>`;
        wrapper.appendChild(annElement);
    });

    if (sorted.length > visibleCount) {
        container.classList.remove('hidden');
        showMoreBtn.innerText = "Show More";
    } else {
        container.classList.add('hidden');
    }
}

async function initAnnouncements() {
    await fetchAnnouncements();
    loadAnnouncements();
}

// Button click handler is attached in main.js once the DOM is ready
