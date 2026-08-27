// Section progress bar + scrollspy — one segment per nav section, both driven
// by the same boundary check so the fill and the active highlight can never disagree.
function setupSectionProgress() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link[data-section]'));
    const track = document.getElementById('scroll-progress-track');
    if (!navLinks.length || !track) return;

    track.innerHTML = '';
    const items = navLinks.map(link => {
        const section = document.getElementById(link.dataset.section);
        if (!section) return null;

        const segment = document.createElement('div');
        segment.className = 'flex-1 h-full bg-white/10 rounded-full overflow-hidden';

        const fill = document.createElement('div');
        fill.className = 'h-full w-0 rounded-full transition-[width] duration-150 ease-out';
        fill.style.backgroundColor = link.dataset.activeColor;

        segment.appendChild(fill);
        track.appendChild(segment);

        return { link, section, fill, top: 0, bottom: 0 };
    }).filter(Boolean);

    if (!items.length) return;

    // Matches `scroll-margin-top: 100px` on <section> in global.css, so tapping a
    // nav link lands its section's top exactly on this line — making it the active one.
    const TOP_OFFSET = 100;

    // section.offsetTop is relative to the nearest positioned ancestor (here, <main>,
    // which has `relative` on it) — not the actual page. getBoundingClientRect()
    // gives the true position regardless of any positioned ancestor in between.
    function documentTop(el) {
        return el.getBoundingClientRect().top + window.scrollY;
    }

    function measure() {
        items.forEach(item => {
            item.top = documentTop(item.section);
            item.bottom = item.top + item.section.offsetHeight;
        });
    }

    function update() {
        const currentY = window.scrollY + TOP_OFFSET;

        // Active section = the last one whose top has been reached — a plain
        // boundary check, so a short section (little/no height) can't get skipped
        // in favor of the one after it.
        let activeIndex = 0;
        items.forEach((item, index) => {
            if (currentY >= item.top) activeIndex = index;
        });

        items.forEach((item, index) => {
            const range = Math.max(1, item.bottom - item.top);
            const progress = Math.min(1, Math.max(0, (currentY - item.top) / range));
            item.fill.style.width = (progress * 100) + '%';

            const isActive = index === activeIndex;
            item.link.classList.toggle('active-link', isActive);
            item.link.style.color = isActive ? item.link.dataset.activeColor : '';
        });
    }

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            update();
        });
    }

    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); });
    // Re-measure once everything (images, fonts) has settled, since section
    // heights can shift slightly after initial load.
    window.addEventListener('load', () => { measure(); update(); });
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
    setTimeout(() => snow.remove(), duration * 1000);
}

// Consolidated initialisation
document.addEventListener('DOMContentLoaded', async () => {
    // Render dynamic content — each fetches from the API then renders
    await Promise.all([
        initGiftCodes(),
        initOfficers(),
        initAnnouncements(),
        initAchievements(),
        initCalendar()
    ]);

    // Bear hunt live timers
    updateBearHunt();
    setInterval(updateBearHunt, 1000);

    // Floating bear toggle
    setupFloatingBear();

    // Section progress bar + scrollspy (nav highlight)
    setupSectionProgress();

    // Snow fall effect
    setInterval(createSnow, 1000);

    // Show more/less announcements
    document.getElementById('show-more-btn')?.addEventListener('click', () => {
        visibleCount += 3;
        loadAnnouncements();
    });

    // Show more/less achievements
    document.getElementById('achievement-more-btn')?.addEventListener('click', () => {
        isShowingAllAchievements = !isShowingAllAchievements;
        loadAchievements();
    });

    document.getElementById('gift-more-btn')?.addEventListener('click', () => {
        isShowingAllGiftCodes = !isShowingAllGiftCodes;
        loadGiftCodes();
    });
});