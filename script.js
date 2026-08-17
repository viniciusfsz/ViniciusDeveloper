/* ========================================
   ELEMENTOS
======================================== */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const currentYear = document.getElementById("current-year");

const heroPhoto = document.querySelector(".hero-photo");
const heroContent = document.querySelector(".hero-content");
const heroVisual = document.querySelector(".hero-visual");

const skillCards = document.querySelectorAll(".skill-card");
const projectCards = document.querySelectorAll(".project-card");

let lastScrollY = window.scrollY;


/* ========================================
   MENU MOBILE
======================================== */

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* ========================================
   FECHAR MENU AO CLICAR NO LINK
======================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!nav || !menuToggle) return;

        nav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ========================================
   FECHAR MENU AO REDIMENSIONAR
======================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {

        nav?.classList.remove("active");
        menuToggle?.classList.remove("active");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* ========================================
   HEADER AO ROLAR
======================================== */

function updateHeader() {

    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /* ESCONDER AO DESCER / MOSTRAR AO SUBIR */

    if (currentScrollY > 180) {

        if (currentScrollY > lastScrollY) {

            header.classList.add("header-hidden");

        } else {

            header.classList.remove("header-hidden");

        }

    } else {

        header.classList.remove("header-hidden");

    }

    lastScrollY = currentScrollY;

}

updateHeader();

window.addEventListener("scroll", updateHeader);


/* ========================================
   LINK ATIVO NO MENU
======================================== */

function updateActiveLink() {

    const scrollPosition = window.scrollY + 180;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

updateActiveLink();

window.addEventListener("scroll", updateActiveLink);


/* ========================================
   SCROLL SUAVE
======================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* ========================================
   REVEAL AO ENTRAR NA TELA
======================================== */

const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".about-title, " +
    ".about-content, " +
    ".skill-card, " +
    ".project-card, " +
    ".journey-item, " +
    ".contact-container"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


/* ========================================
   HERO - ENTRADA SUAVE
======================================== */

window.addEventListener("load", () => {

    heroContent?.classList.add("hero-loaded");
    heroVisual?.classList.add("hero-loaded");

});


/* ========================================
   PARALLAX SUAVE NA FOTO
======================================== */

window.addEventListener("scroll", () => {

    if (!heroPhoto) return;

    if (window.innerWidth <= 1000) {

        heroPhoto.style.transform = "translateY(0)";
        return;

    }

    const scroll = window.scrollY;

    const movement = Math.min(scroll * 0.08, 40);

    heroPhoto.style.transform =
        `translateY(${movement}px)`;

});


/* ========================================
   EFEITO 3D NOS CARDS
======================================== */

function addCardTilt(card) {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth <= 900) return;

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

    });

}


skillCards.forEach(addCardTilt);
projectCards.forEach(addCardTilt);


/* ========================================
   CURSOR LIGHT NOS CARDS
======================================== */

document.querySelectorAll(
    ".skill-card, .project-image"
).forEach((element) => {

    element.addEventListener("mousemove", (event) => {

        const rect = element.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        element.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        element.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* ========================================
   ANIMAÇÃO DOS NÚMEROS DAS SEÇÕES
======================================== */

const sectionNumbers =
    document.querySelectorAll(".section-number");


if ("IntersectionObserver" in window) {

    const numberObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "number-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.7
            }

        );


    sectionNumbers.forEach((number) => {

        numberObserver.observe(number);

    });

}


/* ========================================
   MOUSE MOVE SUAVE NO HERO
======================================== */

const hero =
    document.querySelector(".hero");


if (hero) {

    hero.addEventListener("mousemove", (event) => {

        if (window.innerWidth <= 1000) return;

        const rect =
            hero.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const moveX =
            (x / rect.width - 0.5) * 10;

        const moveY =
            (y / rect.height - 0.5) * 10;

        if (heroVisual) {

            heroVisual.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        }

    });


    hero.addEventListener("mouseleave", () => {

        if (heroVisual) {

            heroVisual.style.transform =
                "translate(0, 0)";

        }

    });

}


/* ========================================
   ANO AUTOMÁTICO
======================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}