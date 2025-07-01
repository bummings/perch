document.addEventListener('DOMContentLoaded', () => {
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