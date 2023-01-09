const iconMobile = document.querySelector(".header-menu-icon");
const headerMenu = document.querySelector(".header-menu");
let isMenuOpen = false;
let mobileMenuDOM;

const createMobileMenuDOM = () => {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

const closeMenu = () => {
  mobileMenuDOM.classList.remove("open");
};

const openMenu = () => {
  if (mobileMenuDOM) {
  } else {
    createMobileMenuDOM();
  }
  mobileMenuDOM.classList.add("open");
};

const toogleMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

iconMobile.addEventListener("click", (event) => {
  event.stopPropagation();
  toogleMenu();
});

window.addEventListener("click", () => {
  if (isMenuOpen) {
    toogleMenu();
  }
});

window.addEventListener("resize", (event) => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toogleMenu();
  }
});
