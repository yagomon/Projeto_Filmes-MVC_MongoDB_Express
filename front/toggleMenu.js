const toggleMenu = () => {
  let menu = document.querySelector(".menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      menu.classList.add("toggleMenu");
    } else {
      menu.classList.remove("toggleMenu");
    }
  });
};
toggleMenu();
