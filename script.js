/* =====================================================
                    HELPERS
===================================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);



/* =====================================================
                    MOBILE MENU
===================================================== */

const menuToggle =
    $("#menu-toggle");

const navLinks =
    $("#nav-links");


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.toggle(
                "fa-bars"
            );

            icon.classList.toggle(
                "fa-xmark"
            );

        }
    );

}


$$(".nav-links a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );

                const icon =
                    menuToggle.querySelector("i");

                icon.classList.add(
                    "fa-bars"
                );

                icon.classList.remove(
                    "fa-xmark"
                );

            }
        );

    }
);



/* =====================================================
                    HERO TYPING
===================================================== */

const typingText =
    $("#typing-text");


const roles = [

    "Java applications",
    "backend systems",
    "REST APIs",
    "secure software"

];


let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeHero() {

    const current =
        roles[roleIndex];


    typingText.textContent =
        current.substring(
            0,
            charIndex
        );


    if (!deleting) {

        charIndex++;


        if (
            charIndex >
            current.length
        ) {

            deleting = true;

            setTimeout(
                typeHero,
                1200
            );

            return;

        }

    } else {

        charIndex--;


        if (charIndex < 0) {

            charIndex = 0;

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;

        }

    }


    setTimeout(
        typeHero,
        deleting ? 45 : 80
    );

}


typeHero();



/* =====================================================
                    TERMINAL
===================================================== */

const commandElement =
    $("#typing-command");


const commands = [

    "ship --production",
    "git push origin main",
    "build --clean",
    "solve --problem"

];


let commandIndex = 0;

let commandChar = 0;

let commandDeleting = false;


function typeCommand() {

    const command =
        commands[commandIndex];


    commandElement.textContent =
        command.substring(
            0,
            commandChar
        );


    if (!commandDeleting) {

        commandChar++;


        if (
            commandChar >
            command.length
        ) {

            commandDeleting = true;

            setTimeout(
                typeCommand,
                900
            );

            return;

        }

    } else {

        commandChar--;


        if (commandChar < 0) {

            commandChar = 0;

            commandDeleting = false;

            commandIndex =
                (commandIndex + 1)
                % commands.length;

        }

    }


    setTimeout(
        typeCommand,
        commandDeleting ? 35 : 70
    );

}


typeCommand();



/* =====================================================
                    SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        const bars =
                            entry.target.querySelectorAll(
                                ".bar span"
                            );


                        bars.forEach(
                            bar => {

                                bar.style.width =
                                    bar.dataset.width;

                            }
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold:
                0.12
        }

    );


$$(".reveal").forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
                    ACTIVE NAV
===================================================== */

const sections =
    $$("section");

const navItems =
    $$(".nav-links a");


window.addEventListener(
    "scroll",
    () => {

        let current =
            "home";


        sections.forEach(
            section => {

                if (
                    window.scrollY >=
                    section.offsetTop - 180
                ) {

                    current =
                        section.id;

                }

            }
        );


        navItems.forEach(
            link => {

                link.classList.toggle(

                    "active",

                    link.getAttribute(
                        "href"
                    ) === `#${current}`

                );

            }
        );

    }
);



/* =====================================================
                    SCROLL TOP
===================================================== */

const scrollTop =
    $("#scroll-top");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 600
        ) {

            scrollTop.classList.add(
                "show"
            );

        } else {

            scrollTop.classList.remove(
                "show"
            );

        }

    }
);


scrollTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top:
                0,

            behavior:
                "smooth"

        });

    }
);



/* =====================================================
                    CURSOR GLOW
===================================================== */

const cursorGlow =
    $("#cursor-glow");


window.addEventListener(
    "pointermove",
    event => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);



/* =====================================================
                    3D HERO TILT
===================================================== */

const tiltCard =
    $("#tilt-card");


