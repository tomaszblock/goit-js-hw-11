import Notiflix from 'notiflix';
import axios from 'axios';

const form = document.querySelector('.search-form');
const inputWindow = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;

//nowy wybór
const createFixabay = async () => {
  const searching = inputWindow.value.split(' ').join('+');
  page = 1;
  const data = await axios
    .get(
      `https://pixabay.com/api/?key=42489300-4271c1d54e84a75a5c8c2f4bb&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(res => {
      const array = res.data.hits;
      console.log(res.data);
      console.log(array.length);
      if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
          gallery.insertAdjacentHTML(
            'beforeend',
            `<div class="photo-card">
            <img src="${array[i].webformatURL}" alt="${array[i].tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${array[i].likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${array[i].views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${array[i].comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${array[i].downloads}</b>
              </p>
            </div>
          </div>`
          );
        }
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });

  return data;
};

function search(event) {
  event.preventDefault();
  if (event.type === 'submit') {
    createFixabay();
    let photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(element => element.remove());
    loadMoreBtn.style.display = 'block';
  }
}

// dodanie kolejnych wyników

const moreFixabay = async () => {
  const searching = inputWindow.value.split(' ').join('+');
  page = page + 1;
  const data = await axios
    .get(
      `https://pixabay.com/api/?key=42489300-4271c1d54e84a75a5c8c2f4bb&q=${searching}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(res => {
      const array = res.data.hits;
      console.log(res.data);
      console.log(array.length);
      if (page * 40 < res.data.totalHits + 40) {
        for (let i = 0; i < array.length; i++) {
          gallery.insertAdjacentHTML(
            'beforeend',
            `<div class="photo-card">
            <img src="${array[i].webformatURL}" alt="${array[i].tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${array[i].likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${array[i].views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${array[i].comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${array[i].downloads}</b>
              </p>
            </div>
          </div>`
          );
        }
        loadMoreBtn.style.display = 'block';
      } else {
        Notiflix.Report.warning(
          'WARNING!',
          "We're sorry, but you've reached the end of search results.",
          'I understand'
        );
      }
    });

  return data;
};

function loadMore(event) {
  if (event.type === 'click') {
    loadMoreBtn.style.display = 'none';
    moreFixabay();
  }
}

form.addEventListener('submit', search);
loadMoreBtn.addEventListener('click', loadMore);
