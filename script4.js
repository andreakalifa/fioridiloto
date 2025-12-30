const templateBanner = document.getElementById('templateBanner');
const closeBanner = document.getElementById('closeBanner');
const bannerClosed = sessionStorage.getItem('bannerClosed');

if (!bannerClosed) {
    document.body.classList.add('banner-visible');
} else {
    templateBanner.classList.add('hidden');
}

closeBanner.addEventListener('click', () => {
    templateBanner.classList.add('hidden');
    document.body.classList.remove('banner-visible');
    sessionStorage.setItem('bannerClosed', 'true');
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.template-btn').forEach(btn => {
    const btnHref = btn.getAttribute('href');
    if (btnHref === currentPage) btn.classList.add('active');
    else btn.classList.remove('active');
});
