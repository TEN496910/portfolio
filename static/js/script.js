/* =========================================================
                   PORTFOLIO JAVASCRIPT
   ========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const backToTop = document.getElementById("back-to-top");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
                        PAGE LOADER
   ========================================================= */

(() => {

    const loader =
        document.getElementById("page-loader");

    if (!loader) {
        return;
    }


    /*
     * Minimum time the loader remains visible.
     * This prevents it from disappearing instantly
     * on fast page loads.
     */

    const minimumDisplayTime = 2000;

    const startTime = Date.now();


    /*
     * Hide the loader smoothly.
     */

    function hideLoader() {

        if (
            loader.classList.contains("hidden")
        ) {
            return;
        }


        const elapsed =
            Date.now() - startTime;


        const remaining =
            Math.max(
                minimumDisplayTime - elapsed,
                0
            );


        setTimeout(() => {

            loader.classList.add("hidden");


            /*
             * Remove it after the CSS fade-out.
             */

            setTimeout(() => {

                loader.remove();

            }, 500);

        }, remaining);

    }


    /*
     * Wait until the entire page has loaded.
     */

    if (
        document.readyState === "complete"
    ) {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            {
                once: true
            }
        );

    }


    /*
     * Safety fallback.
     *
     * If something prevents the page's load
     * event from firing, don't leave the
     * visitor trapped behind the loader.
     */

    setTimeout(() => {

        hideLoader();

    }, 10000);

})();




/* =========================================================
                      MOBILE NAVIGATION
   ========================================================= */

function closeMobileMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove("menu-open");
}


if (menuToggle && navMenu) {

    /* Open / close menu */

    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Prevent clicks inside menu from closing it */

    navMenu.addEventListener("click", (event) => {

        event.stopPropagation();

    });


    /* Close when navigation link is clicked */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", (event) => {

        if (!navMenu.classList.contains("active")) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMobileMenu();

        }

    });


    /* Close with Escape */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    });

}


  /* Mobile menu assessibility */

if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-controls", "nav-menu");
    menuToggle.setAttribute("aria-expanded", "false");

    const updateMenuState = () => {
        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    };

    menuToggle.addEventListener("click", updateMenuState);

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


  /* Header scroll effect for mobile */

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});




/* =========================================================
                    HEADER ON SCROLL
   ========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});



/* =========================================================
                       ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >=
            sectionTop - 200
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});




/* =========================================================
                       PROJECT FILTER
   ========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");


   /* INITIAL PROJECT CARD STATE */

projectCards.forEach((card) => {
    card.classList.remove("hide");
});

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove active state */
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        /* Add active state */
        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach((card) => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});




/* =========================================================
        CONTACT FORM — DJANGO SUBMISSION
   ========================================================= */

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        const inputs = contactForm.querySelectorAll(
            "input, textarea"
        );

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        let isValid = true;


        /* -------------------------------------------------
           Remove previous validation errors
           ------------------------------------------------- */

        inputs.forEach((input) => {

            input.classList.remove(
                "input-error"
            );

        });


        /* -------------------------------------------------
           Validate required fields
           ------------------------------------------------- */

        inputs.forEach((input) => {

            if (
                input.hasAttribute("required") &&
                !input.value.trim()
            ) {

                input.classList.add(
                    "input-error"
                );

                isValid = false;

            }

        });


        /* -------------------------------------------------
           Validate email
           ------------------------------------------------- */

        const emailInput =
            contactForm.querySelector(
                'input[type="email"]'
            );


        if (
            emailInput &&
            emailInput.value.trim()
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    emailInput.value.trim()
                )
            ) {

                emailInput.classList.add(
                    "input-error"
                );

                isValid = false;

            }

        }


        /* -------------------------------------------------
           Stop invalid submission
           ------------------------------------------------- */

        if (!isValid) {

            event.preventDefault();

            if (formStatus) {

                formStatus.textContent =
                    "Please check the highlighted fields.";

                formStatus.className =
                    "form-status show error";

            }

            return;

        }


        /* -------------------------------------------------
           Allow Django to receive the form
           -------------------------------------------------
           
           IMPORTANT:
           We do NOT use preventDefault() here.
           
           Django receives the POST request,
           processes the email and reloads the page.
           ------------------------------------------------- */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.setAttribute(
                "aria-busy",
                "true"
            );

            submitButton.innerHTML = `
                Sending...
                <i class="fas fa-spinner fa-spin"></i>
            `;

        }


        if (formStatus) {

            formStatus.textContent =
                "Sending your message...";

            formStatus.className =
                "form-status show";

        }

    });

}



