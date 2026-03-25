gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {

    const logo = document.querySelector('.logo');
    const navBasket = document.querySelector('.nav-basket');
    const navFoot = document.querySelector('.nav-foot');
    const navAthle = document.querySelector('.nav-athle');

    const defaultColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim();
    const basketColor = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();
    const footColor = getComputedStyle(document.body).getPropertyValue('--foot-color').trim();
    const athleColor = getComputedStyle(document.body).getPropertyValue('--athle-color').trim();

    const changeLogoColor = (color) => {
        gsap.to(logo, { color: color, duration: 0.3, ease: 'power2.out' });
    };

    if (navBasket && logo) {
        navBasket.addEventListener('mouseenter', () => changeLogoColor(basketColor));
        navBasket.addEventListener('mouseleave', () => changeLogoColor(defaultColor));
    }
    if (navFoot && logo) {
        navFoot.addEventListener('mouseenter', () => changeLogoColor(footColor));
        navFoot.addEventListener('mouseleave', () => changeLogoColor(defaultColor));
    }
    if (navAthle && logo) {
        navAthle.addEventListener('mouseenter', () => changeLogoColor(athleColor));
        navAthle.addEventListener('mouseleave', () => changeLogoColor(defaultColor));
    }

    const tl = gsap.timeline();

    tl.from(".navbar", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
        .from(".title-line", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.8")
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".hero-image-container", {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1")
        .from(".hero-img", {
            scale: 1.3,
            duration: 2,
            ease: "power2.out"
        }, "-=1.5");

    gsap.to(".hero-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    const textReveals = gsap.utils.toArray(".text-reveal");
    textReveals.forEach((text) => {
        gsap.from(text, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const imgReveals = gsap.utils.toArray(".img-reveal");
    imgReveals.forEach((imgCont) => {
        gsap.from(imgCont, {
            y: 80,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: imgCont,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const parallaxImgs = gsap.utils.toArray(".parallax-img");
    parallaxImgs.forEach((img) => {
        gsap.fromTo(img,
            { yPercent: -8, scale: 1.15 },
            {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });

    const scaleImgs = gsap.utils.toArray(".scale-img");
    scaleImgs.forEach((img) => {
        gsap.from(img, {
            scale: 1.2,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const fadeUps = gsap.utils.toArray(".fade-up");
    fadeUps.forEach((elem) => {
        gsap.from(elem, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const mapElement = document.getElementById('map');
    if (mapElement && typeof L !== 'undefined') {
        const hdfMap = L.map('map').setView([50.485, 2.800], 8);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(hdfMap);

        const markerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: '<div style="background-color:#F26522; width:20px; height:20px; border-radius:50%; border:3px solid #FFF; box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const items = document.querySelectorAll('.location-item');
        const markers = [];

        items.forEach((item) => {
            const lat = parseFloat(item.getAttribute('data-lat'));
            const lng = parseFloat(item.getAttribute('data-lng'));

            const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(hdfMap);
            markers.push({ item, marker });

            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                hdfMap.flyTo([lat, lng], 13, {
                    duration: 1.5
                });
            });

            marker.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                hdfMap.flyTo([lat, lng], 13, {
                    duration: 1.5
                });
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });

        setTimeout(() => {
            hdfMap.invalidateSize();
        }, 500);
    }
    const filterBtns = document.querySelectorAll('.filter-btn');
    const equipCards = document.querySelectorAll('.equip-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            equipCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    gsap.to(card, { scale: 1, opacity: 1, duration: 0.4, display: 'block', ease: 'power2.out' });
                } else {
                    gsap.to(card, { scale: 0.8, opacity: 0, duration: 0.4, display: 'none', ease: 'power2.in' });
                }
            });
            ScrollTrigger.refresh();
        });
    });
};

window.addEventListener("load", initAnimations);
