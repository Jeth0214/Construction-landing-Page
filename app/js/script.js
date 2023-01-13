const navToggle = document.getElementById("nav__toggle");
const navbar = document.querySelector(".nav");
const overlay = document.querySelector("#overlay");


navToggle.addEventListener("click", () => {

    toggleMenu();
})


const toggleMenu = () => {
    console.log("navToggle clicked");
    navbar.classList.toggle("nav--open-menu");
    overlay.classList.toggle("overlay");
}