
gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {

    const logo = document.querySelector('.logo');
    const basketColor = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();

    const changeLogoColor = (color) => {
        gsap.to(logo, { color: color, duration: 0.3, ease: 'power2.out' });
    };

    if (logo) {
        changeLogoColor(basketColor);
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
            if (btn.classList.contains('active')) return;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');


            const state = [];
            equipCards.forEach(card => {
                state.push({
                    el: card,
                    rect: card.getBoundingClientRect(),
                    isVisible: window.getComputedStyle(card).display !== 'none'
                });
            });

            equipCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isMatched = filter === 'all' || category.includes(filter);

                if (isMatched) {

                    card.style.display = 'block';
                } else {

                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });

            ScrollTrigger.refresh();

            equipCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isMatched = filter === 'all' || category.includes(filter);

                if (isMatched) {
                    const oldState = state.find(s => s.el === card);
                    const newRect = card.getBoundingClientRect();

                    if (oldState && oldState.isVisible) {

                        const dx = oldState.rect.left - newRect.left;
                        const dy = oldState.rect.top - newRect.top;

                        if (dx !== 0 || dy !== 0) {

                            gsap.fromTo(card,
                                { x: dx, y: dy },
                                { x: 0, y: 0, duration: 0.6, ease: "power3.out", delay: 0.05 }
                            );
                        }
                    } else {

                        gsap.fromTo(card,
                            { opacity: 0, scale: 0.9, x: 0, y: 0 },
                            { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
                        );
                    }
                }
            });

        });
    });

    equipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -15, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    const modal = document.getElementById('productModal');
    const modalImg = document.getElementById('modalImg');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    const productDetails = {
        'GENOUILLÃˆRES DE BASKETBALL': {
            features: [
                'Protection contre les chocs lÃ©gers',
                'Maintien compressif pour les muscles',
                'Tissu respirant Ã©vacuant la transpiration',
                'Confort optimal sans irritations'
            ]
        },
        'Chaussure de basketball Junior': {
            features: [
                'Amorti rÃ©actif pour les sauts',
                'Semelle non marquante pour le gymnase',
                'Maintien de la cheville renforcÃ©',
                'Design inspirÃ© des modÃ¨les NBA'
            ]
        },
        'Fauteuil roulant basket': {
            features: [
                'Cadre en aluminium ultra-lÃ©ger',
                'Roues carrossÃ©es pour la stabilitÃ©',
                'Assise rÃ©glable et personnalisable',
                'Conception robuste pour la compÃ©tition'
            ]
        }
    };

    const openModal = (card) => {
        const title = card.querySelector('h3').innerText;
        const tag = card.querySelector('.equip-tag').innerText;
        const desc = card.querySelector('p').innerText;
        const img = card.querySelector('img').src;
        const link = card.querySelector('.equip-link').href;
        const details = productDetails[title] || { features: ['Produit haute performance', 'Confort garanti'] };

        modalImg.src = img;
        modalTag.className = card.querySelector('.equip-tag').className;
        modalTag.innerText = tag;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalLink.href = link;

        modalFeatures.innerHTML = '';
        details.features.forEach(f => {
            const li = document.createElement('li');
            li.style.position = 'relative';
            li.style.paddingLeft = '25px';
            li.style.marginBottom = '12px';
            li.style.fontSize = '0.95rem';
            li.style.color = '#333';
            li.innerHTML = `<span style="position:absolute; left:0; color:var(--accent-color); font-weight:bold;">â€¢</span>${f}`;
            modalFeatures.appendChild(li);
        });

        modal.style.display = 'flex';
        gsap.to(modal, { opacity: 1, duration: 0.4 });
        gsap.to('.modal-container', { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        gsap.to(modal, {
            opacity: 0, duration: 0.3, onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        gsap.to('.modal-container', { scale: 0.9, duration: 0.3 });
    };

    equipCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('.equip-link')) return;
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
};

window.addEventListener("load", initAnimations);

