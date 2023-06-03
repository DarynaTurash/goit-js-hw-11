
import { Notify } from "notiflix";
import { fetchImages, PER_PAGE } from './js/fetchImages';

const refs = {
    form: document.querySelector('.search-form'),
    btnSearch: document.querySelector('.search-form > button'),
    input: document.querySelector('input'),
    cardsContainer: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

let page = 0;
let searchValue = '';
refs.btnLoadMore.classList.add('is-hidden');



refs.form.addEventListener('submit', onSearchImages);
refs.btnLoadMore.addEventListener('click', onLoadMore);


function onSearchImages(evt) {
    evt.preventDefault();
    refs.cardsContainer.innerHTML = '';
    page = 1;
    searchValue = refs.input.value.trim();

    if(searchValue !== '') {
        fetchImages(searchValue, page).then(response => {
            console.log(response.data);
    
                if (response.data.hits.length === 0) {
                    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                } else {
                    response.data.hits.forEach(object => 
                    makeMarkUpCard(object)
                    );  
                    
                    if(page < Math.ceil(response.data.totalHits / PER_PAGE)) {
                        refs.btnLoadMore.classList.remove('is-hidden');
                    }
                }
            }).catch((error => console.log(error)))
    } else {
        Notify.info("Oops, we can't find anything from an empty field - write something please");
    }
}

function makeMarkUpCard({ webformatURL, tags, likes, views, comments, downloads}) {
    const oneCardMarkUp = `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    <div class="info">
        <p class="info-item">
        <b>Likes:  <span>${likes}</span></b>
        </p>
        <p class="info-item">
        <b>Views:  <span>${views}</span></b>
        </p>
        <p class="info-item">
        <b>Comments:  <span>${comments}</span></b>
        </p>
        <p class="info-item">
        <b>Downloads:  <span>${downloads}</span></b>
        </p>
    </div>
    </div>
    `

    refs.cardsContainer.insertAdjacentHTML('beforeend', oneCardMarkUp);
}

function onLoadMore() {
    page += 1;

    fetchImages(searchValue, page).then(response => {
        console.log(response.data);

            if (response.data.hits.length === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                response.data.hits.forEach(object => 
                makeMarkUpCard(object)
                );

                if(page === Math.ceil(response.data.totalHits / PER_PAGE)) {
                    Notify.info("We're sorry, but you've reached the end of search results.");
                } 
            }
        }).catch(error => console.log(error));
}



