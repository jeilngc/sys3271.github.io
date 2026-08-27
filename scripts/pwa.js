// Registers the service worker and wires up the "Install App" button so
// users can add SYS Alliance to their home screen as an app that opens
// straight to this site.
(function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
        });
    }

    const installBtn = document.getElementById('install-app-btn');
    if (!installBtn) return;

    const iosModal = document.getElementById('ios-install-modal');
    const iosCloseBtn = document.getElementById('ios-install-close');

    const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true; // iOS Safari flag

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS 13+

    if (isStandalone) return; // already installed — nothing to do

    let deferredPrompt = null;

    // Chrome / Edge / Android fire this when the site qualifies as installable.
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove('hidden');
    });

    window.addEventListener('appinstalled', () => {
        installBtn.classList.add('hidden');
        deferredPrompt = null;
    });

    // iOS Safari has no install prompt API — show manual instructions instead.
    if (isIOS) {
        installBtn.classList.remove('hidden');
    }

    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            installBtn.classList.add('hidden');
            return;
        }
        if (isIOS && iosModal) {
            iosModal.classList.remove('hidden');
        }
    });

    iosCloseBtn?.addEventListener('click', () => iosModal.classList.add('hidden'));
    iosModal?.addEventListener('click', (e) => {
        if (e.target === iosModal) iosModal.classList.add('hidden');
    });
})();
