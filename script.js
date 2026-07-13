document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentImages = [];   // массив изображений текущей галереи
  let currentIndex = 0;

  // Открыть лайтбокс
  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    lightboxImg.src = currentImages[currentIndex].src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // запретить скролл фона
  }

  // Закрыть лайтбокс
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Показать предыдущее
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  }

  // Показать следующее
  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  }

  // Навешиваем обработчики на все картинки (кроме логотипа)
  const allImages = document.querySelectorAll('.gallery img');
  allImages.forEach((img, idx) => {
    img.addEventListener('click', function() {
      // Найти родительскую галерею (div.gallery), в которой находится картинка
      const gallery = this.closest('.gallery');
      if (!gallery) return;
      // Собираем все img внутри этой галереи
      const imagesInGroup = Array.from(gallery.querySelectorAll('img'));
      const clickedIndex = imagesInGroup.indexOf(this);
      openLightbox(imagesInGroup, clickedIndex);
    });
  });

  // Кнопки управления
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  closeBtn.addEventListener('click', closeLightbox);

  // Закрытие по клику вне картинки (на тёмный фон)
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Навигация с клавиатуры
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display !== 'block') return;
    if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});