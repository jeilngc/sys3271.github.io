// R4 Officer Data - Much cleaner than HTML repetition
const R4_OFFICERS = [
    { name: "JEI", role: "Site Admin", icon: "code", color: "text-sys-gold" },
    { name: "JOR", role: "War • Events", icon: "shield-halved", color: "text-red-400" },
    { name: "Karbs", role: "War Commander", icon: "shield-halved", color: "text-red-400" },
    { name: "NAILONGSKI", role: "Recruit • Events", icon: "bullhorn", color: "text-blue-400" },
    { name: "LipBite", role: "Events & Comms", icon: "bullhorn", color: "text-slate-400" },
    { name: "xGomx", role: "Recruit • Events", icon: "user-plus", color: "text-blue-400" },
    { name: "MIRAI", role: "Diplomacy • Events", icon: "comments", color: "text-blue-400" },
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

// --- Configuration & Constants ---
const EVENT_DURATION = 30 * 60 * 1000;
const CYCLE_TIME = 48 * 60 * 60 * 1000;
const HUNT_WINDOW = 24 * 60 * 60 * 1000; 
const BH_REF_START = new Date(2026, 0, 6, 0, 0, 0, 0).getTime();
//    • 
const ANNOUNCEMENTS = [
    {
        id: 27,
        message: "EVENT for 01/30 Fri\n\n• Bearhunt\n\n• Stronghold/Fortress \n• SVS Prep Final Day", 
        date: "2026-01-30"
    },
    {
        id: 26,
        message: "EVENT for 01/26 Sun\n\n• SVS Prep\n• Bearhunt\n\n• Office Project Last day\n• Flame and Fangs", 
        date: "2026-01-26"
    },
    {
        id: 25,
        message: "EVENT for 01/25 Sun\n\n• Foundry Battle\n\n• Office Project\n• Tundra Adventure Last day Mission", 
        date: "2026-01-25"
    },
    {
        id: 25,
        message: "EVENT for 01/24 Sat\n\n• Canyon Clash\n• Alliance Mobilization Last day\n\n• Armanent  Competition Last day\n• Tundra Adventure", 
        date: "2026-01-24",
        time: "8:00"
    },
    {
        id: 24,
        message: "NAP6 Update\n1.NAP is now reduced to NAP 6: SYS, 666, HxH, PNY, PRO, ONE.\n2. The current President will continue activating state-wide buffs\n3. Nap 6 can choose 2 Fortress and Stronghold is free for all. SH with FC is still rotated.\n4. The Supreme President will be based on SVS Preparation contribution.\n5.The normal Presidency will follow the NAP6 rotation and will skip the Supreme President.\n\nTomorrow 1/23, we will finalize:\n1. Castle Rotation\n2. Transfer Manager\nThank you all for your patience and cooperation", 
        date: "2026-01-23",
        time: "8:00"
    },
    {
        id: 23,
        message: "EVENT for 01/23 Fri\n\n• Alliance Mobilization\n\n• Armanent  Competition\n\n• Tundra Adventure\n• Gina's Revenge Day 2", 
        date: "2026-01-23",
        time: "8:00"
    },
    {
        id: 22,
        message: "EVENT for 01/22 Thur\n\n• BearHunt B1&2\n• Alliance Mobilization\n\nLast Day\n• Office Project\n• Fishing Tournament\n\n• Tundra Adventure\n• Gina's Revenge", 
        date: "2026-01-22",
        time: "8:00"
    },
    {
        id: 21,
        message: "EVENT for 01/21 Wed\n\n• Alliance Mobilization\n\n• Office Project\n• Tundra Adventure\n• Fishing Tournament\n• Gina's Revenge", 
        date: "2026-01-21",
        time: "8:00"
    },
    {
        id: 20,
        message: "EVENT for 01/20 Tue\n\n• Bearhunt\n• Alliance Mobilization\n• Alliance Championship last day Registration\n\n• Armanent Competition Last day\n• Tundra Adventure\n• Fishing Tournament", 
        date: "2026-01-20",
        time: "8:00"
    },
    {
        id: 19,
        message: "EVENT for 01/19 Mon\n\n• Alliance Mobilization\n• Mercenary Prestige - Boss\n\n• Armanent Competition", 
        date: "2026-01-19",
        time: "8:00"
    },
    {
        id: 18,
        message: "Sorry for the two days without update, your Site admin gotten busy and last sunday i touch some grass at the top of the mountain\n\n-Jei", 
        date: "2026-01-19",
        time: "8:00"
    },
    {
        id: 17,
        message: "EVENT for 01/17 Sat\n\n• King of Icefield Day 6\n- Combat Training\n\n• Brother In Arms - BIA\n• Mercenary Prestige\n\n• Castle Battle - UTC12 ", 
        date: "2026-01-17",
        time: "8:00"
    },
    {
        id: 16,
        message: "EVENT for 01/16 Fri\n\n• Bearhunt\n\n• King of Icefield Day 5\n- Basic Skiils up\n\n• Brother In Arms - BIA\n• Treasure Hunter/Warrant - Last Day", 
        date: "2026-01-16",
        time: "8:00"
    },
    {
        id: 15,
        message: "EVENT for 01/15 Thu\n\n• King of Icefield Day 4\n- Combat Training\n\n• Crazy Joe 13UTC\n• Lucky Wheel Last Day\n• Treasure Hunter/Warrant Day 2", 
        date: "2026-01-15",
        time: "8:00"
    },
    {
        id: 14,
        message: "EVENT for 01/14 Wed \n\n• King of Icefield Day 3\n\n• Defeat Nearby Beast -last day\n• Lucky Wheel Day 2\n• Treasure Hunter", 
        date: "2026-01-14",
        time: "8:00"
    }, 
    {
        id: 13,
        message: "EVENT for 01/13 Tue\n\n• King of Icefield Day 2\n• Alliance Championship Registration\n• Frost Fire\n• Defeat Nearby Beast\n• Lucky Wheel\n• Crazy Joe - 13UTC\n\n Last day of \n• Flame and fangs", 
        date: "2026-01-13",
        time: "8:00"
    }, 
    {
        id: 12,
        message: "Please give a warm welcome to our newest members. Squirrelly2!\n\nWe're thrilled to have you join the team", 
        date: "2026-01-12",
        time: "8:00"
    },
    {
        id: 11,
        message: "EVENT for 01/12 Mon\n\n• Bearhunt\n\nStart of\n• Flame and fangs\n• King of Icefield\n• Alliance Championship\n\n Last day of \n• Officer Project", 
        date: "2026-01-12",
        time: "8:00"
    }, 
    {
        id: 10,
        message: "Please give a warm welcome to our newest members, Shane, Xeno, Thirteen and Tashya Utami!\n\nWe're thrilled to have you join the team", 
        date: "2026-01-11",
        time: "8:00"
    }, 
    {
        id: 9,
        message: "EVENT FOR Jan 11\n\nStart of Office Project\n• Foundry Battle \n- Legion 1 _ UTC 12\n- Legion 2 _ UTC 14\n\nPrep For Flame and fangs Event", 
        date: "2026-01-11",
        time: "8:00"
    }, 
    {
        id: 8,
        message: "EVENT FOR Jan 10\n\nLast Day\n• Mia's Fortune Hut \n• Armament Competition\n\n• Alliance Showdown Day-6\n-Full scale Competition", 
        date: "2026-01-10",
        time: "8:00"
    }, 
    {
        id: 7,
        message: "Please give a warm welcome to our newest player, JustTrying2Play!\n\nWe're thrilled to have you join the team", 
        date: "2026-01-10",
        time: "8:00"
    }, 
    {
        id: 6,
        message: "Please give a warm welcome to our newest player, Pikachuu!\n\nWe're thrilled to have you join the team", 
        date: "2026-01-09",
        time: "8:00"
    },  
    {
        id: 5,
        message: "EVENT FOR Jan 9\n\n• Mia's Fortune Hut\n• Armament Competition\n\n• Alliance Showdown Day-5\n-Speed ups/ Chief Gear / Fire Crystal to upgrade Bldg", 
        date: "2026-01-09",
        time: "8:00"
    },  
    {
        id: 4,
        message: "EVENT FOR Jan 8\n\n• Bearhunt Day\n\n• Snowbuster Last day\n• Vision of Dawn Last day\n• Gina's Revenge Day 2\n\n• Alliance Showdown Day-4\n-Training Troops/ Chief charm / Hero Gear&widget.", 
        date: "2026-01-08",
        time: "8:00"
    },    
    {
        id: 3,
        message: "EVENT FOR Jan 7\n\n• Office Project\n• Snowbuster Day-2\n• Vision of dawn Day-2\n• Alliance Showdown Day-3\n-Pet adv. / Chief charm / Gathering\n\n• Gina's Revenge.", 
        date: "2026-01-07",
        time: "8:00"
    },
    {
        id: 2,
        message: "EVENTS FOR Jan 6\n• Register Alliance Champ\n• Vote – Foundry Battle\n• Alliance Showdown Day 1",
        date: "2026-01-06"
    },
    { 
        id: 1, 
        message: "Happy New Year SYS!", 
        date: "2026-01-01" 
    }
];
let isShowingAll = false;

function getSessionStartInCycle(utcHour) {
    const refStart = new Date(BH_REF_START);
    const refUtc = new Date(refStart.getTime());
    const candidateUtcMs = Date.UTC(
        refUtc.getUTCFullYear(),
        refUtc.getUTCMonth(),
        refUtc.getUTCDate(),
        utcHour, 0, 0, 0
    );
    let offset = candidateUtcMs - refStart.getTime();
    const DAY_MS = 24 * 60 * 60 * 1000;
    if (offset < 0) offset += DAY_MS;
    return offset;
}

// Check if today is Bear Hunt day
function isBearHuntDay() {
    const now = new Date();
    const nowMs = now.getTime();
    const elapsed = nowMs - BH_REF_START;
    const cyclePos = ((elapsed % CYCLE_TIME) + CYCLE_TIME) % CYCLE_TIME;
    return cyclePos < HUNT_WINDOW;
}

// Floating Bear Hunt Button Logic
function setupFloatingBear() {
    const floatingBear = document.getElementById('floating-bear');
    const bearhuntSection = document.getElementById('bearhunt-section');
    
    if (!floatingBear || !bearhuntSection) return;
    
    // Show/hide the floating bear
    function updateFloatingBear() {
        if (isBearHuntDay()) {
            floatingBear.classList.remove('hidden');
            
            // Add scroll listener to hide when in bearhunt section
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // When bearhunt section is in view, hide the floating button
                            floatingBear.classList.add('opacity-0', 'pointer-events-none');
                            floatingBear.classList.remove('opacity-100');
                        } else {
                            // When not in view, show it
                            floatingBear.classList.remove('opacity-0', 'pointer-events-none');
                            floatingBear.classList.add('opacity-100');
                        }
                    });
                },
                {
                    threshold: 0.5,
                    rootMargin: '-50% 0px -50% 0px'
                }
            );
            
            observer.observe(bearhuntSection);
        } else {
            floatingBear.classList.add('hidden');
        }
    }
    
    // Update initially
    updateFloatingBear();
    
    // Update every hour to check if it's now Bear Hunt day
    setInterval(updateFloatingBear, 3600000);
    
    // Add click handler for smooth scroll
    floatingBear.addEventListener('click', (e) => {
        e.preventDefault();
        bearhuntSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

function updateBearHunt() {
    const now = new Date();
    const nowMs = now.getTime();
    const elapsed = nowMs - BH_REF_START;
    const cyclePos = ((elapsed % CYCLE_TIME) + CYCLE_TIME) % CYCLE_TIME;

    const dateDisplay = document.getElementById('local-date-display');
    if (dateDisplay) {
        dateDisplay.innerText = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    }
    const isHuntDay = cyclePos < HUNT_WINDOW;

    const statusCard = document.getElementById('bh-status-card');
    const statusLabel = document.getElementById('bh-status-label');
    const statusSub = document.getElementById('bh-status-sub');
    const statusIcon = document.getElementById('bh-status-icon');
    
    // Update floating bear based on Bear Hunt status
    const floatingBear = document.getElementById('floating-bear');
    const bearImage = floatingBear?.querySelector('img, .bear-pulse');
    
    if (isHuntDay) {
        statusLabel.innerText = "Bear Hunt Day";
        statusLabel.classList.add('text-green-400');
        statusSub.innerText = "Sessions Available Today";
        statusIcon.innerHTML = '<i class="fa-solid fa-paw"></i>';
        statusIcon.className = "w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white status-pulse";
        statusCard.classList.add('border-green-500/40', 'bg-green-500/5');
        statusCard.classList.remove('border-gray-700', 'bg-ice-mid');
        
        // Make floating bear pulse faster and with more intensity on Bear Hunt day
        if (bearImage) {
            bearImage.style.animation = 'gentle-pulse 1.5s infinite ease-in-out, glow-border 1.5s infinite ease-in-out';
        }
    } else {
        statusLabel.innerText = "Bear Hunt Cooldown";
        statusLabel.classList.remove('text-green-400');
        statusSub.innerText = "No bearhunt today";
        statusIcon.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
        statusIcon.className = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-white";
        statusCard.classList.remove('border-green-500/40', 'bg-green-500/5');
        statusCard.classList.add('border-gray-700', 'bg-ice-mid');
        
        // Normal pulse when not Bear Hunt day
        if (bearImage) {
            bearImage.style.animation = 'gentle-pulse 2s infinite ease-in-out, glow-border 2s infinite ease-in-out';
        }
    }
    updateBTSession(1, 12, cyclePos, isHuntDay);
    updateBTSession(2, 4, cyclePos, isHuntDay);
}

function updateBTSession(id, utcHour, cyclePos, isHuntDay) {
    const card = document.getElementById(`bt${id}-card`);
    const badge = document.getElementById(`bt${id}-badge`);
    const btTimer = document.getElementById(`bt${id}-timer`);
    const sessionStartInCycle = getSessionStartInCycle(utcHour);
    const sessionEndInCycle = sessionStartInCycle + EVENT_DURATION;

    // Ensure card is never dimmed as per request
    card.classList.remove('opacity-40');

    if (!isHuntDay) {
        badge.innerText = "Cooldown";
        badge.className = "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-gray-800 text-gray-500";
        const timeTillNext = (CYCLE_TIME - cyclePos) + sessionStartInCycle;
        btTimer.innerText = formatTime(timeTillNext);
        btTimer.classList.remove('text-green-400');
        btTimer.classList.add('text-frost');
        card.classList.remove('border-green-500/50', 'bg-green-500/5');
        return;
    }

    if (cyclePos < sessionStartInCycle) {
        badge.innerText = "Starting Soon";
        badge.className = "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-blue-500/20 text-blue-400";
        btTimer.innerText = formatTime(sessionStartInCycle - cyclePos);
        btTimer.classList.remove('text-green-400');
        btTimer.classList.add('text-frost');
        card.classList.remove('border-green-500/50', 'bg-green-500/5');
    } else if (cyclePos >= sessionStartInCycle && cyclePos < sessionEndInCycle) {
        badge.innerText = "Active Now";
        badge.className = "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-green-500 text-white animate-pulse";
        btTimer.innerText = formatTime(sessionEndInCycle - cyclePos);
        btTimer.classList.remove('text-frost');
        btTimer.classList.add('text-green-400');
        card.classList.add('border-green-500/50', 'bg-green-500/5');
    } else {
        badge.innerText = "Finished";
        badge.className = "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-gray-800 text-gray-600";
        const timeTillNext = (CYCLE_TIME - cyclePos) + sessionStartInCycle;
        btTimer.innerText = formatTime(timeTillNext);
        btTimer.classList.remove('text-green-400');
        btTimer.classList.add('text-frost');
        card.classList.remove('border-green-500/50', 'bg-green-500/5');
    }
}

function formatTime(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getRelativeTime(dateString) {
    const annDate = new Date(dateString);
    const today = new Date();
    annDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const diffDays = Math.ceil((today - annDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
}

function loadAnnouncements() {
    const wrapper = document.getElementById('announcement-wrapper');
    const showMoreBtn = document.getElementById('show-more-btn');
    const container = document.getElementById('show-more-container');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const sorted = [...ANNOUNCEMENTS].sort((a, b) => b.id - a.id);
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
    }
}

function createSnow() {
    if (document.querySelectorAll('.snowflake').length > 15) return;
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.innerHTML = '❄';
    snow.style.left = Math.random() * 100 + 'vw';
    const duration = 5 + Math.random() * 10;
    snow.style.animationDuration = duration + 's';
    snow.style.fontSize = (10 + Math.random() * 10) + 'px';
    document.body.appendChild(snow);

    setTimeout(() => {
        snow.remove();
    }, duration * 1000);
}




window.onload = () => {
    loadAnnouncements();
    setInterval(updateBearHunt, 1000);
    updateBearHunt();
    setInterval(createSnow, 1000);
    renderOfficers();
    
    // Setup floating bear functionality
    setupFloatingBear();
    
    document.getElementById('show-more-btn')?.addEventListener('click', () => {
        isShowingAll = !isShowingAll;
        loadAnnouncements();
    });
};
