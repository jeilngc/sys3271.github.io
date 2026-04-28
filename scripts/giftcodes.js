const GIFT_CODES = [
    { code: "OFFICIALSTORE", dateAdded: "4-28-2026" },
    // ... (rest of your codes)
];

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
                    ${isNew ? `<span class="text-[8px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full font-bold animate-pulse">NEW</span>` : ''}
                </div>
                <button class="copy-btn text-xs bg-frost/20 text-frost px-2 py-1 rounded" data-code="${item.code}">Copy</button>
            </div>`;
    }).join('');

    enableCopyButtons();
}

function enableCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
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
}

function showNewCodeFloating() {
    const hasNew = GIFT_CODES.some(c => isNewCode(c.dateAdded));
    if (!hasNew) return;

    const box = document.createElement('div');
    box.className = `fixed bottom-36 right-4 z-50 bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-lg shadow-lg animate-pulse cursor-pointer`;
    box.innerHTML = `<div class="flex items-center gap-2"><i class="fa-solid fa-gift"></i><span class="text-xs font-bold uppercase">New Code Available</span></div>`;
    box.onclick = () => document.getElementById('gift-section')?.scrollIntoView({ behavior: 'smooth' });
    document.body.appendChild(box);
}

