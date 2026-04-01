"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initAnimations();
    initCardInteractivity();
});

function initMobileMenu() {
    const burger = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    if (!burger || !navLinks) {
        return;
    }

    const navItems = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        burger.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    };

    burger.addEventListener("click", toggleMenu);

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    // Logo color logic
    const logo = document.querySelector('.logo');
    if (logo) {
        const rootStyles = getComputedStyle(document.documentElement);
        const athleColor = rootStyles.getPropertyValue('--nav-athle').trim() || '#e7b800';
        const basketColor = rootStyles.getPropertyValue('--nav-basket').trim() || '#f26522';
        const footColor = rootStyles.getPropertyValue('--nav-foot').trim() || '#22c55e';

        const navBasket = document.querySelector('.nav-basket');
        const navFoot = document.querySelector('.nav-foot');
        const navAthle = document.querySelector('.nav-athle');

        const changeLogoColor = (color) => {
            if (window.gsap) {
                gsap.to(logo, { color, duration: 0.3, ease: 'power2.out' });
            } else {
                logo.style.color = color;
            }
        };

        if (navBasket) {
            navBasket.addEventListener('mouseenter', () => changeLogoColor(basketColor));
            navBasket.addEventListener('mouseleave', () => changeLogoColor(athleColor));
        }
        if (navFoot) {
            navFoot.addEventListener('mouseenter', () => changeLogoColor(footColor));
            navFoot.addEventListener('mouseleave', () => changeLogoColor(athleColor));
        }
        if (navAthle) {
            navAthle.addEventListener('mouseenter', () => changeLogoColor(athleColor));
            navAthle.addEventListener('mouseleave', () => changeLogoColor(athleColor));
        }
    }
}

function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        return;
    }

    const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    introTl
        .from('.navbar', { y: -30, opacity: 0, duration: 0.9 })
        .from('.title-line', { y: 110, opacity: 0, duration: 1.1, stagger: 0.16, ease: 'power4.out' }, '-=0.45')
        .from('.hero-subtitle', { y: 28, opacity: 0, duration: 0.8 }, '-=0.65')
        .from('.hero-actions .btn', { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.45')
        .from('.hero-stats .stat-item', { y: 34, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.45')
        .from('.track-card', { x: 80, opacity: 0, duration: 1.3, ease: 'power4.out' }, '-=1')
        .from('.track-badge', { y: 18, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.8');

    gsap.to('.hero-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.utils.toArray('.text-reveal').forEach((element) => {
        gsap.from(element, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%'
            }
        });
    });

    gsap.utils.toArray('.img-reveal').forEach((element) => {
        gsap.from(element, {
            y: 70,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 82%'
            }
        });
    });

    gsap.utils.toArray('.fade-up').forEach((element) => {
        if (element.closest('.hero-stats')) return;

        gsap.from(element, {
            y: 55,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 88%'
            }
        });
    });

    gsap.utils.toArray('.parallax-img').forEach((image) => {
        gsap.fromTo(image,
            { yPercent: -8, scale: 1.12 },
            {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: image.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });

    gsap.utils.toArray('.scale-img').forEach((image) => {
        gsap.from(image, {
            scale: 1.15,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: image.parentElement,
                start: 'top 80%'
            }
        });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
}

function initCardInteractivity() {
    gsap.utils.toArray('.gallery-card').forEach((card) => {
        card.addEventListener('click', () => {
            gsap.utils.toArray('.gallery-card').forEach((other) => {
                if (other !== card) other.classList.remove('active');
            });
            card.classList.toggle('active');
        });

        const media = card.querySelector('img');
        if (media && window.gsap) {
            gsap.fromTo(media,
                { scale: 1.08 },
                {
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                }
            );
        }
    });
}

