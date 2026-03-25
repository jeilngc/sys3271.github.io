const ANNOUNCEMENTS = [
{
    id: 39,
    message: "EVENTS FOR TODAY:\n\n• BT2 – 12:00 PM PHT (4:00 UTC)\n• BT1 – 8:20 PM PHT (12:20 UTC)\n\n• SvS Prep Day 3 – Best to focus on:\n→ Rallying Polar Terrors / Defeating Beasts (use Gina to save stamina, and turn on Auto Join by setting your formation to Jessie as lead)\n\nLAST DAY: Defeat nearby beasts, Flame & Fangs (redeem rewards)\n\nThank you, and have a great day! 😊",
    date: "2026-03-25"
},
{
    id: 38,
    message: "EVENTS FOR TODAY:\n\n• Crazy Joe – 9pm PHT (13 UTC)\n\n• SvS Prep Day 2 – Best to use:\n→ FC & Hero Shards, Lucky Wheel, Gather RSS, E.Skills, Expert Sigil, Dawn Academy upgrades (gathering boost + pet skill)\n• Last Day: Alliance Champ. Registraion – follow the guide sent\n• Frostfire Mine – pick your time\n\nLAST DAY: Flame & Fangs\n\nThank you",
    date: "2026-03-24"
},
{
    id: 37,
    message: "EVENTS FOR TODAY:\n\n• BT2 – 12pm PHT (4 UTC)\n• BT1 – 8:40pm PHT (12:40 UTC)\n\n• Mercenary Captain - after BT1 please be online(active) later to claim rewards\n\n• SvS Prep Day 1 – Best to Use:\n→ Construction Speedups\n\nLAST DAY: Officer Project, Mercenary Prestige\n\nThank you",
    date: "2026-03-23"
},
{
    id: 36,
    message: "EVENTS FOR TODAY:\n\n• Foundry:\n-> both L1 & L2 : 8pm PHT (12 UTC)\n\n• Flame & Fangs event - do intel today (follow the guide sent) to collect more crystallite cores tomorrow\n\n• Save for SvS Prep – Hold power/upgrade",
    date: "2026-03-22"
},

{
    id: 35,
    message: "EVENTS FOR TODAY:\n\n• BT2 – 12pm PHT (4 UTC)\n• BT1 – 9:05pm PHT (13:05 UTC)\n• Canyon Clash (Tonight)\n→ L1: 12 UTC (8pm PHT)\n→ L2: 14 UTC (10pm PHT)\n\n• SvS Matchmaking – Hold power, upgrade starting Monday\n• Mercenary Prestige, if no stamina request help.\n\nLAST DAY: Alliance Mobi. & Armament\n\nUPCOMING: (Tomorrow) Foundry L1 & L2",
    date: "2026-03-21"
},
{
    id: 34,
    message: "EVENTS FOR TODAY:\n\n• BT2 – 12pm PHT (4 UTC)\n• BT1 – 8pm PHT (12 UTC)\n\nLAST DAY:\n→ Lantern for Blessing (redeem all light up - blessing lantern)\n→ Fishing Tournament\n→ Officer Project\n\nThank you 😊",
    date: "2026-03-19"
},
    {
    id: 33,
    message: "EVENTS FOR TODAY:\n\n• Alliance Mobilization\n\n• Fishing tournament\n• Office Project\n• Hero's Mission (Philly)\n\nThank you",
    date: "2026-03-18"
},
    {
        id: 32,
        message: "EVENTS FOR TODAY:\n\n• BT1 - 8pm PHT(12utc)\n• BT2 - 12pm PHT (4utc)\n\n• Remember to vote and register to alliance events (same guide as yesterday)\nLAST DAY: Tundra Trading, Armament\nThank you", 
        date: "2026-03-17"
    },
    {
        id: 31,
        message: "Hi SYS Member's!\n\nI apologize for this website may not able to receive Daily updates temporarily- Although you can still use the bearhunt checker", 
        date: "2026-03-02"
    },
     {
        id: 30,
        message: "EVENT for 02/17 Tue\n\n• Bearhunt\n\n• Canyon Clash Voting Time slot\n• Foundry battle Time slot voting\n• Alliance Championship Registration\n• Alliance Mobilization\n\n• Armanent Competition\n• Fishing Tournament", 
        date: "2026-02-17"
    }
];
let isShowingAll = false;
// --- Gift codes ---
const GIFT_CODES = [
    { code: "jpholiday320", dateAdded: "2026-03-21" },
    { code: "EidMubarak2026", dateAdded: "2026-03-20" },
    
];
const ACHIEVEMENTS = [
    {
        id: 2,
        title: "BEAR HUNT  DAMAGE BREAKTHROUGH",
        description: "Smashed previous record with 10.6B damage in Bear Hunt BT1 session",
        date: "2026-03-24",
        category: "damage",
        damage: "14.8B",                // <-- added
        image: "img/achievements/bearhunt-record.jpg",
        highlight: true
    },
    {
        id: 1,
        title: "ALLIANCE CHAMPIONSHIP",
        description: "Our Alliance Ranked No. 3 in our group in round Diamond V",
        date: "2026-03-20",
        category: "events",
        image: "img/achievements/championship.jpg"
    },
];