window.addEventListener(
    "pointermove",
    event => {

        if (
            window.innerWidth < 900
        ) {

            return;

        }


        const rect =
            tiltCard.getBoundingClientRect();


        if (

            event.clientX < rect.left ||

            event.clientX > rect.right ||

            event.clientY < rect.top ||

            event.clientY > rect.bottom

        ) {

            return;

        }


        const x =
            (
                event.clientX -
                rect.left
            ) / rect.width;


        const y =
            (
                event.clientY -
                rect.top
            ) / rect.height;


        const rotateY =
            (x - 0.5) * 10;


        const rotateX =
            (0.5 - y) * 8;


        tiltCard.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateZ(8px)`;

    }
);


tiltCard.addEventListener(
    "mouseleave",
    () => {

        tiltCard.style.transform =
            "";

    }
);



/* =====================================================
                    DARK / LIGHT MODE
===================================================== */

const themeToggle =
    $("#theme-toggle");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light"
    );

}


function updateThemeIcon() {

    const icon =
        themeToggle.querySelector(
            "i"
        );


    if (
        document.body.classList.contains(
            "light"
        )
    ) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


updateThemeIcon();


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const theme =

            document.body.classList.contains(
                "light"
            )

                ? "light"

                : "dark";


        localStorage.setItem(
            "portfolio-theme",
            theme
        );


        updateThemeIcon();

    }
);



/* =====================================================
                    PROJECT MODAL
===================================================== */

const projectModal =
    $("#project-modal");

const closeProject =
    $("#close-project");

const projectOverlay =
    $("#project-overlay");

const modalTitle =
    $("#modal-project-title");

const modalDescription =
    $("#modal-project-description");

const modalLabel =
    $("#modal-project-label");

const modalFeatures =
    $("#modal-project-features");

const modalTech =
    $("#modal-project-tech");

const modalIcon =
    $("#modal-project-icon");

const modalGithub =
    $("#modal-github");



const projects = {


    /* ================= URL SHORTENER ================= */

    url: {

        title:
            "URL Shortener",

        label:
            "BACKEND APPLICATION",

        description:

            "A secure database-driven URL Shortener built with Spring Boot, MVC architecture, authentication, authorization, analytics and URL management.",

        icon:
            "fa-solid fa-link",

        github:

            "https://github.com/KritikaaSinghh/kritika-url-shortener",


        features: [

            "Authentication & Authorization",

            "Role-Based Access",

            "Private URLs & Expiration",

            "Analytics Dashboard",

            "Flyway Database Migrations",

            "Docker PostgreSQL"

        ],


        tech: [

            "Java",

            "Spring Boot",

            "Spring Security",

            "JPA",

            "PostgreSQL",

            "Docker"

        ]

    },


    /* ================= SORTING ================= */

    sorting: {

        title:
            "Sorting Visualizer",

        label:
            "INTERACTIVE WEB APP",

        description:

            "An interactive visualizer that demonstrates popular sorting algorithms through animations, controls and complexity information.",

        icon:
            "fa-solid fa-chart-simple",

        github:

            "https://github.com/KritikaaSinghh/Sorting-Visualizer",


        features: [

            "Bubble Sort",

            "Selection Sort",

            "Insertion Sort",

            "Merge Sort",

            "Quick Sort",

            "Complexity Display"

        ],


        tech: [

            "HTML",

            "CSS",

            "JavaScript"

        ]

    }

};



/* ================= OPEN PROJECT ================= */

$$(".project-preview").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {


                const key =
                    button.dataset.project;


                const project =
                    projects[key];


                if (!project) {

                    return;

                }


                modalTitle.textContent =
                    project.title;


                modalLabel.textContent =
                    project.label;


                modalDescription.textContent =
                    project.description;


                modalIcon.innerHTML =

                    `<i class="${project.icon}"></i>`;


                modalFeatures.innerHTML =

                    project.features
                        .map(

                            feature =>

                                `<span>
                                    <i class="fa-solid fa-check"></i>
                                    ${feature}
                                </span>`

                        )
                        .join("");


                modalTech.innerHTML =

                    project.tech
                        .map(

                            tech =>
                                `<span>${tech}</span>`

                        )
                        .join("");


                modalGithub.href =
                    project.github;


                projectModal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);



function closeProjectModal() {

    projectModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeProject.addEventListener(
    "click",
    closeProjectModal
);


projectOverlay.addEventListener(
    "click",
    closeProjectModal
);



/* =====================================================
                    CONTACT MODAL
===================================================== */

const contactModal =
    $("#contact-modal");

const openContact =
    $("#open-contact");

const closeContact =
    $("#close-contact");

const contactOverlay =
    $("#contact-overlay");


function closeContactModal() {

    contactModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


openContact.addEventListener(
    "click",
    () => {

        contactModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }
);


closeContact.addEventListener(
    "click",
    closeContactModal
);


contactOverlay.addEventListener(
    "click",
    closeContactModal
);



/* =====================================================
                    ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeProjectModal();

        closeContactModal();

    }
);



/* =====================================================
                    FORMSPREE
===================================================== */

const contactForm =
    $("#contact-form");


contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const button =
            contactForm.querySelector(
                ".modal-send-btn"
            );


        const originalText =
            button.innerHTML;


        button.disabled =
            true;


        button.innerHTML =

            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';


        try {


            const response =
                await fetch(

                    contactForm.action,

                    {

                        method:
                            "POST",

                        body:
                            new FormData(
                                contactForm
                            ),

                        headers: {

                            "Accept":
                                "application/json"

                        }

                    }

                );


            if (!response.ok) {

                throw new Error(
                    "Form submission failed"
                );

            }


            contactForm.reset();


            button.innerHTML =

                'Message Sent <i class="fa-solid fa-check"></i>';


            button.style.background =
                "#16a34a";


            setTimeout(
                () => {


                    closeContactModal();


                    button.innerHTML =
                        originalText;


                    button.style.background =
                        "";


                    button.disabled =
                        false;


                },

                1600
            );


        } catch (error) {


            console.error(
                error
            );


            button.innerHTML =

                'Something went wrong <i class="fa-solid fa-xmark"></i>';


            button.style.background =
                "#dc2626";


            setTimeout(
                () => {


                    button.innerHTML =
                        originalText;


                    button.style.background =
                        "";


                    button.disabled =
                        false;


                },

                2300
            );

        }

    }
);



/* =====================================================
                    CURRENT YEAR
===================================================== */

const year =
    $("#year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}