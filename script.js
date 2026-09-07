/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");
    const number = document.querySelector(".loader-number");

    let count = 0;

    const counter = setInterval(() => {

        count += Math.floor(Math.random() * 15) + 5;

        if (count >= 100) {

            count = 100;

            clearInterval(counter);

        }

        if (number) {

            number.textContent =
                String(count).padStart(3, "0");

        }

    }, 80);


    setTimeout(() => {

        loader?.classList.add("hidden");

    }, 1900);

});


/* =====================================================
   CURSOR
===================================================== */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

const cursorText =
    document.querySelector(".cursor-text");

const mouseGlow =
    document.querySelector(".mouse-glow");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;


    if (cursorDot) {

        cursorDot.style.left =
            mouseX + "px";

        cursorDot.style.top =
            mouseY + "px";

    }


    if (mouseGlow) {

        mouseGlow.style.left =
            mouseX + "px";

        mouseGlow.style.top =
            mouseY + "px";

    }

});


function animateCursor() {

    ringX +=
        (mouseX - ringX) * .13;

    ringY +=
        (mouseY - ringY) * .13;


    if (cursorRing) {

        cursorRing.style.left =
            ringX + "px";

        cursorRing.style.top =
            ringY + "px";

    }


    if (cursorText) {

        cursorText.style.left =
            ringX + "px";

        cursorText.style.top =
            ringY + "px";

    }


    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


/* =====================================================
   CURSOR HOVER
===================================================== */

document
    .querySelectorAll(
        "a, button, .magnetic, .tilt, .floating-card"
    )
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing?.classList.add(
                    "active"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing?.classList.remove(
                    "active"
                );

            }
        );

    });


/* =====================================================
   MAGNETIC ELEMENTS
===================================================== */

document
    .querySelectorAll(".magnetic")
    .forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 800)
                    return;


                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `
                    translate(
                        ${x * .12}px,
                        ${y * .12}px
                    )
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0,0)";

            }
        );

    });


/* =====================================================
   3D TILT
===================================================== */

document
    .querySelectorAll(".tilt")
    .forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 800)
                    return;


                const rect =
                    element.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    .5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    .5;


                element.style.transform =
                    `
                    translateX(-50%)
                    perspective(1200px)
                    rotateX(${y * -7}deg)
                    rotateY(${x * 7}deg)
                    scale(1.015)
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    `
                    translateX(-50%)
                    rotate(-5deg)
                    `;

            }
        );

    });


/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(".hero-visual");

const heroWatermark =
    document.querySelector(".hero-watermark");


window.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth < 900)
            return;


        const x =
            event.clientX /
            window.innerWidth -
            .5;


        const y =
            event.clientY /
            window.innerHeight -
            .5;


        if (heroVisual) {

            heroVisual.style.transform =
                `
                translate(
                    ${x * 10}px,
                    ${y * 8}px
                )
                `;

        }


        if (heroWatermark) {

            heroWatermark.style.transform =
                `
                translate(
                    ${x * 35}px,
                    ${y * 20}px
                )
                `;

        }

    }
);


/* =====================================================
   SCROLL PROGRESS
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const progress =
            document.querySelector(
                ".scroll-progress"
            );


        const maxScroll =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (!progress || maxScroll <= 0)
            return;


        progress.style.width =
            (
                window.scrollY /
                maxScroll *
                100
            ) + "%";

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-title, .section-number, .about-content, .skill-list, .project-card, .process-item, .education-card, .cert-list, .contact-grid"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    entry.target.style.transition =
                        "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(45px)";

    observer.observe(element);

});


/* =====================================================
   SORTING VISUALIZER
===================================================== */

const sortBars =
    document.querySelector(".sort-bars");


if (sortBars) {

    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const bar =
            document.createElement("i");


        bar.style.height =
            (
                25 +
                Math.random() * 70
            ) + "%";


        bar.style.animationDelay =
            (
                i * .08
            ) + "s";


        sortBars.appendChild(bar);

    }


    setInterval(() => {

        document
            .querySelectorAll(
                ".sort-bars i"
            )
            .forEach(bar => {

                bar.style.height =
                    (
                        25 +
                        Math.random() * 70
                    ) + "%";

            });

    }, 1600);

}


/* =====================================================
   FLOATING SKILL PARALLAX
===================================================== */

const pills =
    document.querySelectorAll(
        ".skill-pill"
    );


window.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth < 900)
            return;


        const x =
            event.clientX /
            window.innerWidth -
            .5;


        const y =
            event.clientY /
            window.innerHeight -
            .5;


        pills.forEach(
            (pill, index) => {

                const strength =
                    8 + index * 1.5;


                pill.style.marginLeft =
                    x * strength + "px";

                pill.style.marginTop =
                    y * strength + "px";

            }
        );

    }
);


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas?.getContext("2d");


let particles = [];


function resizeCanvas() {

    if (!canvas)
        return;


    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}


function createParticles() {

    particles = [];


    const amount =
        window.innerWidth < 700
            ? 35
            : 75;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.6 +
                .4,

            speed:
                Math.random() * .25 +
                .05,

            opacity:
                Math.random() * .45 +
                .1

        });

    }

}


function animateParticles() {

    if (!ctx)
        return;


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach(
        particle => {

            particle.y -=
                particle.speed;


            if (particle.y < -10) {

                particle.y =
                    window.innerHeight +
                    10;

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    205,
                    157,
                    255,
                    ${particle.opacity}
                )`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


resizeCanvas();
createParticles();
animateParticles();


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();
        createParticles();

    }
);


/* =====================================================
   SMOOTH ANCHOR LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        anchor.getAttribute(
                            "href"
                        )
                    );


                if (!target)
                    return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* =====================================================
   CONTACT FORM
   FORMSUBMIT AJAX
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    ".send-button"
                );


            const submitText =
                document.getElementById(
                    "submitText"
                );


            const status =
                document.getElementById(
                    "formStatus"
                );


            button.disabled = true;

            submitText.textContent =
                "SENDING...";


            try {

                const formData =
                    Object.fromEntries(
                        new FormData(
                            contactForm
                        )
                    );


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
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (
                    !response.ok ||
                    !result.success
                ) {

                    throw new Error(
                        "Failed"
                    );

                }


                contactForm.reset();


                submitText.textContent =
                    "MESSAGE SENT ✓";


                status.textContent =
                    "Thanks — your message has been sent successfully.";


                setTimeout(
                    () => {

                        submitText.textContent =
                            "SEND MESSAGE";

                        status.textContent =
                            "";

                    },
                    3500
                );


            } catch (error) {

                submitText.textContent =
                    "TRY AGAIN";

                status.textContent =
                    "Couldn't send — please try again.";

            }


            button.disabled = false;

        }
    );

}


/* =====================================================
   HORIZONTAL MOUSE LIGHT
===================================================== */

document.addEventListener(
    "mousemove",
    event => {

        document.documentElement
            .style.setProperty(
                "--mouse-x",
                event.clientX + "px"
            );

        document.documentElement
            .style.setProperty(
                "--mouse-y",
                event.clientY + "px"
            );

    }
);