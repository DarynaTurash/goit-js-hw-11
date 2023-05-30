import axios from 'axios';

const PER_PAGE = 40;

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

export {fetchImages, PER_PAGE};