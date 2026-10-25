"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // ELEMENTS
    // =========================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const progressBar = document.querySelector(".scroll-progress");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("current-year");

    // =========================================
    // CURRENT YEAR
    // =========================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Toggle navigation");
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isExpanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", String(!isExpanded));
            navLinks.classList.toggle("open", !isExpanded);
            document.body.classList.toggle("menu-open", !isExpanded);
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }

    // =========================================
    // SCROLL PROGRESS + BACK TO TOP
    // =========================================

    let ticking = false;

    function updateScrollUI() {
        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (backToTop) {
            backToTop.classList.toggle("visible", scrollTop > 450);
        }

        ticking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollUI);
                ticking = true;
            }
        },
        { passive: true }
    );

    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =========================================
    // REVEAL ANIMATIONS
    // =========================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // =========================================
    // ACTIVE NAVIGATION LINK
    // =========================================

    const pageSections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && pageSections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // =========================================
    // RANDOM BACKGROUND STARS
    // =========================================

    const starsContainer = document.getElementById("stars");

    if (starsContainer) {
        const starCount = window.innerWidth < 600 ? 35 : 65;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("span");

            star.className = "star";
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;

            fragment.appendChild(star);
        }

        starsContainer.appendChild(fragment);
    }

    // =========================================
    // CERTIFICATE MODAL
    // =========================================

    const certificateModal =
        document.getElementById("certificate-modal");

    const certificateImage =
        document.getElementById("certificate-modal-image");

    const certificateTitle =
        document.getElementById("modal-title");

    const certificateError =
        document.getElementById("certificate-modal-error");

    const certificateClose =
        document.getElementById("certificate-modal-close");

    const certificateButtons =
        document.querySelectorAll(".certificate-view-btn");

    let lastFocusedElement = null;

    function openCertificate(button) {
        if (
            !certificateModal ||
            !certificateImage ||
            !certificateTitle
        ) {
            return;
        }

        const imagePath = button.dataset.certificate;
        const title = button.dataset.title || "Certificate";

        if (!imagePath) {
            return;
        }

        lastFocusedElement = button;

        certificateTitle.textContent = title;
        certificateImage.alt = `${title} certificate`;
        certificateImage.hidden = false;

        if (certificateError) {
            certificateError.hidden = true;
        }

        certificateImage.onerror = () => {
            certificateImage.hidden = true;

            if (certificateError) {
                certificateError.hidden = false;
            }
        };

        certificateImage.onload = () => {
            certificateImage.hidden = false;

            if (certificateError) {
                certificateError.hidden = true;
            }
        };

        certificateImage.src = imagePath;

        certificateModal.classList.add("open");
        certificateModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (certificateClose) {
            certificateClose.focus();
        }
    }

    function closeCertificate() {
        if (!certificateModal) return;

        certificateModal.classList.remove("open");
        certificateModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (certificateImage) {
            certificateImage.onload = null;
            certificateImage.onerror = null;
            certificateImage.removeAttribute("src");
            certificateImage.hidden = false;
        }

        if (certificateError) {
            certificateError.hidden = true;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    certificateButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openCertificate(button);
        });
    });

    if (certificateClose) {
        certificateClose.addEventListener("click", closeCertificate);
    }

    if (certificateModal) {
        certificateModal
            .querySelectorAll("[data-modal-close]")
            .forEach((element) => {
                element.addEventListener("click", closeCertificate);
            });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            certificateModal &&
            certificateModal.classList.contains("open")
        ) {
            closeCertificate();
        }
    });

    // =========================================
    // CONTACT FORM
    // =========================================

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitButton = contactForm
        ? contactForm.querySelector(".submit-btn")
        : null;

    if (contactForm && formStatus && submitButton) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const name = contactForm.elements.namedItem("name").value.trim();
            const email = contactForm.elements.namedItem("email").value.trim();
            const subject = contactForm.elements.namedItem("subject").value.trim();
            const message = contactForm.elements.namedItem("message").value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.textContent = "Please fill in all fields.";
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                formStatus.textContent = "Please enter a valid email address.";
                contactForm.elements.namedItem("email").focus();
                return;
            }

            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            formStatus.textContent = "";

            /*
             * This uses FormSubmit's AJAX endpoint.
             * The first submission may require email activation.
             */
            const formData = {
                name,
                email,
                subject,
                message,
                _subject: `Portfolio Contact: ${subject}`,
                _template: "table",
                _captcha: "true"
            };

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/singhkritika8449@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );

                let result = {};

                try {
                    result = await response.json();
                } catch {
                    result = {};
                }

                if (
                    response.ok &&
                    (
                        result.success === "true" ||
                        result.success === true
                    )
                ) {
                    formStatus.textContent =
                        "Message sent successfully! Thank you for reaching out.";

                    contactForm.reset();
                } else {
                    formStatus.textContent =
                        "Message could not be confirmed. Please email me directly at singhkritika8449@gmail.com.";
                }
            } catch (error) {
                console.error("Contact form error:", error);

                formStatus.textContent =
                    "Unable to send right now. Please email me directly at singhkritika8449@gmail.com.";
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // =========================================
    // OPTIONAL: PROFILE CARD TILT ON DESKTOP
    // =========================================

    const profileCard = document.querySelector(".profile-card");

    const supportsHover =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (profileCard && supportsHover && !reduceMotion) {
        profileCard.addEventListener("mousemove", (event) => {
            const rect = profileCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 7;
            const rotateX = ((y / rect.height) - 0.5) * -7;

            profileCard.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileCard.addEventListener("mouseleave", () => {
            profileCard.style.transform = "";
        });
    }

    // =========================================
    // DISABLE CUSTOM EFFECTS FOR REDUCED MOTION
    // =========================================

    if (reduceMotion) {
        document.documentElement.style.scrollBehavior = "auto";
    }
});