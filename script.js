/* =========================================================
   KRITIKA SINGH — CRAZY INTERACTIVE PORTFOLIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       PARTICLE / SPACE CANVAS
    ----------------------------------------------------- */

    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        createParticles();
    }

    function createParticles() {

        const amount = Math.min(
            130,
            Math.floor(window.innerWidth / 10)
        );

        particles = [];

        for (let i = 0; i < amount; i++) {

            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 1.5 + .2,
                speedX: (Math.random() - .5) * .18,
                speedY: (Math.random() - .5) * .18,
                alpha: Math.random() * .6 + .1
            });
        }
    }

    function animateSpace() {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach((p, index) => {

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = window.innerWidth;
            if (p.x > window.innerWidth) p.x = 0;

            if (p.y < 0) p.y = window.innerHeight;
            if (p.y > window.innerHeight) p.y = 0;

            const distanceMouse =
                Math.hypot(
                    p.x - mouse.x,
                    p.y - mouse.y
                );

            const glow =
                distanceMouse < 220
                    ? (1 - distanceMouse / 220)
                    : 0;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size + glow * 1.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(174,130,255,${p.alpha + glow * .5})`;

            ctx.fill();

            for (
                let j = index + 1;
                j < particles.length;
                j++
            ) {

                const q = particles[j];

                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 105) {

                    ctx.beginPath();

                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);

                    ctx.strokeStyle =
                        `rgba(139,77,255,${(
                            .10 * (1 - distance / 105)
                        )})`;

                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateSpace);
    }

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resizeCanvas();
    animateSpace();


    /* -----------------------------------------------------
       CUSTOM CURSOR
    ----------------------------------------------------- */

    const cursor = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;

    document.addEventListener("mousemove", e => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function cursorAnimation() {

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        ringX += (cursorX - ringX) * .15;
        ringY += (cursorY - ringY) * .15;

        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";

        requestAnimationFrame(cursorAnimation);
    }

    cursorAnimation();

    const interactiveElements =
        document.querySelectorAll(
            "a,button,.tilt,.cert,.process-card"
        );

    interactiveElements.forEach(el => {

        el.addEventListener("mouseenter", () => {
            ring.classList.add("big");
        });

        el.addEventListener("mouseleave", () => {
            ring.classList.remove("big");
        });
    });


    /* -----------------------------------------------------
       SCROLL PROGRESS
    ----------------------------------------------------- */

    const progress =
        document.querySelector(".scroll-progress");

    function updateProgress() {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = percentage + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();


    /* -----------------------------------------------------
       REVEAL ON SCROLL
    ----------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: .12
            }
        );

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* -----------------------------------------------------
       3D TILT CARDS
    ----------------------------------------------------- */

    const tiltCards =
        document.querySelectorAll(".tilt");

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 8;

            const rotateX =
                ((centerY - y) / centerY) * 8;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(10px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "";
        });
    });


    /* -----------------------------------------------------
       MAGNETIC BUTTONS
    ----------------------------------------------------- */

    const magnets =
        document.querySelectorAll(".magnetic");

    magnets.forEach(el => {

        el.addEventListener("mousemove", e => {

            const rect =
                el.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            el.style.transform =
                `translate(${x * .15}px,${y * .15}px)`;
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "";
        });
    });


    /* -----------------------------------------------------
       HERO MOUSE PARALLAX
    ----------------------------------------------------- */

    const scene =
        document.querySelector(".scene");

    if (scene) {

        document.addEventListener("mousemove", e => {

            if (window.innerWidth < 800) return;

            const x =
                (e.clientX / window.innerWidth - .5);

            const y =
                (e.clientY / window.innerHeight - .5);

            scene.style.transform =
                `translateY(-47%)
                 rotateX(${y * -3}deg)
                 rotateY(${x * 5}deg)`;
        });
    }


    /* -----------------------------------------------------
       COUNTERS
    ----------------------------------------------------- */

    const counters =
        document.querySelectorAll("[data-count]");

    const counterObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;
                const target =
                    Number(element.dataset.count);

                let current = 0;

                const interval =
                    setInterval(() => {

                        current++;

                        element.textContent =
                            String(current).padStart(2, "0");

                        if (current >= target) {
                            clearInterval(interval);
                        }

                    }, 120);

                counterObserver.unobserve(element);
            });

        }, { threshold: .7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* -----------------------------------------------------
       SKILL UNIVERSE MOUSE ROTATION
    ----------------------------------------------------- */

    const universe =
        document.querySelector(".skill-universe");

    if (universe && window.innerWidth > 760) {

        universe.addEventListener("mousemove", e => {

            const rect =
                universe.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (e.clientY - rect.top) /
                rect.height -
                .5;

            universe.style.transform =
                `rotateX(${y * -5}deg)
                 rotateY(${x * 5}deg)`;
        });

        universe.addEventListener("mouseleave", () => {
            universe.style.transform = "";
        });
    }


    /* -----------------------------------------------------
       CONTACT FORM — FORMSUBMIT AJAX
    ----------------------------------------------------- */

    const form =
        document.getElementById("contactForm");

    const status =
        document.getElementById("formStatus");

    if (form) {

        form.addEventListener("submit", async e => {

            e.preventDefault();

            const button =
                form.querySelector("button");

            const originalText =
                button.querySelector("span").textContent;

            button.disabled = true;

            button.querySelector("span").textContent =
                "SENDING...";

            status.textContent = "";

            const formData =
                new FormData(form);

            const payload = {};

            formData.forEach((value, key) => {
                payload[key] = value;
            });

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
                                JSON.stringify(payload)
                        }
                    );

                const result =
                    await response.json();

                if (response.ok && result.success) {

                    button.querySelector("span").textContent =
                        "MESSAGE SENT ✓";

                    status.textContent =
                        "Thanks! Your message has been sent successfully.";

                    form.reset();

                    setTimeout(() => {

                        button.disabled = false;

                        button.querySelector("span").textContent =
                            originalText;

                    }, 3500);

                } else {

                    throw new Error("Form submission failed");

                }

            } catch (error) {

                button.disabled = false;

                button.querySelector("span").textContent =
                    "TRY AGAIN";

                status.textContent =
                    "Couldn't send — please try again.";

                setTimeout(() => {
                    button.querySelector("span").textContent =
                        originalText;
                }, 2500);
            }

        });
    }


    /* -----------------------------------------------------
       ACTIVE NAV LINK
    ----------------------------------------------------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navAnchors =
        document.querySelectorAll(".nav-links a");

    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navAnchors.forEach(link => {
                            link.style.color = "";
                        });

                        const active =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );

                        if (active) {
                            active.style.color = "white";
                        }
                    }
                });

            },
            {
                threshold: .35
            }
        );

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* -----------------------------------------------------
       CERTIFICATE HOVER MAGNETIC EFFECT
    ----------------------------------------------------- */

    document.querySelectorAll(".cert").forEach(cert => {

        cert.addEventListener("mousemove", e => {

            const rect =
                cert.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width;

            const y =
                (e.clientY - rect.top) /
                rect.height;

            cert.style.transform =
                `perspective(600px)
                 rotateY(${(x - .5) * 2}deg)
                 rotateX(${(y - .5) * -2}deg)`;
        });

        cert.addEventListener("mouseleave", () => {
            cert.style.transform = "";
        });
    });


    /* -----------------------------------------------------
       RANDOM FLOATING CHIP DEPTH
    ----------------------------------------------------- */

    document.querySelectorAll(".floating-chip").forEach((chip, i) => {

        chip.style.animationDuration =
            `${3.5 + i * .7}s`;
    });


    /* -----------------------------------------------------
       BACK TO TOP
    ----------------------------------------------------- */

    document.querySelector(".back-top")
        ?.addEventListener("click", e => {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });


    /* -----------------------------------------------------
       DYNAMIC HERO PARALLAX VARIABLES
    ----------------------------------------------------- */

    document.addEventListener("mousemove", e => {

        const px =
            (e.clientX / window.innerWidth - .5) * 2;

        const py =
            (e.clientY / window.innerHeight - .5) * 2;

        document.documentElement.style
            .setProperty("--mouse-x", px);

        document.documentElement.style
            .setProperty("--mouse-y", py);
    });


    /* -----------------------------------------------------
       CONSOLE SIGNATURE
    ----------------------------------------------------- */

    console.log(
        "%cKritika Singh",
        "font-size:24px;font-weight:900;color:#9c63ff;"
    );

    console.log(
        "%cJava • Spring Boot • Backend Engineering",
        "font-size:12px;color:#aaa;"
    );

});