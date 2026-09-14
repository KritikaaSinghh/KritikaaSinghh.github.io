document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body =
        document.body;

    const starsContainer =
        document.getElementById("stars");

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );

    const cursorRing =
        document.querySelector(
            ".cursor-ring"
        );

    const scrollProgress =
        document.querySelector(
            ".scroll-progress"
        );

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-link"
        );

    const backToTop =
        document.getElementById(
            "backToTop"
        );

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formStatus =
        document.getElementById(
            "formStatus"
        );


    /* =====================================================
       STAR FIELD
    ====================================================== */

    function createStars() {

        if (!starsContainer) {
            return;
        }

        const totalStars =
            window.innerWidth < 700
                ? 55
                : 90;

        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < totalStars;
            i++
        ) {

            const star =
                document.createElement(
                    "span"
                );

            star.className =
                "star";

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.setProperty(
                "--duration",
                `${2 + Math.random() * 5}s`
            );

            star.style.animationDelay =
                `${Math.random() * 5}s`;

            fragment.appendChild(
                star
            );

        }


        starsContainer.appendChild(
            fragment
        );

    }


    createStars();


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let ringX =
        mouseX;

    let ringY =
        mouseY;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            if (cursorDot) {

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.14;

        ringY +=
            (mouseY - ringY) * 0.14;


        if (cursorRing) {

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

        }


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document
        .querySelectorAll(
            `
            a,
            button,
            input,
            textarea,
            .skill-card,
            .project-card,
            .cert-card
            `
        )
        .forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function closeMenu() {

        if (
            !menuToggle ||
            !navLinks
        ) {
            return;
        }


        menuToggle.classList.remove(
            "active"
        );

        navLinks.classList.remove(
            "open"
        );

        body.classList.remove(
            "menu-open"
        );

    }


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                menuToggle.classList.toggle(
                    "active"
                );

                navLinks.classList.toggle(
                    "open"
                );

                body.classList.toggle(
                    "menu-open"
                );

            }
        );

    }


    navItems.forEach(
        (link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const offset =
                            window.innerWidth < 800
                                ? 88
                                : 105;


                        const targetTop =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            offset;


                        window.scrollTo({
                            top:
                                targetTop,
                            behavior:
                                "smooth"
                        });

                    }
                );

            }
        );


    /* =====================================================
       ACTIVE NAV
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 180;

        let currentId =
            "home";


        sections.forEach(
            (section) => {

                if (
                    scrollPosition >=
                    section.offsetTop
                ) {

                    currentId =
                        section.id;

                }

            }
        );


        navItems.forEach(
            (link) => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    target ===
                    `#${currentId}`
                );

            }
        );

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateScrollProgress() {

        const documentHeight =
            document.documentElement
                .scrollHeight
            -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (
                    window.scrollY /
                    documentHeight
                ) * 100
                : 0;


        if (scrollProgress) {

            scrollProgress.style.width =
                `${progress}%`;

        }

    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 550) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       3D TILT
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );


    tiltCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 900
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 5;


                    const rotateX =
                        -(
                            (y - centerY) /
                            centerY
                        ) * 5;


                    card.style.transform =
                        `
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateZ(10px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticButtons.forEach(
        (button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 850
                    ) {
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
                        `
                        translate(
                            ${x * 0.16}px,
                            ${y * 0.16}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    let ticking =
        false;


    function updateHeroParallax() {

        if (
            !heroVisual ||
            window.innerWidth < 900
        ) {

            ticking =
                false;

            return;
        }


        const scrollY =
            window.scrollY;


        const offset =
            Math.min(
                scrollY * 0.12,
                70
            );


        heroVisual.style.transform =
            `translateY(${offset}px)`;


        ticking =
            false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateHeroParallax
                );

                ticking =
                    true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                if (formStatus) {

                    formStatus.textContent =
                        "Sending message...";

                    formStatus.className =
                        "form-status";

                }


                const submitButton =
                    contactForm.querySelector(
                        ".submit-btn"
                    );


                const originalText =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML =
                        "Sending...";

                }


                try {

                    const formData =
                        new FormData(
                            contactForm
                        );


                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",

                                headers: {
                                    Accept:
                                        "application/json"
                                },

                                body:
                                    formData
                            }
                        );


                    const result =
                        await response
                            .json()
                            .catch(
                                () => ({})
                            );


                    if (response.ok) {

                        if (formStatus) {

                            formStatus.textContent =
                                "✓ Message sent successfully!";

                            formStatus.className =
                                "form-status success";

                        }


                        contactForm.reset();

                    } else {

                        throw new Error(
                            result.message ||
                            "Unable to send message."
                        );

                    }

                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            "Something went wrong. Please email me directly.";

                        formStatus.className =
                            "form-status error";

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalText;

                    }

                }

            }
        );

    }


    /* =====================================================
       GENERAL SCROLL HANDLER
    ====================================================== */

    function handleScroll() {

        updateActiveNav();

        updateScrollProgress();

        updateBackToTop();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 820
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );

});