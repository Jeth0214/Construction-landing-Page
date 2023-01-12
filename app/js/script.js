const navToggle = document.getElementById("nav__toggle");


navToggle.addEventListener("click", () => {

    toggleMenu();
})


const toggleMenu = () => {
    console.log("navToggle clicked");
    navToggle.classList.toggle("nav__toggle--open");
}