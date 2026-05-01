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
document.addEventListener('DOMContentLoaded', () => {
    // Render static content
    
    loadGiftCodes();
    setupFloatingGiftCodes();
    renderOfficers();
    loadAnnouncements();
    loadAchievements();
    setupFloatingAchievements();

    // Bear hunt live timers
    updateBearHunt();
    setInterval(updateBearHunt, 1000);

    // Floating bear toggle
    setupFloatingBear();

    // Snow fall effect
    setInterval(createSnow, 1000);

    // Show more/less announcements
    document.getElementById('show-more-btn')?.addEventListener('click', () => {
        isShowingAll = !isShowingAll;
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

