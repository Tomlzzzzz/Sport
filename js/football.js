document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initAnimations();
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
}

function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const introTl = initIntroAnimation();
    initHeroScrollAnimation();
    initBallSpinAnimation();
    initStatsCounterAnimation(introTl);
    initBenefitsAnimation();
    initFootballFocusAnimation();
}

function initIntroAnimation() {
    const introTl = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 0.8
        }
    });

    introTl
        .from(".nav", { y: -30, autoAlpha: 0 })
        .from(".hero-title .line", { y: 80, autoAlpha: 0, stagger: 0.12 }, "-=0.2")
        .from(".hero-lead", { y: 30, autoAlpha: 0 }, "-=0.4")
        .from(".hero-stats .stat", { y: 30, autoAlpha: 0, stagger: 0.1 }, "-=0.3")
        .add("statsVisible")
        .from(".hero-actions .btn", { y: 20, autoAlpha: 0, stagger: 0.12 }, "-=0.3")
        .from(".field-card", { scale: 0.92, autoAlpha: 0 }, "-=0.4");

    const arcPath = document.querySelector(".ball-arc path");
    if (arcPath) {
        const pathLength = arcPath.getTotalLength();
        gsap.set(arcPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
    }

    return introTl;
}

function initHeroScrollAnimation() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    })
        .to(".ball-spin", { x: 150, y: -80 }, 0)
        .to(".ball-arc path", { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.7))" }, 0)
        .to(".ball-arc path", { strokeDashoffset: 0 }, 0);
}

function initBallSpinAnimation() {
    gsap.to(".ball-img", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none"
    });
}

function initStatsCounterAnimation(introTl) {
    const stats = gsap.utils.toArray(".stat-number");
    if (!stats.length) {
        return;
    }

    let hasStarted = false;
    const startCounters = () => {
        if (hasStarted) {
            return;
        }
        hasStarted = true;

        stats.forEach((stat) => {
            const value = Number(stat.dataset.count || 0);
            if (Number.isNaN(value)) {
                return;
            }

            const counter = { value: 0 };
            stat.textContent = "0";

            gsap.to(counter, {
                value,
                duration: 1.6,
                ease: "power1.out",
                onUpdate: () => {
                    stat.textContent = String(Math.round(counter.value));
                }
            });
        });
    };

    if (introTl) {
        introTl.call(startCounters, null, "statsVisible+=0.1");
        return;
    }

    startCounters();
}

function initBenefitsAnimation() {
    const benefitsSection = document.querySelector(".benefits");
    const benefitsTrack = document.querySelector(".benefits-track");
    const benefitsViewport = document.querySelector(".benefits-scroll");

    if (!benefitsSection || !benefitsTrack || !benefitsViewport) {
        return;
    }

    const getScrollAmount = () => Math.max(0, benefitsTrack.scrollWidth - benefitsViewport.clientWidth);
    const getOffset = () => Math.min(benefitsViewport.clientWidth * 0.6, 360);
    const getTravel = () => getScrollAmount() + getOffset() * 2;
    const getScrollLength = () => getTravel() + Math.min(benefitsViewport.clientWidth * 0.6, 480);

    const scrollTween = gsap.fromTo(
        benefitsTrack,
        { x: () => getOffset() },
        {
            x: () => -getScrollAmount() - getOffset(),
            ease: "none",
            scrollTrigger: {
                trigger: benefitsSection,
                start: "top top",
                end: () => `+=${getScrollLength()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        }
    );

    gsap.utils.toArray(".benefit-card").forEach((card) => {
        gsap.from(card, {
            autoAlpha: 0,
            y: 50,
            duration: 2,
            scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "right right"
            }
        });
    });
}

function initFootballFocusAnimation() {
    const footballSection = document.querySelector(".football-focus");
    if (!footballSection) {
        return;
    }

    const meterSegments = footballSection.querySelectorAll(".meter span");
    meterSegments.forEach((segment) => {
        segment.style.setProperty("--meter-fill", "0");
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: footballSection,
            start: "top 75%",
            once: true
        }
    })
        .from(".football-focus .section-head .eyebrow", {
            y: 18,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out"
        })
        .from(".football-focus .section-head h2", {
            y: 28,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.2")
        .from(".football-focus .section-head .section-lead", {
            y: 24,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.out"
        }, "-=0.3")
        .from(".football-focus .football-card", {
            y: 48,
            autoAlpha: 0,
            rotateX: -8,
            transformOrigin: "center top",
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out"
        }, "-=0.2")
        .to(meterSegments, {
            "--meter-fill": 1,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out"
        }, "-=0.35");
}