import axios from 'axios';
import { Notify } from "notiflix";

const refs = {
    form: document.querySelector('.search-form'),
    btnSearch: document.querySelector('.search-form > button'),
    input: document.querySelector('input'),
    cardsContainer: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSearchImages);

function onSearchImages(evt) {
    evt.preventDefault();
    refs.cardsContainer.innerHTML = '';
    const searchValue = refs.input.value.trim();

    
    fetchImages(searchValue).then(response => {
        console.log(response.data);
        
            if (response.data.hits.length === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                response.data.hits.forEach(object => 
                makeCardMarkUp({ webformatURL, tags, likes, views, comments, downloads} = object)
                );
            }
            
        });

        

    
        
    

    
};


async function fetchImages(value) {
    const params = new URLSearchParams({
        key: "36806904-a94ef5850b37be256607932e3",
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
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


