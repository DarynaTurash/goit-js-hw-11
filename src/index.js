import axios from 'axios';

const refs = {
    form: document.querySelector('.search-form'),
    btnSearch: document.querySelector('.search-form > button'),
    input: document.querySelector('input'),
}

refs.form.addEventListener('submit', onSearchImages);

function onSearchImages(evt) {
    evt.preventDafault();

    fetchImages(refs.input.value.trim()).then(response => {
        console.log(response.data);
    })
};


async function fetchImages(value) {
   return await axios.get('https://pixabay.com/api/', {
        params: {
          key: "36806904-a94ef5850b37be256607932e3",
          q: value,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
        }
      })
}


