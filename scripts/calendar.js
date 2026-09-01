// =========================
// CALENDAR — backed by /api/events (D1), admin-managed
// =========================
let EVENTS = [];
let calViewDate = new Date(); // month currently being viewed
let calSelectedDate = null;   // 'YYYY-MM-DD' or null (null = show upcoming list)

const EVENT_CATEGORY_COLORS = {
    event: { text: "text-frost", bg: "bg-frost/20", dot: "bg-frost" },
    svs: { text: "text-red-400", bg: "bg-red-500/20", dot: "bg-red-400" },
    sunfire_castle: { text: "text-orange-400", bg: "bg-orange-500/20", dot: "bg-orange-400" },
    other: { text: "text-purple-400", bg: "bg-purple-500/20", dot: "bg-purple-400" }
};

const EVENT_CATEGORY_LABELS = {
    event: "Alliance Event",
    svs: "SVS",
    sunfire_castle: "Sunfire Castle",
    other: "Other"
};

function catLabel(category) {
    return EVENT_CATEGORY_LABELS[category] || (category ? category.replace(/_/g, ' ') : "Event");
}

function catColor(category) {
    return EVENT_CATEGORY_COLORS[category] || EVENT_CATEGORY_COLORS.event;
}

function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function fetchEvents() {
    try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        EVENTS = await res.json();
    } catch (err) {
        console.error(err);
        EVENTS = [];
    }
}

function eventsOnDate(dateStr) {
    return EVENTS.filter(e => e.date === dateStr);
}

