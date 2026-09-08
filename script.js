document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       STAR FIELD
    ========================================== */

    const canvas = document.getElementById("stars");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let width;
        let height;
        let stars = [];

        function resizeCanvas() {

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            const amount = Math.min(
                180,
                Math.floor((width * height) / 9000)
            );

            stars = Array.from(
                { length: amount },
                () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + .2,
                    speed: Math.random() * .25 + .05,
                    alpha: Math.random() * .7 + .2,
                    twinkle: Math.random() * .03
                })
            );
        }

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        function drawStars() {

            ctx.clearRect(0, 0, width, height);

            stars.forEach(star => {

                star.y -= star.speed;

                if (star.y < -5) {
                    star.y = height + 5;
                    star.x = Math.random() * width;
                }

                star.alpha += star.twinkle;

                if (star.alpha > .95 || star.alpha < .15) {
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

            });

            requestAnimationFrame(drawStars);
        }

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

    window.addEventListener("mousemove", e => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }

    });

    function animateCursor() {

        ringX += (mouseX - ringX) * .13;
        ringY += (mouseY - ringY) * .13;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    document
        .querySelectorAll("a, button, .project-card, .skill-node")
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

    const heroVisual = document.querySelector(".hero-visual");

    window.addEventListener("mousemove", e => {

        if (!heroVisual || window.innerWidth < 800) {
            return;
        }

        const x =
            e.clientX / window.innerWidth - .5;

        const y =
            e.clientY / window.innerHeight - .5;

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

            card.addEventListener("mousemove", e => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - .5) * -10;

                const rotateY =
                    ((x / rect.width) - .5) * 10;

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

            button.addEventListener("mousemove", e => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    button.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .12}px, ${y * .12}px)`;
            });


            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });

        });


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

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
                threshold: .12
            }
        );


    document
        .querySelectorAll(".reveal")
        .forEach(element => {
            revealObserver.observe(element);
        });


    /* ==========================================
       NAV ACTIVE
    ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar nav a");

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
                threshold: .35
            }
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


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

            mainNav.classList.toggle(
                "mobile-open"
            );
        });


        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                });

            });


        document.addEventListener("click", e => {

            if (
                !mainNav.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                mainNav.classList.remove(
                    "mobile-open"
                );
            }

        });

    }


    /* ==========================================
       SMOOTH INTERNAL LINKS ONLY
       External GitHub / LinkedIn are untouched.
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

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

                e.preventDefault();

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

        });


        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ==========================================
       CONTACT FORM
       FORM SUBMIT AJAX
    ========================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async e => {

                e.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );

                const buttonText =
                    submitButton.querySelector("span");

                buttonText.textContent = "Sending...";

                submitButton.disabled = true;

                formStatus.textContent = "";


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
                                    "Accept":
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
                            "Failed"
                        );
                    }


                    buttonText.textContent =
                        "Message Sent ✓";

                    formStatus.textContent =
                        "Thanks! Your message has been sent successfully.";

                    formStatus.style.color =
                        "#70e0b0";

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

    });


    /* ==========================================
       SORTING VISUALIZER ANIMATION
    ========================================== */

    document
        .querySelectorAll(".sorting-bars i")
        .forEach((bar, index) => {

            bar.style.animationDelay =
                `${index * .12}s`;

        });


    /* ==========================================
       NAME GLITCH
    ========================================== */

    const heroName =
        document.querySelector(
            ".hero-title strong"
        );

    if (heroName) {

        heroName.addEventListener(
            "mouseenter",
            () => {

                heroName.style.textShadow =
                    "3px 0 #d946ef,-3px 0 #63e6ff";

                setTimeout(() => {

                    heroName.style.textShadow =
                        "";

                }, 180);

            }
        );

    }

});