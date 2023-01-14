const navToggle = document.getElementById("nav__toggle");
const navbar = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const overlay = document.querySelector("#overlay");

/** auto hide toggle menu and overlay when the user resize the window */
window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
        navbar.classList.remove("nav--open-menu");
        overlay.classList.remove("overlay");
    }
})
// hide and show toggle menu
const toggleMenu = () => {
    overlay.classList.toggle("overlay");
    navbar.classList.toggle("nav--open-menu");
}

// hide and show toggle menu using the hamburger menu
navToggle.addEventListener("click", () => {
    toggleMenu();
})

// hide and show toggle menu using the links
navLink.forEach(link => {
    link.addEventListener("click", toggleMenu);
});
