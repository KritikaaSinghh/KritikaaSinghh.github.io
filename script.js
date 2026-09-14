document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       STAR FIELD
    ========================================== */

    const canvas = document.getElementById("stars");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let stars = [];

        function resizeCanvas() {

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            const amount = Math.min(
                180,
                Math.max(
                    50,
                    Math.floor((width * height) / 10000)
                )
            );

            stars = Array.from(
                { length: amount },
                () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.2,
                    speed: Math.random() * 0.25 + 0.05,
                    alpha: Math.random() * 0.7 + 0.2,
                    twinkle: Math.random() * 0.03
                })
            );
        }

        function drawStars() {

            ctx.clearRect(0, 0, width, height);

            for (const star of stars) {

                star.y -= star.speed;

                if (star.y < -5) {
                    star.y = height + 5;
                    star.x = Math.random() * width;
                }

                star.alpha += star.twinkle;

                if (star.alpha > 0.95 || star.alpha < 0.15) {
                    star.twinkle *= -1;
                }

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(190,140,255,${star.alpha})`;

                ctx.fill();
            }

            requestAnimationFrame(drawStars);
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas,
            { passive: true }
        );

        drawStars();
    }


    /* ==========================================
       CUSTOM CURSOR
    ========================================== */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursor) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.13;
        ringY += (mouseY - ringY) * 0.13;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    document
        .querySelectorAll(
            "a, button, .project-card, .skill-node, .cert-card"
        )
        .forEach(element => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("hovering");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("hovering");
            });
        });


    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    window.addEventListener("mousemove", event => {

        if (!heroVisual || window.innerWidth < 800) {
            return;
        }

        const x =
            event.clientX / window.innerWidth - 0.5;

        const y =
            event.clientY / window.innerHeight - 0.5;

        heroVisual.style.setProperty(
            "--mx",
            `${x * 18}px`
        );

        heroVisual.style.setProperty(
            "--my",
            `${y * 18}px`
        );
    });


    /* ==========================================
       3D TILT
    ========================================== */

    document
        .querySelectorAll("[data-tilt]")
        .forEach(card => {

            card.addEventListener("mousemove", event => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -10;

                const rotateY =
                    ((x / rect.width) - 0.5) * 10;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateZ(10px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });


    /* ==========================================
       MAGNETIC BUTTONS
    ========================================== */

    document
        .querySelectorAll(".magnetic")
        .forEach(button => {

            button.addEventListener("mousemove", event => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });
        });


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }


    /* ==========================================
       NAV ACTIVE STATE
    ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar nav a");

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            ) {
                                link.classList.add("active");
                            }
                        });

                    });

                },
                {
                    threshold: 0.35
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const mainNav =
        document.getElementById("mainNav");

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                mainNav.classList.toggle("mobile-open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                });
            });

        document.addEventListener("click", event => {

            if (
                !mainNav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                mainNav.classList.remove(
                    "mobile-open"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    /* ==========================================
       SMOOTH INTERNAL LINKS
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });


    /* ==========================================
       BACK TO TOP
    ========================================== */

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 700) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }

        }, { passive: true });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    if (contactForm && formStatus) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );

                if (!submitButton) {
                    return;
                }

                const buttonText =
                    submitButton.querySelector("span");

                if (!buttonText) {
                    return;
                }

                buttonText.textContent =
                    "Sending...";

                submitButton.disabled = true;

                formStatus.textContent = "";
                formStatus.style.color = "#70e0b0";

                const formData =
                    new FormData(contactForm);

                const data =
                    Object.fromEntries(
                        formData.entries()
                    );

                try {

                    const response =
                        await fetch(
                            "https://formsubmit.co/ajax/singhkritika8449@gmail.com",
                            {
                                method: "POST",
                                headers: {
                                    Accept:
                                        "application/json",
                                    "Content-Type":
                                        "application/json"
                                },
                                body:
                                    JSON.stringify(data)
                            }
                        );

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result.message ||
                            "Failed to send message."
                        );
                    }

                    buttonText.textContent =
                        "Message Sent ✓";

                    formStatus.textContent =
                        "Thanks! Your message has been sent successfully.";

                    contactForm.reset();

                    setTimeout(() => {

                        buttonText.textContent =
                            "Send Message";

                        submitButton.disabled =
                            false;

                    }, 2500);

                } catch (error) {

                    buttonText.textContent =
                        "Try Again";

                    submitButton.disabled =
                        false;

                    formStatus.textContent =
                        "Couldn't send — please try again.";

                    formStatus.style.color =
                        "#ff7b9c";
                }
            }
        );
    }


    /* ==========================================
       SCROLL PROGRESS
    ========================================== */

    const progress =
        document.createElement("div");

    progress.style.position = "fixed";
    progress.style.top = "0";
    progress.style.left = "0";
    progress.style.height = "2px";
    progress.style.width = "0";
    progress.style.background =
        "linear-gradient(90deg,#7137ff,#d946ef,#63e6ff)";
    progress.style.zIndex = "9999";
    progress.style.boxShadow =
        "0 0 15px #a855f7";
    progress.style.pointerEvents = "none";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    }, { passive: true });


    /* ==========================================
       SORTING VISUALIZER ANIMATION
    ========================================== */

    document
        .querySelectorAll(".sorting-bars i")
        .forEach((bar, index) => {

            bar.style.animationDelay =
                `${index * 0.12}s`;
        });


    /* ==========================================
       NAME GLITCH
    ========================================== */

    const heroName =
        document.querySelector(".hero-title strong");

    if (heroName) {

        heroName.addEventListener(
            "mouseenter",
            () => {

                heroName.style.textShadow =
                    "3px 0 #d946ef, -3px 0 #63e6ff";

                setTimeout(() => {

                    heroName.style.textShadow =
                        "";

                }, 180);
            }
        );
    }

});