let isShowingAllAchievements = false;

// --- Achievements Data with Icon Mapping ---

// Icon mapping by category
const ACHIEVEMENT_ICONS = {
    ranking: "trophy",
    damage: "paw",
    events: "medal",
    war: "shield-halved",
    diplomacy: "comments",
    recruitment: "user-plus"
};

// Category display text mapping
const CATEGORY_DISPLAY = {
    ranking: "TOP RANKING",
    damage: "DAMAGE RECORD",
    events: "EVENT VICTORY",
    war: "WAR ACHIEVEMENT",
    diplomacy: "DIPLOMACY",
    recruitment: "RECRUITMENT"
};

// Category color mapping
const CATEGORY_COLORS = {
    ranking: { text: "text-yellow-400", bg: "bg-yellow-500/20" },
    damage: { text: "text-red-400", bg: "bg-red-500/20" },
    events: { text: "text-blue-400", bg: "bg-blue-500/20" },
    war: { text: "text-red-500", bg: "bg-red-600/20" },
    diplomacy: { text: "text-green-400", bg: "bg-green-500/20" },
    recruitment: { text: "text-purple-400", bg: "bg-purple-500/20" }
};


// Function to load achievements
function loadAchievements() {
    const wrapper = document.getElementById('achievement-wrapper');
    const showMoreBtn = document.getElementById('achievement-more-btn');
    const container = document.getElementById('achievement-more-container');
    
    if (!wrapper) return;
    
    wrapper.innerHTML = '';
    
    // Sort achievements by ID (newest first)
    const sorted = [...ACHIEVEMENTS].sort((a, b) => b.id - a.id);
    
    sorted.forEach((achievement, index) => {
        const achievementElement = document.createElement('div');
        
        const categoryColor = CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.events;
        const icon = ACHIEVEMENT_ICONS[achievement.category] || "medal";
        const displayText = CATEGORY_DISPLAY[achievement.category] || achievement.category.toUpperCase();
        
        const isHighlighted = achievement.highlight;
        const borderClass = isHighlighted ? 'border-l-4 border-red-400' : `border-l-4 ${categoryColor.text}`;
        const bgClass = isHighlighted ? 'from-red-500/5 to-red-500/10' : 'from-ice-mid to-ice-light';
        
        achievementElement.className = `bg-gradient-to-r ${bgClass} ${borderClass} rounded-r-lg p-4 shadow-lg transition-all hover:scale-[1.01]`;
        
        if (isHighlighted) {
            achievementElement.classList.add('ring-1', 'ring-red-400/30');
        }
        
        if (index > 2 && !isShowingAllAchievements) {
            achievementElement.classList.add('hidden');
        }
        
        const iconColor = isHighlighted ? "text-red-400 animate-pulse" : categoryColor.text;
        const iconBg = isHighlighted ? 'bg-red-500/20' : 'bg-gray-500/10';
        
        // Build inner HTML
        let innerHTML = `
            <div class="flex items-start">
                <div class="mr-4 flex-shrink-0 relative">
                    <div class="w-12 h-12 rounded-full ${iconColor} ${iconBg} flex items-center justify-center">
                        <i class="fa-solid fa-${icon} text-lg"></i>
                        ${isHighlighted ? '<div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"><i class="fa-solid fa-star text-[8px] text-white"></i></div>' : ''}
                    </div>
                </div>
                
                <div class="ml-3 w-full">
                    <div class="flex justify-between items-center mb-1">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[11px] font-bold ${isHighlighted ? 'text-red-400' : 'text-white'} uppercase tracking-widest">${achievement.title}</h3>
                            <span class="text-[8px] px-2 py-0.5 rounded-full ${isHighlighted ? 'bg-red-500/30 text-red-400' : `${categoryColor.bg} ${categoryColor.text}`} font-bold uppercase">
                                ${isHighlighted ? 'NEW RECORD!' : displayText}
                            </span>
                        </div>
                        <span class="text-[9px] ${isHighlighted ? 'text-red-300' : 'text-gray-500'} font-bold uppercase">${getRelativeTime(achievement.date)}</span>
                    </div>
                    
                    <p class="text-sm ${isHighlighted ? 'text-gray-200' : 'text-gray-300'} mb-3">${achievement.description}</p>
        `;
        
        
        // Damage Score Block (only for damage achievements)
        if (achievement.category === "damage" && achievement.damage) {
            innerHTML += `
                <div class="mt-3 p-3 rounded-lg bg-gray-800/50 border ${isHighlighted ? 'border-red-400/30' : 'border-gray-700'}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-bolt ${isHighlighted ? 'text-red-400' : 'text-yellow-400'}"></i>
                            <span class="text-xs text-gray-300 font-bold">DAMAGE SCORE</span>
                        </div>
                        <div class="text-right">
                            <span class="text-lg font-bold ${isHighlighted ? 'text-red-400 animate-pulse' : 'text-yellow-400'}">
                                ${achievement.damage}
                            </span>
                            <p class="text-[10px] text-gray-500">${isHighlighted ? 'NEW RECORD!' : 'Previous Record'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Footer with meta info
        innerHTML += `
                    <div class="flex items-center gap-2 mt-3 text-[10px] ${isHighlighted ? 'text-red-300' : 'text-gray-500'}">
                        <i class="fa-solid fa-calendar"></i>
                        <span>${achievement.date}</span>
                        <span class="mx-2">•</span>
                        <i class="fa-solid fa-${icon} ${categoryColor.text}"></i>
                        <span class="font-bold">${displayText}</span>
                        ${isHighlighted ? '<span class="ml-2 text-red-400 font-bold">🔥 NEW RECORD!</span>' : ''}
                    </div>
                </div>
            </div>
        `;
        
        achievementElement.innerHTML = innerHTML;
        wrapper.appendChild(achievementElement);
    });
    
    // Show/hide "Show More" button
    if (sorted.length > 3) {
        container.classList.remove('hidden');
        if (showMoreBtn) {
            showMoreBtn.innerText = isShowingAllAchievements ? "Show Less Achievements" : "Show More Achievements";
        }
    } else {
        container.classList.add('hidden');
    }
}




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
// --- Gift codes Functions ---
function isNewCode(dateString) {
    const added = new Date(dateString);
    const now = new Date();

    const diffDays = (now - added) / (1000 * 60 * 60 * 24);
    return diffDays <= 3;
}

function renderGiftCodes() {
    const container = document.getElementById('gift-code-wrapper');
    if (!container) return;

    container.innerHTML = GIFT_CODES.map(item => {
        const isNew = isNewCode(item.dateAdded);

        return `
            <div class="glass-panel p-3 rounded-lg flex justify-between items-center border border-gray-700">
                
                <div class="flex items-center gap-2">
                    <span class="font-bold text-white">${item.code}</span>

                    ${isNew ? `
                        <span class="text-[8px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full font-bold animate-pulse">
                            NEW
                        </span>
                    ` : ''}
                </div>

                <button 
    class="copy-btn text-xs bg-frost/20 text-frost px-2 py-1 rounded"
    data-code="${item.code}"
>
    Copy
</button>

            </div>
        `;
    }).join('');
    enableCopyButtons();
}
function enableCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');

            navigator.clipboard.writeText(code);

            // feedback
            btn.innerText = "Copied!";
            btn.classList.add("text-green-400");

            setTimeout(() => {
                btn.innerText = "Copy";
                btn.classList.remove("text-green-400");
            }, 1500);
        });
    });
}
function showNewCodeFloating() {
    const hasNew = GIFT_CODES.some(c => isNewCode(c.dateAdded));
    if (!hasNew) return;

    const box = document.createElement('div');

    box.className = `
        fixed bottom-36 right-4 z-50
        bg-red-500/20 border border-red-400/30
        text-red-300 px-4 py-2 rounded-lg
        shadow-lg animate-pulse cursor-pointer
    `;

    box.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-gift"></i>
            <span class="text-xs font-bold uppercase">New Code Available</span>
        </div>
    `;

    // optional scroll
    box.onclick = () => {
        document.getElementById('gift-section')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    document.body.appendChild(box);
}
document.addEventListener("DOMContentLoaded", () => {
    renderGiftCodes();
    showNewCodeFloating();
});
// --- Configuration & Constants ---
const EVENT_DURATION = 30 * 60 * 1000;
const CYCLE_TIME = 48 * 60 * 60 * 1000;
const HUNT_WINDOW = 24 * 60 * 60 * 1000; 
const BH_REF_START = new Date(2026, 0, 6, 0, 0, 0, 0).getTime();



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
    
    // Get today's date (start of day for comparison)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter announcements to only show current or past dates
    const sorted = [...ANNOUNCEMENTS]
        .filter(ann => {
            const annDate = new Date(ann.date);
            annDate.setHours(0, 0, 0, 0);
            return annDate <= today;
        })
        .sort((a, b) => b.id - a.id);
    
    // Show message if no announcements available
    if (sorted.length === 0) {
        wrapper.innerHTML = `
            <div class="glass-panel p-6 rounded-xl text-center border border-gray-700">
                <i class="fa-solid fa-calendar-alt text-gray-500 text-2xl mb-2"></i>
                <p class="text-gray-400 text-sm">No announcements yet.</p>
                <p class="text-gray-500 text-xs mt-1">Check back later for updates!</p>
            </div>
        `;
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
    
    // Show/hide "Show More" button based on filtered count
    if (sorted.length > 5) {
        container.classList.remove('hidden');
        showMoreBtn.innerText = isShowingAll ? "Show Less" : "Show More";
    } else {
        container.classList.add('hidden');
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

// Check if any achievement has today's date
function hasNewAchievementToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    return ACHIEVEMENTS.some(achievement => achievement.date === todayStr);
}

// Setup floating achievements button
function setupFloatingAchievements() {
    const floatingAchievements = document.getElementById('floating-achievements');
    const achievementsSection = document.getElementById('achievements-section');
    
    if (!floatingAchievements || !achievementsSection) return;
    
    if (hasNewAchievementToday()) {
        floatingAchievements.classList.remove('hidden');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floatingAchievements.classList.add('opacity-0', 'pointer-events-none');
                        floatingAchievements.classList.remove('opacity-100');
                    } else {
                        floatingAchievements.classList.remove('opacity-0', 'pointer-events-none');
                        floatingAchievements.classList.add('opacity-100');
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-50% 0px -50% 0px' }
        );
        
        observer.observe(achievementsSection);
    }
}


// Update the window.onload function to include achievements
window.onload = () => {
    loadAnnouncements();
    loadAchievements(); // Add this line
    setInterval(updateBearHunt, 1000);
    updateBearHunt();
    setInterval(createSnow, 1000);
    renderOfficers();
    setupFloatingAchievements();
    
    // Setup floating bear functionality
    setupFloatingBear();
    
    
    // Announcements show more button
    document.getElementById('show-more-btn')?.addEventListener('click', () => {
        isShowingAll = !isShowingAll;
        loadAnnouncements();
    });
    
    // Achievements show more button
    document.getElementById('achievement-more-btn')?.addEventListener('click', () => {
        isShowingAllAchievements = !isShowingAllAchievements;
        loadAchievements();
    });
};
