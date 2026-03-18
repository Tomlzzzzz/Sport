gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {
    const tl = gsap.timeline();

    tl.to(".loader-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    })
    .to(".loader-text", {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.inOut"
    })
    .to(".loader", {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
    }, "-=0.2")
    .from(".navbar", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
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
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
    }, "-=1.5");

    gsap.to(".hero-img", {
        yPercent: 15,
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
            y: 100,
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
            { yPercent: -10, scale: 1.1 },
            {
                yPercent: 10,
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
};

window.addEventListener("load", initAnimations);
