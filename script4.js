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

if (menuToggle && navMenu) {
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
}

// Tabs functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasActive = item.classList.contains('active');
        
        // Close all accordion items in the same accordion
        const accordion = item.closest('.accordion');
        accordion.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Toggle current item
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// Expand buttons functionality
const expandTeam = document.getElementById('expandTeam');
const teamContent = document.getElementById('teamContent');

if (expandTeam && teamContent) {
    expandTeam.addEventListener('click', () => {
        expandTeam.classList.toggle('active');
        teamContent.classList.toggle('active');
    });
}

const expandCentro = document.getElementById('expandCentro');
const centroContent = document.getElementById('centroContent');

if (expandCentro && centroContent) {
    expandCentro.addEventListener('click', () => {
        expandCentro.classList.toggle('active');
        centroContent.classList.toggle('active');
    });
}

// Eventi Carousel functionality
const eventiTrack = document.getElementById('eventiTrack');
const eventiPrev = document.getElementById('eventiPrev');
const eventiNext = document.getElementById('eventiNext');
const eventiDotsContainer = document.getElementById('eventiDots');

if (eventiTrack && eventiPrev && eventiNext && eventiDotsContainer) {
    const cards = eventiTrack.querySelectorAll('.evento-card');
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        eventiDotsContainer.appendChild(dot);
    });

    const dots = eventiDotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        eventiTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    eventiPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    eventiNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    // Touch support for mobile
    let startX = 0;
    let isDragging = false;

    eventiTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    eventiTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
    });

    eventiTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % cards.length;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            }
            updateCarousel();
        }
    });
}

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
