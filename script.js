/* ==============================
   FUN + SMOOTH NO BUTTON DODGE
============================== */
const noBtn = document.getElementById('noBtn');
let noCount = 0;
let isYesNow = false;

// Smooth easing
noBtn.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';

function moveNo() {
  if (isYesNow) return;

  noCount++;

  const rect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - 20;
  const maxY = window.innerHeight - rect.height - 20;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  setTimeout(function () {
    noBtn.style.transform =
      'translate(' + (x - rect.left) + 'px,' + (y - rect.top) + 'px)';
  }, 80);

  if (noCount >= 3) {
    isYesNow = true;

    setTimeout(function () {
      noBtn.innerText = 'YES 💕';
      noBtn.style.background = 'var(--red)';
      noBtn.style.color = 'white';
      noBtn.style.transform = 'translate(0,0)';

      noBtn.removeEventListener('mouseenter', moveNo);
      noBtn.removeEventListener('click', moveNo);

      noBtn.onclick = triggerYes;
    }, 300);
  }
}

noBtn.addEventListener('mouseenter', moveNo);
noBtn.addEventListener('click', moveNo);


/* ==============================
   HEART TAP EFFECT
============================== */
document.addEventListener('click', function (e) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.fontSize = '18px';
  heart.style.animation = 'tapHeart 1s ease forwards';

  document.body.appendChild(heart);
  setTimeout(function () {
    heart.remove();
  }, 1000);
});


/* ==============================
   SCROLL REVEAL
============================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.polaroid, p, h2');

  elements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

initScrollReveal();


/* ==============================
   YES BUTTON LOGIC
============================== */
document.getElementById('yesBtn').onclick = triggerYes;

function triggerYes() {

  // 🔊 Sound
  const yesSound = document.getElementById('yesSound');
  if (yesSound) {
    yesSound.currentTime = 0;
    yesSound.volume = 0.45;
    setTimeout(function () {
      yesSound.play().catch(function () {});
    }, 80);
  }

  // 💓 Tiny pulse
  document.body.style.transform = 'scale(0.992)';
  setTimeout(function () {
    document.body.style.transform = 'scale(1)';
  }, 120);

  // ❤️ Heart explosion
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'explosion';
    heart.textContent = '❤️';
    heart.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
    heart.style.setProperty('--y', (Math.random() * 200 - 100) + 'px');
    heart.style.left = '50%';
    heart.style.top = '50%';

    document.body.appendChild(heart);
    setTimeout(function () {
      heart.remove();
    }, 1000);
  }

  // ➡️ Page transition
  setTimeout(function () {
    document.getElementById('content').style.display = 'none';
    document.getElementById('lovePage').style.display = 'flex';
    document.getElementById('lovePage')
      .scrollIntoView({ behavior: 'smooth' });
  }, 800);
}
