// =========================================
// SMK SWASTA MANDIRI - PREMIUM UI/UX JS
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // ELEMENT
  // =========================================

  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const missionButton = document.getElementById("showMission");
  const missionPanel = document.getElementById("missionPanel");
  const contactButton = document.getElementById("contactButton");

  const statNumbers = document.querySelectorAll(".stat-number");
  const cards = document.querySelectorAll(
    ".feature-card, .major-card, .info-item, .stat-card"
  );

  const revealItems = document.querySelectorAll(
    ".hero-card, .feature-card, .major-card, .info-card, .schedule-card, .stat-card"
  );

  // =========================================
  // CUSTOM TOAST
  // =========================================

  const toast = document.createElement("div");

  toast.className = "toast";

  document.body.appendChild(toast);

  let toastTimer;

  function showToast(message) {

    clearTimeout(toastTimer);

    toast.innerHTML = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // =========================================
  // DARK MODE
  // =========================================

  function setTheme(mode) {

    if (mode === "dark") {

      body.classList.add("dark-mode");

      themeToggle.innerHTML = "☀️ Mode Terang";

    } else {

      body.classList.remove("dark-mode");

      themeToggle.innerHTML = "🌙 Mode Gelap";
    }

    localStorage.setItem("theme-smk", mode);
  }

  function loadTheme() {

    const saved =
      localStorage.getItem("theme-smk") || "light";

    setTheme(saved);
  }

  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const isDark =
        body.classList.contains("dark-mode");

      setTheme(isDark ? "light" : "dark");

      showToast(
        isDark
          ? "☀️ Mode terang aktif"
          : "🌙 Mode gelap aktif"
      );
    });
  }

  // =========================================
  // SMOOTH STATS COUNTER
  // =========================================

  function animateCounter(element, target) {

    let current = 0;

    const speed = target / 120;

    function update() {

      current += speed;

      if (current < target) {

        element.textContent =
          Math.ceil(current).toLocaleString();

        requestAnimationFrame(update);

      } else {

        element.textContent =
          target.toLocaleString();
      }
    }

    update();
  }

  statNumbers.forEach((stat) => {

    const target =
      Number(stat.dataset.target);

    animateCounter(stat, target);
  });

  // =========================================
  // FLOATING CARD EFFECT
  // =========================================

  cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const rotateX =
        ((y / rect.height) - 0.5) * -10;

      const rotateY =
        ((x / rect.width) - 0.5) * 10;

      card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;

      card.style.transition =
        "transform 0.1s";
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        `
        perspective(1000px)
        rotateX(0)
        rotateY(0)
        translateY(0)
      `;

      card.style.transition =
        "0.4s ease";
    });
  });

  // =========================================
  // MISSION PANEL
  // =========================================

  if (missionButton && missionPanel) {

    missionButton.addEventListener("click", () => {

      missionPanel.classList.toggle("active");

      const active =
        missionPanel.classList.contains("active");

      missionButton.innerHTML =
        active
          ? "Sembunyikan Misi"
          : "Tampilkan Misi";

      showToast(
        active
          ? "✨ Misi sekolah ditampilkan"
          : "📘 Misi disembunyikan"
      );
    });
  }

  // =========================================
  // CONTACT BUTTON
  // =========================================

  if (contactButton) {

    contactButton.addEventListener("click", () => {

      const contact =
        document.getElementById("contact");

      if (contact) {

        contact.scrollIntoView({
          behavior: "smooth"
        });

        showToast(
          "📞 Menuju Hubungi Kami"
        );
      }
    });
  }

  // =========================================
  // REVEAL ANIMATION
  // =========================================

  revealItems.forEach((item) => {

    item.style.opacity = "0";

    item.style.transform =
      "translateY(80px)";

    item.style.transition =
      "all 0.8s cubic-bezier(.17,.67,.32,1.27)";
  });

  function revealOnScroll() {

    const trigger =
      window.innerHeight * 0.85;

    revealItems.forEach((item) => {

      const top =
        item.getBoundingClientRect().top;

      if (top < trigger) {

        item.style.opacity = "1";

        item.style.transform =
          "translateY(0)";
      }
    });
  }

  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  revealOnScroll();

  // =========================================
  // HERO IMAGE PARALLAX
  // =========================================

  const heroImage =
    document.querySelector(".hero-image img");

  window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const moveX =
      (e.clientX / window.innerWidth - 0.5) * 12;

    const moveY =
      (e.clientY / window.innerHeight - 0.5) * 12;

    heroImage.style.transform =
      `scale(1.05) translate(${moveX}px, ${moveY}px)`;

    heroImage.style.transition =
      "0.25s ease-out";
  });

  // =========================================
  // BUTTON RIPPLE EFFECT
  // =========================================

  const buttons =
    document.querySelectorAll("button, a");

  buttons.forEach((button) => {

    button.addEventListener("click", function (e) {

      const ripple =
        document.createElement("span");

      ripple.classList.add("ripple");

      const rect =
        button.getBoundingClientRect();

      ripple.style.left =
        `${e.clientX - rect.left}px`;

      ripple.style.top =
        `${e.clientY - rect.top}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  });

  // =========================================
  // ACTIVE NAVBAR
  // =========================================

  const navLinks =
    document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.forEach((item) =>
        item.classList.remove("active")
      );

      link.classList.add("active");
    });
  });

  // =========================================
  // PAGE LOADER EFFECT
  // =========================================

  body.style.opacity = "0";

  setTimeout(() => {

    body.style.transition =
      "opacity 1s ease";

    body.style.opacity = "1";

  }, 200);

  // =========================================
  // INIT
  // =========================================

  loadTheme();

  showToast(
    "🎓 Selamat datang di SMK Swasta Mandiri"
  );

});