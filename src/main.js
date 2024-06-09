// Імпорт бібліотек
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getSearchImage } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

// Отримання елементів DOM
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.input');
const imageGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

// Функції для показу та приховування завантажувача та кнопки "Load More"
function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

// Обробник події для форми пошуку
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const queryImage = searchInput.value.trim();

  if (queryImage === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  if (queryImage !== currentQuery) {
    currentPage = 1;
    currentQuery = queryImage;
    imageGallery.innerHTML = '';
    showLoader();
    hideLoadMoreBtn();

    try {
      const data = await getSearchImage(queryImage, currentPage);
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            '❌ Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
          maxWidth: 350,
          timeout: 5000,
          progressBar: false,
        });
      } else {
        const markup = renderGallery(data.hits);
        imageGallery.innerHTML = markup;
        lightbox.refresh();
        currentPage++;
        checkEndOfResults();
      }
    } catch (error) {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, an error occurred while fetching the images. Please try again later.',
      });
    } finally {
      hideLoader();
    }
  }

  event.target.reset();
});

// Обробник події для кнопки "Load More"
loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  try {
    const data = await getSearchImage(currentQuery, currentPage);
    if (data.hits.length > 0) {
      const markup = renderGallery(data.hits);
      imageGallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
      currentPage++;
      checkEndOfResults();
      smoothScroll();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, an error occurred while fetching the images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

// Функція для перевірки кінця результатів пошуку
function checkEndOfResults() {
  if (imageGallery.querySelectorAll('.gallery-item').length < totalHits) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 5000,
    });
  }
}

// Функція для плавного прокручування сторінки
function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