function renderCalendarGrid() {
    const grid = document.getElementById('cal-grid');
    const weekdaysEl = document.getElementById('cal-weekdays');
    const label = document.getElementById('cal-month-label');
    if (!grid || !label) return;

    const year = calViewDate.getFullYear();
    const month = calViewDate.getMonth(); // 0-indexed

    label.textContent = calViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

    weekdaysEl.innerHTML = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        .map(d => `<div class="text-[10px] text-gray-500 font-bold uppercase">${d}</div>`)
        .join('');

    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = todayStr();

    let cells = '';
    for (let i = 0; i < startOffset; i++) {
        cells += `<div></div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = eventsOnDate(dateStr);
        const isToday = dateStr === today;
        const isSelected = dateStr === calSelectedDate;
        const isBattleDay = dayEvents.some(e => e.highlight);

        let btnClasses = "aspect-square w-full rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-colors relative";
        if (isSelected) {
            btnClasses += " bg-frost text-ice-dark";
        } else if (isBattleDay) {
            btnClasses += " bg-sys-gold/20 text-sys-gold border-2 border-sys-gold shadow-[0_0_10px_rgba(251,191,36,0.55)]";
        } else if (isToday) {
            btnClasses += " bg-frost/20 text-frost border border-frost/50";
        } else {
            btnClasses += " text-gray-300 hover:bg-ice-mid";
        }

        let dots = '';
        if (dayEvents.length && !isSelected) {
            const uniqueCats = [...new Set(dayEvents.map(e => e.category))].slice(0, 3);
            dots = `<div class="flex gap-0.5 mt-0.5">${uniqueCats.map(c => `<span class="w-1 h-1 rounded-full ${catColor(c).dot}"></span>`).join('')}</div>`;
        }

        const star = isBattleDay && !isSelected
            ? `<i class="fa-solid fa-star absolute top-0.5 right-0.5 text-[7px] text-sys-gold"></i>`
            : '';

        cells += `<button type="button" class="${btnClasses}" data-date="${dateStr}">
            ${star}
            <span>${day}</span>
            ${dots}
        </button>`;
    }

    grid.innerHTML = cells;

    grid.querySelectorAll('button[data-date]').forEach(btn => {
        btn.addEventListener('click', () => {
            const date = btn.dataset.date;
            calSelectedDate = calSelectedDate === date ? null : date;
            renderCalendarGrid();
            renderEventList();
        });
    });
}

function formatDateLabel(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function eventCardHTML(ev) {
    const colors = catColor(ev.category);
    const borderClass = ev.highlight ? 'border-sys-gold' : colors.text.replace('text-', 'border-');
    const cardExtra = ev.highlight ? ' shadow-[0_0_10px_rgba(251,191,36,0.25)]' : '';
    return `
        <div class="row-card-frontend bg-ice-mid/50 border-l-4 ${borderClass} rounded-r-lg p-3${cardExtra}">
            <div class="flex items-start justify-between gap-2">
                <div>
                    <p class="text-sm font-bold text-white">
                        ${ev.highlight ? `<i class="fa-solid fa-star text-sys-gold mr-1"></i>` : ''}${ev.title}
                    </p>
                    ${ev.description ? `<p class="text-xs text-gray-400 mt-0.5">${ev.description}</p>` : ''}
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="text-[9px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-bold uppercase">${catLabel(ev.category)}</span>
                    ${ev.highlight ? `<span class="text-[9px] px-2 py-0.5 rounded-full bg-sys-gold/20 text-sys-gold font-bold uppercase">Battle Day</span>` : ''}
                </div>
            </div>
            <div class="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                <i class="fa-solid fa-calendar"></i>
                <span>${formatDateLabel(ev.date)}</span>
                ${ev.time ? `<span class="mx-1">•</span><i class="fa-solid fa-clock"></i><span>${ev.time}</span>` : ''}
            </div>
        </div>`;
}

function renderEventList() {
    const listLabel = document.getElementById('cal-list-label');
    const list = document.getElementById('cal-event-list');
    if (!list || !listLabel) return;

    if (calSelectedDate) {
        const dayEvents = eventsOnDate(calSelectedDate);
        listLabel.textContent = formatDateLabel(calSelectedDate).toUpperCase();
        list.innerHTML = dayEvents.length
            ? dayEvents.map(eventCardHTML).join('')
            : `<p class="text-gray-500 text-sm">No events on this day.</p>`;
        return;
    }

    listLabel.textContent = 'Upcoming Events';
    const today = todayStr();
    const upcoming = EVENTS.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
    list.innerHTML = upcoming.length
        ? upcoming.map(eventCardHTML).join('')
        : `<p class="text-gray-500 text-sm">No upcoming events scheduled.</p>`;
}

function setupCalendarNav() {
    document.getElementById('cal-prev')?.addEventListener('click', () => {
        calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() - 1, 1);
        calSelectedDate = null;
        renderCalendarGrid();
        renderEventList();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
        calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() + 1, 1);
        calSelectedDate = null;
        renderCalendarGrid();
        renderEventList();
    });
}

function setupFloatingCalendarBadge() {
    const badge = document.getElementById('floating-calendar-badge');
    if (!badge) return;
    const today = todayStr();
    const tomorrow = (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();
    const hasSoonEvent = EVENTS.some(e => e.date === today || e.date === tomorrow);
    if (hasSoonEvent) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
    }
}

function renderLegend() {
    const legend = document.getElementById('cal-legend');
    if (!legend) return; // not present on index.html, only calendar.html

    const usedCats = [...new Set(EVENTS.map(e => e.category))]
        .sort((a, b) => catLabel(a).localeCompare(catLabel(b)));

    if (!usedCats.length) {
        legend.innerHTML = `<p class="text-[10px] text-gray-500">No events yet — add one from the admin panel.</p>`;
        return;
    }

    let html = usedCats.map(cat => {
        const colors = catColor(cat);
        return `<div class="flex items-center gap-1.5 text-[10px] text-gray-400">
            <span class="w-2 h-2 rounded-full ${colors.dot}"></span> ${catLabel(cat)}
        </div>`;
    }).join('');

    if (EVENTS.some(e => e.highlight)) {
        html += `<div class="flex items-center gap-1.5 text-[10px] text-gray-400">
            <i class="fa-solid fa-star text-sys-gold text-[9px]"></i> Battle Day
        </div>`;
    }

    legend.innerHTML = html;
}

async function initCalendar() {
    await fetchEvents();
    calSelectedDate = todayStr();
    calViewDate = new Date();
    renderCalendarGrid();
    renderEventList();
    renderLegend();
    setupCalendarNav();
    setupFloatingCalendarBadge();
}
