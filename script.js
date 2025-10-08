// === MOBILE NAVIGATION ===
const hamburger = document.getElementById("hamburger");
let mobileMenu = null;
let overlay = null;

function createMobileMenu() {
  if (!mobileMenu) {
    mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";
    mobileMenu.innerHTML = `
      <a href="#designs">Designs</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    `;
    document.body.appendChild(mobileMenu);
  }
}

function toggleOverlay(show) {
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle("active", show);
  document.body.classList.toggle("menu-open", show);
}

hamburger.addEventListener("click", () => {
  createMobileMenu();
  const isActive = hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active", isActive);
  toggleOverlay(isActive);
});

document.addEventListener("click", (e) => {
  if (
    mobileMenu &&
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    toggleOverlay(false);
  }
});

// === LOAD MORE BUTTONS ===
const loadDesigns = document.getElementById("loadDesigns");
const loadProjects = document.getElementById("loadProjects");

function toggleGrid(button, sectionName) {
  const grid = button.previousElementSibling;
  grid.classList.toggle("expanded");
  if (grid.classList.contains("expanded")) {
    button.textContent = "Show Less";
  } else {
    button.textContent = `Load More ${sectionName}`;
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (loadDesigns) {
  loadDesigns.addEventListener("click", () =>
    toggleGrid(loadDesigns, "Designs")
  );
}
if (loadProjects) {
  loadProjects.addEventListener("click", () =>
    toggleGrid(loadProjects, "Projects")
  );
}

// === LIGHTBOX IMAGE VIEWER ===
const images = document.querySelectorAll(".image-card img");
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <img src="" alt="Expanded image">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".lightbox-close");

// Open image in lightbox
images.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
  });
});

// Close lightbox on click or ESC
closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("active");
});
