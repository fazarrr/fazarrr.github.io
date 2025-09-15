document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll untuk tautan navigasi
  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });

  // Menandai tautan navigasi yang aktif saat scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Fitur Dark Mode
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    body.classList.add(currentTheme);
    updateToggleIcon(currentTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    body.classList.add("dark-mode");
    updateToggleIcon("dark-mode");
  }

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light-mode");
      updateToggleIcon("light-mode");
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
      updateToggleIcon("dark-mode");
    }
  });

  function updateToggleIcon(theme) {
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "dark-mode") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
});
