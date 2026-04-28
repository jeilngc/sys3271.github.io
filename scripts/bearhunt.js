const EVENT_DURATION = 30 * 60 * 1000;          // 30 minutes
const CYCLE_TIME = 48 * 60 * 60 * 1000;         // 48 hours
const HUNT_WINDOW = 24 * 60 * 60 * 1000;        // 24 hours
const BH_REF_START = new Date(2026, 0, 6, 0, 0, 0, 0).getTime();

function getSessionStartInCycle(utcHour) {
    const refStart = new Date(BH_REF_START);
    const candidateUtcMs = Date.UTC(
        refStart.getUTCFullYear(),
        refStart.getUTCMonth(),
        refStart.getUTCDate(),
        utcHour, 0, 0, 0
    );
    let offset = candidateUtcMs - refStart.getTime();
    const DAY_MS = 24 * 60 * 60 * 1000;
    if (offset < 0) offset += DAY_MS;
    return offset;
}

function isBearHuntDay() {
    const nowMs = Date.now();
    const elapsed = nowMs - BH_REF_START;
    const cyclePos = ((elapsed % CYCLE_TIME) + CYCLE_TIME) % CYCLE_TIME;
    return cyclePos < HUNT_WINDOW;
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
        if (bearImage) {
            bearImage.style.animation = 'gentle-pulse 2s infinite ease-in-out, glow-border 2s infinite ease-in-out';
        }
    }

    updateBTSession(1, 12, cyclePos, isHuntDay);
    updateBTSession(2, 14, cyclePos, isHuntDay);
}

function updateBTSession(id, utcHour, cyclePos, isHuntDay) {
    const card = document.getElementById(`bt${id}-card`);
    const badge = document.getElementById(`bt${id}-badge`);
    const btTimer = document.getElementById(`bt${id}-timer`);
    const sessionStartInCycle = getSessionStartInCycle(utcHour);
    const sessionEndInCycle = sessionStartInCycle + EVENT_DURATION;

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

function setupFloatingBear() {
    const floatingBear = document.getElementById('floating-bear');
    const bearhuntSection = document.getElementById('bearhunt-section');
    if (!floatingBear || !bearhuntSection) return;

    function updateFloatingBear() {
        if (isBearHuntDay()) {
            floatingBear.classList.remove('hidden');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            floatingBear.classList.add('opacity-0', 'pointer-events-none');
                            floatingBear.classList.remove('opacity-100');
                        } else {
                            floatingBear.classList.remove('opacity-0', 'pointer-events-none');
                            floatingBear.classList.add('opacity-100');
                        }
                    });
                },
                { threshold: 0.5, rootMargin: '-50% 0px -50% 0px' }
            );
            observer.observe(bearhuntSection);
        } else {
            floatingBear.classList.add('hidden');
        }
    }

    updateFloatingBear();
    setInterval(updateFloatingBear, 3600000);

    floatingBear.addEventListener('click', (e) => {
        e.preventDefault();
        bearhuntSection.scrollIntoView({ behavior: 'smooth' });
    });
}

