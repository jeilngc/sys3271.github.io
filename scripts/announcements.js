const ANNOUNCEMENTS = [
{
    id: 56,
    message: "EVENTS FOR 5/1:\n\n• Stronghold 4 - 5pm (9 UTC)\n• Fortress 7 - 5pm PHT (9 UTC)\n• Fortress 10 - 5pm PHT (9 UTC)\n\nNote: Guide for SH and Fort battle will be sent separately.\n\n• Alliance Showdown Day 5 - just do personal points & save for KOI and SVS\n\nNote: Please DO NOT go to SH3 & FORT9\n\nLAST EVENT: Heros Mission\n\nNEW EVENT: Dream Miracle\n\n- Thank you",
    date: "2026-05-01"
},

    {
        id: 55,
        message: "EVENTS FOR 4/28:\n\n• BT1 – 8pm. PHT (12 UTC)\n• BT2 – 10:00pm. PHT (14:00 UTC)\n\n• Alliance Showdown Day 2 - Best to use:\nHero Shards / Expert sigil / Book of knowledge\n\n• Snowbuster\n• Vision of dawn",
        date: "2026-04-28"
    },
    // ... (rest of your ANNOUNCEMENTS array – keep it identical)
];

let isShowingAll = false;

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
        if (index > 4 && !isShowingAll) annElement.classList.add('announcement-hidden');
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

    if (sorted.length > 5) {
        container.classList.remove('hidden');
        showMoreBtn.innerText = isShowingAll ? "Show Less" : "Show More";
    } else {
        container.classList.add('hidden');
    }
}

