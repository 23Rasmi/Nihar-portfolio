"use strict";


// =========================================
// GET ELEMENTS
// =========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const navContainer = document.querySelector(".nav-container");
const sections = document.querySelectorAll("section[id]");


// =========================================
// MOBILE MENU ICON
// =========================================

function updateMenuIcon() {

    if (!menuBtn) return;

    const icon = menuBtn.querySelector("i");

    if (!icon) return;


    if (
        navLinks &&
        navLinks.classList.contains("active")
    ) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

        menuBtn.setAttribute(
            "aria-label",
            "Close Menu"
        );

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        menuBtn.setAttribute(
            "aria-label",
            "Open Menu"
        );

    }

}


// =========================================
// MOBILE MENU TOGGLE
// =========================================

if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            navLinks.classList.toggle("active");

            updateMenuIcon();

        }
    );

}


// =========================================
// CLOSE MOBILE MENU
// =========================================

function closeMobileMenu() {

    if (!navLinks) return;

    navLinks.classList.remove("active");

    updateMenuIcon();

}


// =========================================
// CLOSE AFTER NAV LINK CLICK
// =========================================

navItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    }
);


// =========================================
// CLOSE WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener(
    "click",
    function (event) {

        if (!navLinks || !menuBtn) return;

        const clickedOutsideMenu =
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target);


        if (clickedOutsideMenu) {

            closeMobileMenu();

        }

    }
);


// =========================================
// CLOSE ON ESC KEY
// =========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


// =========================================
// CLOSE MENU ON DESKTOP
// =========================================

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 700) {

            closeMobileMenu();

        }

    }
);


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(
    ".glass-card, " +
    ".achievement-box, " +
    ".contact-box, " +
    ".section-heading, " +
    ".visitor-message-card"
);


revealElements.forEach(
    function (element) {

        element.classList.add("reveal");

    }
);


const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


// =========================================
// NAVBAR EFFECT
// =========================================

function updateNavbar() {

    if (!navContainer) return;


    if (window.scrollY > 50) {

        navContainer.classList.add(
            "nav-scrolled"
        );

    } else {

        navContainer.classList.remove(
            "nav-scrolled"
        );

    }

}


// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

function updateActiveNav() {

    let currentSection = "";


    sections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop - 180;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navItems.forEach(
        function (link) {

            link.classList.remove(
                "nav-active"
            );


            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "nav-active"
                );

            }

        }
    );

}


// =========================================
// PROFESSIONAL TYPING ANIMATION
// =========================================

const typingText =
    document.getElementById(
        "typingText"
    );


if (typingText) {

    const typingWords = [

        "M.Pharm Student",
        "Quality Professional Aspirant",
        "Pharmaceutical Research Enthusiast"

    ];


    let wordIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;


    function typeAnimation() {

        const currentWord =
            typingWords[wordIndex];


        if (!isDeleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;

        } else {

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;

        }


        let typingSpeed =
            isDeleting
                ? 35
                : 75;


        if (
            !isDeleting &&
            characterIndex === currentWord.length
        ) {

            typingSpeed = 1800;

            isDeleting = true;

        }


        else if (
            isDeleting &&
            characterIndex === 0
        ) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) %
                typingWords.length;

            typingSpeed = 350;

        }


        setTimeout(
            typeAnimation,
            typingSpeed
        );

    }


    typeAnimation();

}


// =========================================
// MOBILE SCROLL PROGRESS BAR
// =========================================

const scrollProgressBar =
    document.getElementById(
        "scrollProgressBar"
    );


function updateScrollProgress() {

    if (!scrollProgressBar) return;


    if (window.innerWidth > 700) {

        scrollProgressBar.style.width =
            "0%";

        return;

    }


    const scrollTop =
        window.scrollY;


    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (scrollHeight <= 0) return;


    const scrollPercentage =
        (scrollTop / scrollHeight) * 100;


    scrollProgressBar.style.width =
        scrollPercentage + "%";

}


// =========================================
// SCROLL HANDLER
// =========================================

function handleScroll() {

    updateNavbar();

    updateActiveNav();

    updateScrollProgress();

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


// =========================================
// VISITOR MESSAGE TO WHATSAPP
// =========================================

const visitorMessageForm =
    document.getElementById(
        "visitorMessageForm"
    );


const visitorName =
    document.getElementById(
        "visitorName"
    );


const visitorMessage =
    document.getElementById(
        "visitorMessage"
    );


const visitorSendBtn =
    document.getElementById(
        "visitorSendBtn"
    );


// =========================================
// WHATSAPP FORM SUBMIT
// =========================================

if (
    visitorMessageForm &&
    visitorName &&
    visitorMessage &&
    visitorSendBtn
) {

    visitorMessageForm.addEventListener(
        "submit",
        function (event) {

            // Prevent page refresh / top scroll
            event.preventDefault();


            const name =
                visitorName.value.trim();


            const message =
                visitorMessage.value.trim();


            // =========================================
            // VALIDATION
            // =========================================

            if (!name) {

                visitorName.focus();

                return;

            }


            if (!message) {

                visitorMessage.focus();

                return;

            }


            // =========================================
            // SAVE ORIGINAL BUTTON
            // =========================================

            const originalButtonContent =
                visitorSendBtn.innerHTML;


            // =========================================
            // SENDING ANIMATION
            // =========================================

            visitorSendBtn.classList.add(
                "sending"
            );


            visitorSendBtn.disabled =
                true;


            visitorSendBtn.innerHTML =
                `<span>Sending Message</span>
                 <i class="fa-solid fa-paper-plane"></i>`;


            // =========================================
            // WHATSAPP NUMBER
            // =========================================

            const whatsappNumber =
                "919348186350";


            // =========================================
            // CREATE MESSAGE
            // =========================================

            const whatsappMessage =
                `Hello Nihar 👋

You have received a new message from your Portfolio Website.

━━━━━━━━━━━━━━━━━━

👤 VISITOR NAME

${name}

💬 MESSAGE

${message}

━━━━━━━━━━━━━━━━━━

🌐 Sent from:
Nihar Ranjan Rout Portfolio Website`;


            // =========================================
            // CREATE WHATSAPP URL
            // =========================================

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            // =========================================
            // SENDING → SUCCESS → WHATSAPP
            // =========================================

            setTimeout(
                function () {

                    visitorSendBtn.classList.remove(
                        "sending"
                    );


                    visitorSendBtn.classList.add(
                        "success"
                    );


                    visitorSendBtn.innerHTML =
                        `<span>Message Sent ✓</span>
                         <i class="fa-solid fa-check"></i>`;


                    // Open WhatsApp
                    window.open(
                        whatsappURL,
                        "_blank"
                    );


                    // =========================================
                    // RESET BUTTON AND FORM
                    // =========================================

                    setTimeout(
                        function () {

                            visitorMessageForm.reset();


                            visitorSendBtn.classList.remove(
                                "success"
                            );


                            visitorSendBtn.disabled =
                                false;


                            visitorSendBtn.innerHTML =
                                originalButtonContent;


                        },
                        1500
                    );


                },
                600
            );

        }
    );

}


// =========================================
// INITIALIZE
// =========================================

handleScroll();

updateMenuIcon();

updateScrollProgress();
