// Smooth scrolling and navbar
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor2.style.left = e.clientX + 'px';
        cursor2.style.top = e.clientY + 'px';
    });

    // Cursor animation for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .proposal-card, .work-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
                        cursor.style.transform = 'scale(1.5)';
            cursor2.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor2.style.transform = 'scale(1)';
        });
    });

    // Character reveal animation
    const chars = document.querySelectorAll('.char');
    chars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.05}s`;
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animateElements = document.querySelectorAll('.about, .services, .proposals, .work, .testimonials, .contact, .service-card, .proposal-card, .work-item, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // Testimonials slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Navbar active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(a => {
                    a.classList.remove('active');
                });
                document.querySelector(`.nav-menu a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    });

    // Proposal page parameter handling (for proposal.html)
    const urlParams = new URLSearchParams(window.location.search);
    const proposalType = urlParams.get('type');
    if (proposalType) {
        document.body.setAttribute('data-proposal', proposalType);
    }

    // WhatsApp click tracking
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            // You can add analytics here
            console.log('WhatsApp clicked!');
        });
    });

    // Parallax effect for hero particles
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-particles');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Button glow pulse animation
    setInterval(() => {
        const buttons = document.querySelectorAll('.cta-btn.primary');
        buttons.forEach(btn => {
            btn.style.boxShadow = Math.random() > 0.5 
                ? '0 0 30px rgba(0, 212, 255, 0.6)' 
                : '0 20px 40px rgba(0, 212, 255, 0.4)';
        });
    }, 2000);

    // Preloader (if you want to add one)
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Add to CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--neon-blue) !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
        background: var(--neon-blue) !important;
    }
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1rem;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);