/* =========================================================
                   BACK TO TOP BUTTON
   ========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


/* Scroll to top */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* =========================================================
                AUTOMATIC COPYRIGHT YEAR
   ========================================================= */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();




/* =========================================================
                         SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================================================
   TESTIMONIAL CAROUSEL
   3 VISIBLE / 5 RANDOM / CENTER FOCUS
   MOBILE = 1 VISIBLE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(
        ".testimonials-slider-wrapper"
    );

    const grid = wrapper?.querySelector(
        ".testimonials-grid"
    );

    if (!wrapper || !grid) {
        return;
    }


    /* -------------------------------------------------------
       GET ALL TESTIMONIALS
       ------------------------------------------------------- */

    const allTestimonials = Array.from(
        grid.querySelectorAll(".testimonial-card")
    );

    const totalTestimonials =
        allTestimonials.length;

  if (totalTestimonials === 0) {
    return;
  }


    /* -------------------------------------------------------
       LESS THAN 5
       ------------------------------------------------------- */

    if (totalTestimonials < 5) {

        wrapper.classList.remove("is-carousel");

        /*
         * Completely restore normal grid behaviour.
         */

        grid.style.removeProperty("display");
        grid.style.removeProperty("width");
        grid.style.removeProperty("transform");
        grid.style.removeProperty("transition");

        allTestimonials.forEach(card => {

            card.style.removeProperty("width");
            card.style.removeProperty("flex");
            card.style.removeProperty("opacity");
            card.style.removeProperty("transform");

        });

        return;
    }


    /* -------------------------------------------------------
       RANDOMLY SELECT FIVE
       ------------------------------------------------------- */

    const shuffled =
        [...allTestimonials].sort(
            () => Math.random() - 0.5
        );

    const selected =
        shuffled.slice(0, 5);


    /*
     * Clear the grid.
     */

    grid.innerHTML = "";


    /*
     * Add the five selected testimonials.
     */

    selected.forEach(card => {

        grid.appendChild(card);

    });


    /* -------------------------------------------------------
       CREATE CLONES
       ------------------------------------------------------- */

    const originalCards =
        Array.from(
            grid.querySelectorAll(".testimonial-card")
        );

    const count =
        originalCards.length;


    const before =
        document.createDocumentFragment();

    const after =
        document.createDocumentFragment();


    originalCards.forEach(card => {

        before.appendChild(
            card.cloneNode(true)
        );

    });


    originalCards.forEach(card => {

        after.appendChild(
            card.cloneNode(true)
        );

    });


    grid.prepend(before);
    grid.append(after);


    /* -------------------------------------------------------
       GET ALL CARDS
       ------------------------------------------------------- */

    const cards =
        Array.from(
            grid.querySelectorAll(".testimonial-card")
        );


    /*
     * Start inside the original five.
     */

    let currentIndex = count;


    wrapper.classList.add("is-carousel");


    /* -------------------------------------------------------
       RESPONSIVE CARD COUNT
       ------------------------------------------------------- */

    function isMobile() {

        return window.innerWidth <= 700;

    }


    /* -------------------------------------------------------
       CARD WIDTH
       ------------------------------------------------------- */

    function getCardWidth() {

        const wrapperWidth =
            wrapper.clientWidth;

        if (isMobile()) {

            /*
             * ONE COMPLETE CARD ON MOBILE.
             */

            return wrapperWidth;

        }


        /*
         * THREE CARDS ON DESKTOP.
         */

        const gap = 20;

        return (
            wrapperWidth - (gap * 2)
        ) / 3;

    }


    /* -------------------------------------------------------
       POSITION CAROUSEL
       ------------------------------------------------------- */

    function updateCarousel(
        animate = true
    ) {

        const cardWidth =
            getCardWidth();

        const gap = 20;

        /*
         * Store card width for CSS.
         */

        wrapper.style.setProperty(
            "--testimonial-card-width",
            `${cardWidth}px`
        );


        /*
         * Each card's movement distance.
         */

        const step =
            cardWidth + gap;


        /*
         * Mobile:
         * Center one card.
         *
         * Desktop:
         * Center one card between two others.
         */

        const wrapperCenter =
            wrapper.clientWidth / 2;

        const cardCenter =
            cardWidth / 2;


        const translateX =
            wrapperCenter -
            cardCenter -
            (currentIndex * step);


        grid.style.transition =
            animate
                ? "transform 0.8s ease"
                : "none";


        grid.style.transform =
            `translateX(${translateX}px)`;


        /*
         * Remove focus.
         */

        cards.forEach(card => {

            card.classList.remove(
                "testimonial-active"
            );

        });


        /*
         * Focus current card.
         */

        if (cards[currentIndex]) {

            cards[currentIndex]
                .classList.add(
                    "testimonial-active"
                );

        }

    }


    /* -------------------------------------------------------
       INITIAL POSITION
       ------------------------------------------------------- */

    /*
     * Wait for layout to be completely calculated.
     * This is particularly important on mobile.
     */

    requestAnimationFrame(() => {

        updateCarousel(false);

    });


    /* -------------------------------------------------------
       NEXT
       ------------------------------------------------------- */

    function nextTestimonial() {

        currentIndex++;

        updateCarousel(true);

    }


    /* -------------------------------------------------------
       SEAMLESS INFINITE LOOP
       ------------------------------------------------------- */

    grid.addEventListener(
        "transitionend",
        event => {

            if (
                event.propertyName !==
                "transform"
            ) {
                return;
            }


            /*
             * Once we've moved into the
             * second clone group, silently
             * return to the original group.
             */

            if (
                currentIndex >=
                count * 2
            ) {

                currentIndex = count;

                updateCarousel(false);

            }

        }
    );


    /* -------------------------------------------------------
   AUTO SLIDE
   ------------------------------------------------------- */
  
  let timer = null;
  
  /*
  * Start the automatic carousel.
  */
  
  function startAutoSlide() {
    
    clearInterval(timer);
    
    timer = setInterval(
      
      nextTestimonial,
      4500
    );
  }
  
  /*
  * Temporarily pause after user interaction.
  */
  
  function pauseMomentarily() {
    
    clearInterval(timer);
    
    setTimeout(() => {
      
      startAutoSlide();
    
    }, 1500);
  
  }
  
  /*
  * Start automatically.
  */
  
  startAutoSlide();
  
  /* -------------------------------------------------------
    CLICK / TOUCH
    ------------------------------------------------------- */

  /*
  * Clicking a card pauses the carousel
  * briefly, then it continues.
  */
  
  wrapper.addEventListener(
    
    "click",
    () => {
      pauseMomentarily();
    }
  );
  
  /*
  * Touching the carousel pauses it briefly.
  *
  * It does NOT permanently stop it.
  */
  
  wrapper.addEventListener(
    
    "touchstart",
    () => {
      pauseMomentarily();
    },
    {
      passive: true
    }
  );

  
  /* -------------------------------------------------------
   MANUAL TOUCH SWIPE
   ------------------------------------------------------- */
  
  let touchStartX = 0;
  let touchStartY = 0;
  
  wrapper.addEventListener(
    "touchstart",
    event => {
      
      touchStartX =
        event.touches[0].clientX;
      
      touchStartY =
        event.touches[0].clientY;
    
    },
    {
      passive: true
    }
  );
  
  wrapper.addEventListener(
    "touchend",
    event => {
      
      const touchEndX =
        event.changedTouches[0].clientX;
      
      const touchEndY =
        event.changedTouches[0].clientY;
      
      const differenceX =
        touchEndX - touchStartX;
      
      const differenceY =
        touchEndY - touchStartY;
      
      
      /*
      * Only treat it as a swipe if
      * horizontal movement is greater
      * than vertical movement.
      */
      
      if (
        Math.abs(differenceX) <=
        Math.abs(differenceY)
      ) {
        return;
      }
        /*
        * Ignore tiny movements
        */
      if (
        Math.abs(differenceX) < 40
      ) {
        return;
      }
        
      /*
      * Swipe LEFT = next.
      */
      
      if (differenceX < 0) {
        
        nextTestimonial();
      }
        
        /*
        * Swipe RIGHT = previous.
        */
      
      else {
        
        /*
        * We only move forward here.
        *
        * Previous movement will be added
        * after we verify the forward swipe
        * is working correctly.
        */
      }
      
      /*
      * Restart the automatic timer.
      */
      
      pauseMomentarily();
    },
    {
      passive: true
    }
  );


    /* -------------------------------------------------------
       RESPONSIVE UPDATE
       ------------------------------------------------------- */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(() => {

                    updateCarousel(false);

                }, 150);

        }
    );

});

