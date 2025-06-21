document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu li a");
  const body = document.body;

  // Helper: lock scroll on mobile menu open
  function toggleBodyScroll(lock) {
    if (lock) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Toggle Mobile Menu
  function openMenu() {
    navMenu.classList.add("show");
    navMenu.style.animation = "slideDown 0.3s forwards, menu-bg-gradient 7s ease-in-out infinite";
    mobileMenuBtn.classList.add("active");
    toggleBodyScroll(true);
  }
  function closeMenu() {
    navMenu.style.animation = "slideUp 0.3s forwards";
    setTimeout(() => {
      navMenu.classList.remove("show");
      navMenu.style.animation = "";
      mobileMenuBtn.classList.remove("active");
      toggleBodyScroll(false);
    }, 300);
  }

  // Toggle menu on hamburger click
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      if (navMenu.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when a nav link is clicked (mobile UX)
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 900 && navMenu.classList.contains("show")) {
        closeMenu();
      }
    });
  });

  // --- Optionally, close menu on resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      navMenu.style.animation = "";
      mobileMenuBtn.classList.remove("active");
      toggleBodyScroll(false);
    }
  });

  // Load live scores with loading animation
  loadLiveScores();

  // Load expert tips with loading animation
  loadExpertTips();

  // Add scroll animations
  initScrollAnimations();
});

// --- Leave your other functions exactly as they are below (initScrollAnimations, loadLiveScores, loadExpertTips) ---
