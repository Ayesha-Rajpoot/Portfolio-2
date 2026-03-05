/**
 * Portfolio Logic
 * - Navbar Scroll Effect
 * - Mobile Menu Toggle
 * - Portfolio Filtering
 * - Form Handling 
 * - Scroll Animations (Intersection Observer)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar transparency logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove scrolled if it's the home page (where it starts transparent)
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 2. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(8px, -8px)' : 'none';
        });
    }

    // 3. Portfolio Data & Filtering
    const portfolioItems = [
        { id: 1, title: 'The Daily Post', category: 'blog', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Creative Agency', category: 'agency', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Foodie Hub', category: 'restaurant', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'CorpSolutions', category: 'business', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'ShopZone', category: 'ecommerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'My Portfolio', category: 'portfolio', image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&w=800&q=80' }
    ];

    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderPortfolio(filter = 'all') {
        if (!portfolioGrid) return;

        portfolioGrid.innerHTML = '';
        const filtered = filter === 'all'
            ? portfolioItems
            : portfolioItems.filter(item => item.category === filter);

        filtered.forEach(item => {
            const el = document.createElement('div');
            el.className = 'portfolio-item';
            el.dataset.category = item.category;
            el.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <span>${item.category}</span>
                    <h4>${item.title}</h4>
                    <a href="#" class="btn btn-outline btn-sm" style="padding: 8px 15px; font-size: 13px;">View Project</a>
                </div>
            `;
            portfolioGrid.appendChild(el);
        });
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                renderPortfolio(btn.dataset.filter);
            });
        });
        renderPortfolio(); // Init
    }

    // 4. Form Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                formSuccess.style.display = 'block';
                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
            }, 1500);
        });
    }

    // 5. Scroll Animations (Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial reveal tags (we can add some base styles for these)
    const revealElements = document.querySelectorAll('.service-card, .about-content, .hero-content, .timeline-item, .process-step');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom CSS for intersection observer
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
