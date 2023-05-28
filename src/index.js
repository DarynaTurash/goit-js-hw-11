import axios from 'axios';
import { Notify } from "notiflix";

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
const PER_PAGE = 40;


refs.form.addEventListener('submit', onSearchImages);
refs.btnLoadMore.addEventListener('click', onLoadMore);


function onSearchImages(evt) {
    evt.preventDefault();
    refs.cardsContainer.innerHTML = '';
    page = 1;
    refs.btnLoadMore.classList.remove('is-hidden');
    searchValue = refs.input.value.trim();

    if(searchValue !== '') {
        fetchImages(searchValue, page).then(response => {
            console.log(response.data);
    
                if (response.data.hits.length === 0) {
                    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                } else {
                    response.data.hits.forEach(object => 
                    makeCardMarkUp({ webformatURL, tags, likes, views, comments, downloads} = object)
                    );   
                }
            }).catch((error => console.log(error)))
    } else {
        Notify.info("Oops, we can't find anything from an empty field - write something please");
    }
}



async function fetchImages(value, page) {

    const params = new URLSearchParams({
        key: "36806904-a94ef5850b37be256607932e3",
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: PER_PAGE,
        page
    });

    return await axios.get(`https://pixabay.com/api/?${params}`);
};

function makeCardMarkUp({ webformatURL, tags, likes, views, comments, downloads}) {
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
                makeCardMarkUp({ webformatURL, tags, likes, views, comments, downloads} = object)
                );

                if(page === Math.ceil(response.data.totalHits / PER_PAGE)) {
                    Notify.info("We're sorry, but you've reached the end of search results.");
                }
            }
        }).catch(error => console.log(error));
}



