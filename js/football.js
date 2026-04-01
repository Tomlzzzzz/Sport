    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const introTl = gsap.timeline({
        defaults: {
        ease: "power3.out",
    duration: 0.8
            }
        });

    introTl
    .from(".nav", {y: -30, autoAlpha: 0 })
    .from(".hero-title .line", {y: 80, autoAlpha: 0, stagger: 0.12 }, "-=0.2")
    .from(".hero-lead", {y: 30, autoAlpha: 0 }, "-=0.4")
    .from(".hero-stats .stat", {y: 30, autoAlpha: 0, stagger: 0.1 }, "-=0.3")
    .from(".hero-actions .btn", {y: 20, autoAlpha: 0, stagger: 0.12 }, "-=0.3")
    .from(".field-card", {scale: 0.92, autoAlpha: 0 }, "-=0.4")
    .from(".hero-note", {y: 20, autoAlpha: 0 }, "-=0.3");

    const arcPath = document.querySelector(".ball-arc path");
    if (arcPath) {
            const length = arcPath.getTotalLength();
    gsap.set(arcPath, {strokeDasharray: length, strokeDashoffset: length
             });
        }

    const heroScrollTl = gsap.timeline({
        scrollTrigger: {
        trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
            }
        });

    heroScrollTl
    .to(".ball-spin", {x: 150, y: -80 }, 0)
    .to(".ball-arc path", {
        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.7))"
                }, 0)
    .to(".ball-arc path", {strokeDashoffset: 0 }, 0);

    gsap.to(".ball-img", {
        rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
        });


        gsap.utils.toArray(".stat-number").forEach((stat) => {
            const value = Number(stat.dataset.count || 0);
    gsap.fromTo(
    stat,
    {innerText: 0 },
    {
        innerText: value,
    duration: 1.6,
    ease: "power1.out",
    snap: {innerText: 1 },
    scrollTrigger: {
        trigger: stat,
    start: "top 85%"
                    }
                }
    );
        });

    const benefitsSection = document.querySelector(".benefits");
    const benefitsTrack = document.querySelector(".benefits-track");
    const benefitsViewport = document.querySelector(".benefits-scroll");

    if (benefitsSection && benefitsTrack && benefitsViewport) {
            const getScrollAmount = () =>
    Math.max(0, benefitsTrack.scrollWidth - benefitsViewport.clientWidth);
            const getOffset = () => Math.min(benefitsViewport.clientWidth * 0.6, 360);
            const getTravel = () => getScrollAmount() + getOffset() * 2;
            const getScrollLength = () => getTravel() + Math.min(benefitsViewport.clientWidth * 0.6, 480);

    const scrollTween = gsap.fromTo(benefitsTrack, {
        x: () => getOffset()
            }, {
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
            });

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

    const footballSection = document.querySelector(".football-focus");
    if (footballSection) {
        const meterSegments = footballSection.querySelectorAll(".meter span");
        meterSegments.forEach((segment) => {
            segment.style.setProperty("--meter-fill", "0");
        });

        const footballTl = gsap.timeline({
            scrollTrigger: {
                trigger: footballSection,
                start: "top 75%",
                once: true
            }
        });

        footballTl
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

    gsap.from(".drill-item", {
        scrollTrigger: {
        trigger: ".drills",
    start: "top 85%"
            },
    x: -40,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.1
        });

    gsap.from(".lab-card", {
        scrollTrigger: {
        trigger: ".lab-grid",
    start: "top 80%"
            },
    y: 40,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.12
        });

    gsap.to(".progress-bar", {
        width: "100%",
    scrollTrigger: {
        trigger: ".gsap-lab",
    start: "top 70%",
    end: "bottom 20%",
    scrub: 1
            }
        });

    gsap.to(".typed-text", {
        scrollTrigger: {
        trigger: ".gsap-lab",
    start: "top 70%"
            },
    duration: 3.2,
    text: {
        value: "Timeline â€¢ ScrollTrigger â€¢ TextPlugin â€¢ Stagger",
    delimiter: ""
            },
    ease: "none"
        });

    gsap.from(".cta-card", {
        scrollTrigger: {
        trigger: ".cta",
    start: "top 80%"
            },
    scale: 0.96,
    autoAlpha: 0,
    duration: 0.8
        });

    const replayBtn = document.querySelector("#replay");
    if (replayBtn) {
        replayBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            introTl.restart();
        });
        }

