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

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Mobile submenu toggle
document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link (except submenu parents)
navMenu.querySelectorAll('a').forEach(link => {
    if (!link.parentElement.classList.contains('has-submenu')) {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
