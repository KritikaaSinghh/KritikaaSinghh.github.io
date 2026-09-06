document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================== */

    const loader = document.getElementById("loader");
    const loaderNumber = document.getElementById("loaderNumber");

    let loadingValue = 0;

    const loaderInterval = setInterval(() => {

        loadingValue += Math.floor(Math.random() * 12) + 5;

        if (loadingValue >= 100) {
            loadingValue = 100;
            clearInterval(loaderInterval);

            setTimeout(() => {
                loader.classList.add("hide");
            }, 300);
        }

        loaderNumber.textContent =
            String(loadingValue).padStart(2, "0");

    }, 120);


    /* =========================
       NAVBAR
    ========================== */

    const nav = document.getElementById("nav");

    function updateNav() {

        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNav);
    updateNav();


    /* =========================
       MOBILE MENU
    ========================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const opened = navLinks.classList.contains("open");

        menuBtn.setAttribute(
            "aria-label",
            opened ? "Close menu" : "Open menu"
        );

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });

    });


    /* =========================
       ACTIVE NAV
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    const navObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navigationLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach((entry, index) => {

                if (!entry.isIntersecting) return;

                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 45);

                revealObserver.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       CUSTOM CURSOR
    ========================== */

    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

    });

    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.13;
        cursorY += (mouseY - cursorY) * 0.13;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    document.querySelectorAll("a, button, .skill-chip").forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });

        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });

    });


    /* =========================
       MAGNETIC BUTTONS
    ========================== */

    document.querySelectorAll(".magnetic").forEach(element => {

        element.addEventListener("mousemove", event => {

            const rect = element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform = "";

        });

    });


    /* =========================
       HERO PARALLAX
    ========================== */

    const hero = document.querySelector(".hero");
    const stackItems =
        document.querySelectorAll(".hero-stack [data-speed]");

    if (hero && window.innerWidth > 800) {

        hero.addEventListener("mousemove", event => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

            stackItems.forEach(item => {

                const speed =
                    parseFloat(item.dataset.speed || "0");

                const moveX = x * speed * 100;
                const moveY = y * speed * 100;

                item.style.marginLeft = `${moveX}px`;
                item.style.marginTop = `${moveY}px`;

            });

        });

        hero.addEventListener("mouseleave", () => {

            stackItems.forEach(item => {
                item.style.marginLeft = "";
                item.style.marginTop = "";
            });

        });

    }


    /* =========================
       PHOTO 3D TILT
    ========================== */

    const photoCard =
        document.querySelector(".stack-photo");

    if (photoCard && window.innerWidth > 800) {

        photoCard.addEventListener("mousemove", event => {

            const rect = photoCard.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateY = (x - 0.5) * 10;
            const rotateX = (0.5 - y) * 10;

            photoCard.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        photoCard.addEventListener("mouseleave", () => {

            photoCard.style.transform =
                "rotate(-2.5deg)";

        });

    }


    /* =========================
       SCROLL PROGRESS
    ========================== */

    const progress =
        document.getElementById("scrollProgress");

    function updateProgress() {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = `${percentage}%`;

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();


    /* =========================
       THEME TOGGLE
    ========================== */

    const themeBtn =
        document.getElementById("themeBtn");

    const savedTheme =
        localStorage.getItem("kritika-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "kritika-theme",
            isLight ? "light" : "dark"
        );

    });


    /* =========================
       CONTACT FORM
    ========================== */

    const form =
        document.getElementById("contactForm");

    const submitBtn =
        document.getElementById("submitBtn");

    const formStatus =
        document.getElementById("formStatus");

    form.addEventListener("submit", async event => {

        event.preventDefault();

        const originalText =
            submitBtn.querySelector("span").textContent;

        submitBtn.disabled = true;

        submitBtn.querySelector("span").textContent =
            "Sending...";

        formStatus.textContent = "";

        const formData =
            new FormData(form);

        const data =
            Object.fromEntries(formData.entries());

        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/singhkritika8449@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result =
                await response.json();

            if (response.ok && result.success) {

                formStatus.textContent =
                    "Message sent successfully ✓";

                formStatus.style.color =
                    "#b993ff";

                form.reset();

            } else {

                throw new Error("Form submission failed");

            }

        } catch (error) {

            console.error(error);

            formStatus.textContent =
                "Couldn't send — please try again.";

            formStatus.style.color =
                "#ff8f9f";

        } finally {

            submitBtn.disabled = false;

            submitBtn.querySelector("span").textContent =
                originalText;

        }

    });


    /* =========================
       YEAR
    ========================== */

    document.getElementById("year").textContent =
        new Date().getFullYear();


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
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


    /* =========================
       PROJECT HOVER GLOW
    ========================== */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            card.style.background =
                `radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(166,108,255,.07),
                    transparent 35%
                )`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "";

        });

    });

});