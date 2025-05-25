const STORAGE_KEY = 'preferredLang';

function updateLangButtons(lang) {
  document.querySelectorAll('button[data-lang]').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active-lang');
    } else {
      btn.classList.remove('active-lang');
    }
  });
}

function setLang(lang) {
  // 1) change le DOM
  document.documentElement.className = 'lang-' + lang;
  document.documentElement.setAttribute('lang', lang);
  // 2) stocke
  localStorage.setItem(STORAGE_KEY, lang);
  // 3) marque le bouton actif
  updateLangButtons(lang);
}

// IIFE d'initialisation
(function initLang(){
  const urlLang = new URLSearchParams(location.search).get('lang');
  let lang = urlLang === 'fr' || urlLang === 'en'
    ? urlLang
    : localStorage.getItem(STORAGE_KEY) === 'fr' || localStorage.getItem(STORAGE_KEY) === 'en'
      ? localStorage.getItem(STORAGE_KEY)
      : (navigator.language.startsWith('en') ? 'en' : 'fr');
  setLang(lang);
})();

// au chargement de la page, anime les barres de progression
window.addEventListener('load', () => {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const val = bar.getAttribute('aria-valuenow');
    bar.style.width = val + '%';
  });
});
