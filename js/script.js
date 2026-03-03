document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon (requires FontAwesome or similar, assuming icon text swap for now)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(252, 249, 242, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(252, 249, 242, 0.95)';
        }
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Initialize
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        startSlider();

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlider();
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                startSlider();
            });
        });
    }

    // --- Gallery Filtering (for gallery.html) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Small animation
                        item.style.animation = 'fadeUp 0.5s forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Lightbox Logic ---
    const galleryItemsForLightbox = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxCaption) {
        galleryItemsForLightbox.forEach(item => {
            // Check if there is an onclick attribute already; if so, skip (like in gallery.html redirecting)
            if (item.hasAttribute('onclick')) return;

            item.addEventListener('click', (e) => {
                const img = item.querySelector('img');
                const titleEl = item.querySelector('h4');
                const title = titleEl ? titleEl.innerText : '';

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.innerText = title;
                    lightbox.classList.add('show');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightboxImg.src = '';
                lightboxCaption.innerText = '';
            }, 300); // Wait for transition
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }

    // --- Video Playlist Logic ---
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainVideoPlayer = document.getElementById('main-video-player');
    const mainVideoTitle = document.getElementById('main-video-title');

    if (playlistItems.length > 0 && mainVideoPlayer && mainVideoTitle) {
        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all
                playlistItems.forEach(pi => pi.classList.remove('active'));

                // Add active to clicked
                item.classList.add('active');

                // Get data
                const videoId = item.getAttribute('data-video');
                const title = item.getAttribute('data-title');

                // Update Player and Title
                if (videoId) {
                    mainVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                }
                if (title) {
                    mainVideoTitle.innerText = title;
                }
            });
        });

        // Initialize the first item as active
        if (!document.querySelector('.playlist-item.active')) {
            playlistItems[0].classList.add('active');
        }
    }
});
