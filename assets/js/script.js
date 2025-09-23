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
