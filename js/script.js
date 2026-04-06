// gestion de l'affichage sur mobile
const toggleButton = document.querySelector(".menu-toggle");
menu = document.querySelector("header nav.menu"); // déjà défini dans menu.js

if (toggleButton && menu) {
  toggleButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    toggleButton.setAttribute("aria-expanded", isOpen);
  });
}

const links = document.querySelectorAll(".menu-link");

links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggleButton.setAttribute("aria-expanded", "false");
  });
});