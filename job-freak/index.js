const sidebarLinks = document.querySelectorAll("a.sidebar__link");

// initial active link
sidebarLinks[0].dataset.active = "true";

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebarLinks.forEach((link) => {
      link.dataset.active = "false";
    });
    link.dataset.active = "true";
  });
});

const collapseBtn = document.querySelector("button.sidebar__item");
const sidebar = document.querySelector(".sidebar");

collapseBtn.addEventListener("click", () => {
  sidebar.dataset.collapsed =
    sidebar.dataset.collapsed === "true" ? "false" : "true";
});

const sidebar_button = document.querySelector("button.menu");

sidebar_button.addEventListener("click", () => {
  sidebar.dataset.hidden = sidebar.dataset.hidden === "true" ? "false" : "true";
});
