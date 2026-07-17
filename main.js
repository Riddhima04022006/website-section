function myopen(button) {
    button.style.display = "none";
    button.nextElementSibling.style.display = "";
    button.nextElementSibling.classList.add("arrow_shadow");
    setTimeout(()=>{
        button.nextElementSibling.classList.remove("arrow_shadow");
    },200);
}
function myclose(button) {
    button.style.display = "none";
    button.previousElementSibling.style.display = "";
    button.previousElementSibling.classList.add("arrow_shadow");
    setTimeout(()=>{
        button.previousElementSibling.classList.remove("arrow_shadow");
    },200);
}
// Mobile/tablet menu button — opens/closes the nav items + log-in/start panel
const navbar = document.querySelector("#navbar");
const menuToggle = document.querySelector("#menu_toggle");
if (navbar && menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("nav_open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
    // tapping outside the open panel closes it
    document.addEventListener("click", (e) => {
        if (navbar.classList.contains("nav_open") && !navbar.contains(e.target)) {
            navbar.classList.remove("nav_open");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
    // tapping a nav item closes the panel too
    document.querySelectorAll("#items .decor, #starts .decor").forEach((item) => {
        item.addEventListener("click", () => {
            navbar.classList.remove("nav_open");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

let log = document.querySelector("#log");
log.addEventListener("click",()=>{
    log.classList.add("arrow_shadow");
    setTimeout(()=>{
        log.classList.remove("arrow_shadow");
    },200);
});