// assets/js/include.js
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    
    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
      if (link.getAttribute("href") === page) {
        link.classList.add("active");
      }
    });

    const saved = localStorage.getItem('preferredLang')
      || (navigator.language.startsWith('en') ? 'en' : 'fr');
    updateLangButtons(saved);
    document.documentElement.className = 'lang-' + saved;
    document.documentElement.setAttribute('lang', saved);

    // On affiche immédiatement le contenu
    document.getElementById("page").style.visibility = "visible";

    setTimeout(() => {
      const loader = document.getElementById("loader");
      const logo   = loader.querySelector(".logo");
      const left   = loader.querySelector(".panel-left");
      const right  = loader.querySelector(".panel-right");

      // 1) Rotation 360° du logo
      logo.classList.add("rotate360");

      // 2) Après la rotation (0.6s), lancer le slide des panneaux
      setTimeout(() => {
        left.classList.add("slide");
        right.classList.add("slide");

        // 3) Après la fin du slide (1s), fade-out + suppression
        setTimeout(() => {
          loader.classList.add("fade-out");
          setTimeout(() => loader.remove(), 300);
        }, 1000);

      }, 800);

    }, 200);
  });
});

function includeHTML(callback) {
  const els = document.querySelectorAll("[data-include]");
  if (!els.length) return callback();
  let remaining = els.length;
  els.forEach(el => {
    fetch(el.getAttribute("data-include"))
      .then(r => r.text())
      .then(html => el.outerHTML = html)
      .catch(console.error)
      .finally(() => {
        if (--remaining === 0) callback();
      });
  });
}

function updateLangButtons(lang) {
  document.querySelectorAll('button[data-lang]').forEach(btn => {
    btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang);
  });
}