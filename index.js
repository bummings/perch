window.addEventListener('scroll', function () {
  const scrolled = window.scrollY;

  document.getElementById('splash2').style.backgroundPosition =
    'center ' + -(scrolled * 0.3) + 'px';
  document.getElementById('splash3').style.backgroundPosition =
    'center ' + -(scrolled * 0.3) + 'px';
});
