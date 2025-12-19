const track = document.querySelector('.carousel__track');
const items = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const itemWidth = items[0].getBoundingClientRect().width + 20; // largeur + marge

// Clone tous les items et les ajoute à la suite
track.innerHTML += track.innerHTML;

let index = 0;

function updateCarousel() {
  track.scrollTo({
    left: index * itemWidth,
    behavior: 'smooth'
  });
}

nextBtn.addEventListener('click', () => {
  index++;
  updateCarousel();
  if (index >= items.length) {
    // réinitialiser après animation
    setTimeout(() => {
      track.scrollTo({ left: 0, behavior: 'auto' });
      index = 0;
    }, 300); // délai ≈ durée scroll-behavior
  }
});

prevBtn.addEventListener('click', () => {
  index--;
  if (index < 0) {
    // aller tout à la fin instantanément
    track.scrollTo({ left: items.length * itemWidth, behavior: 'auto' });
    index = items.length - 1;
  }
  updateCarousel();
});

async function loadData() {
  try {
    const [gResp, cResp] = await Promise.all([
      fetch('../json/game.json'),
      fetch('../json/console.json')
    ]);
    if (!gResp.ok || !cResp.ok) throw new Error('Erreur réseau');
    const [games, consoles] = await Promise.all([gResp.json(), cResp.json()]);
    renderGames(games);
    renderConsoles(consoles);
  } catch (err) {
    console.error('Impossible de charger les JSON:', err);
  }
}

function renderGames(games) {
  const container = document.getElementById('game-list');
  container.innerHTML = games.map(g => `
    <article class="card">
      <h3>${g.Game}</h3>
      <p>${g.Year || ''}</p>
    </article>
  `).join('');
}

function renderConsoles(consoles) {
  const container = document.getElementById('console-list');
  container.innerHTML = consoles.map(c => `<div>${c.name}</div>`).join('');
}

document.addEventListener('DOMContentLoaded', loadData);
