// =========================
// GIFT CODES DATA
// =========================
const GIFT_CODES = [
    { code: "OFFICIALSTORE", dateAdded: "2026-04-28", description: "Redeem in-game for rewards" },
    { code: "GW2026JP", dateAdded: "2026-04-30", description: "Redeem in-game for rewards" },
    // ... add the rest of your codes here; include `description` if you want a short note
];

// =========================
// HELPER: Detect "new today"
// =========================
function isNewCodeToday(dateString) {
    const added = new Date(dateString);
    const now = new Date();
    const diffDays = (now - added) / (1000 * 60 * 60 * 24);
    return diffDays <= 3;
}

// Show more / less state
let isShowingAllGiftCodes = false;

// =========================
// RENDER GIFT CODES CARDS
// =========================
function loadGiftCodes() {
    const wrapper = document.getElementById('gift-code-wrapper');
    const moreContainer = document.getElementById('gift-more-container');
    const moreBtn = document.getElementById('gift-more-btn');

    if (!wrapper) return;

    wrapper.innerHTML = '';

    const sorted = [...GIFT_CODES].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    sorted.forEach((item, index) => {
        const isNew = isNewCodeToday(item.dateAdded);
        const card = document.createElement('div');

        const categoryColor = GIFT_CATEGORY_COLORS[GIFT_CODE_CATEGORY] || GIFT_CATEGORY_COLORS.official;
        const icon = "gift";
        const displayText = GIFT_CATEGORY_DISPLAY[GIFT_CODE_CATEGORY] || "GIFT CODE";

        // Highlight border if new
        const borderClass = isNew ? 'border-l-4 border-red-400' : `border-l-4 ${categoryColor.text}`;
        const bgClass = isNew ? 'from-red-500/5 to-red-500/10' : 'from-ice-mid to-ice-light';

        card.className = `bg-gradient-to-r ${bgClass} ${borderClass} rounded-r-lg p-4 shadow-lg transition-all hover:scale-[1.01]`;

        // Add extra ring for new codes
        if (isNew) {
            card.classList.add('ring-1', 'ring-red-400/30');
        }

        // Hide cards beyond the first 3 unless "Show More" is active
        if (index > 2 && !isShowingAllGiftCodes) {
            card.classList.add('hidden');
        }

        const iconColor = isNew ? "text-red-400 animate-pulse" : categoryColor.text;
        const iconBg = isNew ? 'bg-red-500/20' : 'bg-gray-500/10';

        // Build inner HTML (similar to achievement card)
        let innerHTML = `
            <div class="flex items-start">
                <div class="mr-4 flex-shrink-0 relative">
                    <div class="w-12 h-12 rounded-full ${iconColor} ${iconBg} flex items-center justify-center">
                        <i class="fa-solid fa-${icon} text-lg"></i>
                        ${isNew ? '<div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"><i class="fa-solid fa-star text-[8px] text-white"></i></div>' : ''}
                    </div>
                </div>
                <div class="ml-3 w-full">
                    <div class="flex justify-between items-center mb-1">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[11px] font-bold ${isNew ? 'text-red-400' : 'text-white'} uppercase tracking-widest">${item.code}</h3>
                            <span class="text-[8px] px-2 py-0.5 rounded-full ${isNew ? 'bg-red-500/30 text-red-400' : `${categoryColor.bg} ${categoryColor.text}`} font-bold uppercase">
                                ${isNew ? 'NEW TODAY!' : displayText}
                            </span>
                        </div>
                        <span class="text-[9px] ${isNew ? 'text-red-300' : 'text-gray-500'} font-bold uppercase">${getRelativeTime(item.dateAdded)}</span>
                    </div>
                    ${item.description ? `<p class="text-sm ${isNew ? 'text-gray-200' : 'text-gray-300'} mb-3">${item.description}</p>` : ''}
                    <!-- Code box with copy button, styled like the damage score box in achievements -->
                    <div class="mt-3 p-3 rounded-lg bg-gray-800/50 border ${isNew ? 'border-red-400/30' : 'border-gray-700'}">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-code ${isNew ? 'text-red-400' : 'text-yellow-400'}"></i>
                                <span class="text-xs text-gray-300 font-bold">GIFT CODE</span>
                            </div>
                            <div class="text-right flex items-center gap-3">
                                <span class="text-sm font-mono font-bold ${isNew ? 'text-red-400 animate-pulse' : 'text-white'}">${item.code}</span>
                                <button class="copy-btn text-xs bg-frost/20 text-frost px-2 py-1 rounded hover:bg-frost/30 transition" data-code="${item.code}">Copy</button>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-500 mt-1">Added on ${item.dateAdded}</p>
                    </div>
                    <!-- Footer meta -->
                    <div class="flex items-center gap-2 mt-3 text-[10px] ${isNew ? 'text-red-300' : 'text-gray-500'}">
                        <i class="fa-solid fa-calendar"></i>
                        <span>${item.dateAdded}</span>
                        <span class="mx-2">•</span>
                        <i class="fa-solid fa-gift ${categoryColor.text}"></i>
                        <span class="font-bold">${displayText}</span>
                        ${isNew ? '<span class="ml-2 text-red-400 font-bold">🔥 NEW TODAY!</span>' : ''}
                    </div>
                </div>
            </div>`;

        card.innerHTML = innerHTML;
        wrapper.appendChild(card);
    });

    // Attach copy button listeners
    document.querySelectorAll('#gift-code-wrapper .copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');
            navigator.clipboard.writeText(code);
            btn.innerText = "Copied!";
            btn.classList.add("text-green-400");
            setTimeout(() => {
                btn.innerText = "Copy";
                btn.classList.remove("text-green-400");
            }, 1500);
        });
    });

    // Show more/less button
    if (sorted.length > 3 && moreContainer) {
        moreContainer.classList.remove('hidden');
        if (moreBtn) {
            moreBtn.innerText = isShowingAllGiftCodes ? "Show Less Gift Codes" : "Show More Gift Codes";
        }
    } else if (moreContainer) {
        moreContainer.classList.add('hidden');
    }
}

// =========================
// FLOATING BUTTON LOGIC
// =========================
function hasNewGiftCodeToday() {
    return GIFT_CODES.some(code => isNewCodeToday(code.dateAdded));
}

function setupFloatingGiftCodes() {
    const floatingGift = document.getElementById('floating-gift');
    const giftSection = document.getElementById('gift-section');

    if (!floatingGift || !giftSection) return;

    if (hasNewGiftCodeToday()) {
        floatingGift.classList.remove('hidden');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        floatingGift.classList.add('opacity-0', 'pointer-events-none');
                        floatingGift.classList.remove('opacity-100');
                    } else {
                        floatingGift.classList.remove('opacity-0', 'pointer-events-none');
                        floatingGift.classList.add('opacity-100');
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-50% 0px -50% 0px' }
        );
        observer.observe(giftSection);
    } else {
        floatingGift.classList.add('hidden');
    }
}
