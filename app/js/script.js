const header = document.querySelector("#header");
const navToggle = document.getElementById("nav__toggle");
const navbar = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const overlay = document.querySelector("#overlay");
const sections = document.querySelectorAll("section");
const fabButton = document.querySelector(".fab-button");

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/** auto hide toggle menu and overlay when the user resize the window */
window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
        navbar.classList.remove("nav--open-menu");
        overlay.classList.remove("overlay");
    }
})

//set scroll padding top dynamically when smooth scrolling
document.documentElement.style.setProperty("--scroll-padding", (header.offsetHeight - 1) + "px");

// add an event listener for scroll
window.onscroll = function () {
    if (window.pageYOffset > 80 || navbar.classList.contains("nav--open-menu")) {
        header.classList.add("bg-dark", "box-shadow");
        navbar.classList.add("nav__brand--shrink");
    } else {
        header.classList.remove("bg-dark", "box-shadow");
        navbar.classList.remove("nav__brand--shrink");
    }
    navHighlighter();
    showFabButton();
}
// hide and show toggle menu using the hamburger menu
navToggle.addEventListener("click", () => {
    toggleMenu();
})

/**  
 * hide and show toggle menu using the links
 * set the active styling upon clicking the link
*/
navLink.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove("nav--open-menu");
            overlay.classList.remove("overlay");
        } else {
            toggleMenu();
        };


        link.classList.add("nav__link--active");
        siblingLinks = [...navLink].filter(child => child != link)
        siblingLinks.forEach(element => { element.classList.remove("nav__link--active") });

    });

});

// hide and show toggle menu function 
function toggleMenu() {
    fabButton.style.display = "none";
    overlay.classList.toggle("overlay");
    navbar.classList.toggle("nav--open-menu");
    header.classList.add("bg-dark", "box-shadow");

}

/*
    this function will set the nav link to active when scrolling 
    to its section
*/

function navHighlighter() {
    // get the current scroll position
    let scrollY = window.pageYOffset;
    let sectionId = "";

    // Now, loop through sections to get  top and ID values for each section
    sections.forEach(section => {
        let sectionTop = section.offsetTop - 60;
        if (scrollY >= sectionTop) {
            sectionId = section.getAttribute("id");
        }
    })

    /**
     * check if nav link contains the section id
     * and set the active class to it
    */
    navLink.forEach(link => {
        let linkHref = link.href;
        if (linkHref.includes(sectionId)) {
            link.classList.add("nav__link--active");
        }
        else {
            link.classList.remove("nav__link--active");
        }
    })
}


// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    overlay.classList.remove("overlay");
    navbar.classList.remove("nav--open-menu");
    history.replaceState(null, "", location.origin);
}

// When the user scrolls down 60px  from the top , shrink the navbar and show the scroll top button
function showFabButton() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        fabButton.style.display = "block";
    } else {
        fabButton.style.display = "none";
    }

}

