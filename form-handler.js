document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.navToggle');
  const navOverlay = document.querySelector('.navOverlay');
  const navigation = document.querySelector('#primaryNavigation');
  const navBrand = document.querySelector('.navBrand');
  const splash = document.querySelector('#splash');

  if (navBrand && splash) {
    const updateNavBrand = () => {
      const splashBounds = splash.getBoundingClientRect();
      const isHeroVisible = splashBounds.bottom > 0 && splashBounds.top < window.innerHeight;
      navBrand.classList.toggle('isVisible', !isHeroVisible);
    };

    updateNavBrand();
    window.addEventListener('scroll', updateNavBrand, { passive: true });
    window.addEventListener('resize', updateNavBrand);
  }

  if (navToggle && navOverlay && navigation) {
    const setNavigationOpen = (isOpen, returnFocus = false) => {
      document.body.classList.toggle('navMenuOpen', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navOverlay.hidden = !isOpen;

      if (!isOpen && returnFocus) {
        navToggle.focus();
      }
    };

    navToggle.addEventListener('click', () => {
      setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    navOverlay.addEventListener('click', () => setNavigationOpen(false, true));

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavigationOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNavigationOpen(false, true);
      }
    });

    window.matchMedia('(min-width: 950px)').addEventListener('change', (event) => {
      if (event.matches) {
        setNavigationOpen(false);
      }
    });
  }

  const form = document.querySelector('.signupForm');
  const msg = document.querySelector('#mailingListSignup .signupSuccess');

  if (form) {
    console.log('Form and success message found:', form, msg);
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        msg.style.display = 'block';

        for (let i = 0; i < 40; i++) {
          const confetti = document.createElement('div');
          confetti.classList.add('confetti-piece');
          confetti.style.left = Math.random() * window.innerWidth + 'px';
          confetti.style.top = Math.random() * -100 + 'px';
          confetti.style.backgroundColor = ['#E4B845', '#99d89e', '#D8334E', '#FEF8DF'][Math.floor(Math.random() * 4)];
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 3000);
        }
      }
    });
  }
});
