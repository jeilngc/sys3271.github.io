const ACHIEVEMENTS = [
    {
        id: 3,
        title: "BEAR HUNT  DAMAGE BREAKTHROUGH",
        description: "Smashed previous record with 20.4B damage in Bear Hunt BT2 session",
        date: "2026-04-24",
        category: "damage",
        damage: "20.4B",
        image: "img/achievements/bearhunt-record.jpg",
        highlight: true
    },
    // ... (rest of the array unchanged)
];

const ACHIEVEMENT_ICONS = {
    ranking: "trophy",
    damage: "paw",
    events: "medal",
    war: "shield-halved",
    diplomacy: "comments",
    recruitment: "user-plus"
};

const CATEGORY_DISPLAY = {
    ranking: "TOP RANKING",
    damage: "DAMAGE RECORD",
    events: "EVENT VICTORY",
    war: "WAR ACHIEVEMENT",
    diplomacy: "DIPLOMACY",
    recruitment: "RECRUITMENT"
};

const CATEGORY_COLORS = {
    ranking: { text: "text-yellow-400", bg: "bg-yellow-500/20" },
    damage: { text: "text-red-400", bg: "bg-red-500/20" },
    events: { text: "text-blue-400", bg: "bg-blue-500/20" },
    war: { text: "text-red-500", bg: "bg-red-600/20" },
    diplomacy: { text: "text-green-400", bg: "bg-green-500/20" },
    recruitment: { text: "text-purple-400", bg: "bg-purple-500/20" }
};

let isShowingAllAchievements = false;

function loadAchievements() {
    const wrapper = document.getElementById('achievement-wrapper');
    const showMoreBtn = document.getElementById('achievement-more-btn');
    const container = document.getElementById('achievement-more-container');
    if (!wrapper) return;

    wrapper.innerHTML = '';

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
                    <p class="text-sm ${isHighlighted ? 'text-gray-200' : 'text-gray-300'} mb-3">${achievement.description}</p>`;

        if (achievement.category === "damage" && achievement.damage) {
            innerHTML += `
                <div class="mt-3 p-3 rounded-lg bg-gray-800/50 border ${isHighlighted ? 'border-red-400/30' : 'border-gray-700'}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-bolt ${isHighlighted ? 'text-red-400' : 'text-yellow-400'}"></i>
                            <span class="text-xs text-gray-300 font-bold">DAMAGE SCORE</span>
                        </div>
                        <div class="text-right">
                            <span class="text-lg font-bold ${isHighlighted ? 'text-red-400 animate-pulse' : 'text-yellow-400'}">${achievement.damage}</span>
                            <p class="text-[10px] text-gray-500">${isHighlighted ? 'NEW RECORD!' : 'Previous Record'}</p>
                        </div>
                    </div>
                </div>`;
        }

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
            </div>`;

        achievementElement.innerHTML = innerHTML;
        wrapper.appendChild(achievementElement);
    });

    if (sorted.length > 3) {
        container.classList.remove('hidden');
        if (showMoreBtn) {
            showMoreBtn.innerText = isShowingAllAchievements ? "Show Less Achievements" : "Show More Achievements";
        }
    } else {
        container.classList.add('hidden');
    }
}

function hasNewAchievementToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    return ACHIEVEMENTS.some(achievement => achievement.date === todayStr);
}

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

