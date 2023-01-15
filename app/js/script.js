const header = document.querySelector("#header");
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
    link.addEventListener("click", () => {
        const index = [...navLink].indexOf(link);

        if (link.parentElement.children[index] == index) {
            navLink[index].classList.add("nav__link--active");
            console.log(navLink[index]);
        }

        if (window.innerWidth > 768) {
            navbar.classList.remove("nav--open-menu");
            overlay.classList.remove("overlay");
        } else {
            toggleMenu();
        };

        // if (link.classList.contains("nav__link--active")) {
        //     link.classList.remove("nav__link--active");
        // } else {
        //     link.classList.add("nav__link--active");
        // }
    });

});

//set scroll padding top dynamically
document.documentElement.style.setProperty("--scroll-padding", (header.offsetHeight - 1) + "px");

// for (var i = 0; i < navLink.length; i++) {
//     navLink[i].addEventListener("click", function () {
//         var current = document.getElementsByClassName(".nav__link");
//         current[0].className = current[0].className.replace("nav__link--active", "");
//         this.className += " nav__link--active";
//     });
// }
