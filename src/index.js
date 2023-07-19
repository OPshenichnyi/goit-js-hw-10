import {fetchBreeds, fetchCatByBreed} from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    select: document.querySelector('.breed-select'),
    container: document.querySelector('.cat-info'),
    lodaer: document.querySelector('.loader')
}



refs.select.style.visibility = 'hidden';
refs.lodaer.style.visibility = 'visible';

fetchBreeds().then((resp) => {
    murkupSelect(resp.data),
        refs.select.style.visibility = 'visible',
        refs.lodaer.style.visibility = 'hidden'
}).catch((err) => { Notify.warning(err.code) });

function murkupSelect(arr) {
   refs.select.innerHTML = arr.map((item) => `<option value='' style="display:none;">Select cat</option><option value="${item.id}">${item.name}</option>`).join('');
}



refs.select.addEventListener('change', () => {
    loadProgErr(true),
        fetchCatByBreed(refs.select.value).then((res) => {
            markupCatCard(res.data[0].url, res.data[0].breeds[0]),
                loadProgErr(false)
        }).catch((err) => {Notify.warning(err.code), errCleanCard()});
});


function markupCatCard(urlImg, catInfo) {
    const { name, description, temperament } = catInfo;

    refs.container.innerHTML = `<img src="${urlImg}" alt="${name}" width="500px"><div class="catCard">
    <H2>${name}</H2><p>${description}</p><p><span class="spanCat">Temperament: </span>${temperament}</p></div>`;
}


function loadProgErr(value) {
    
     if (value === true) {
         refs.container.style.visibility = 'hidden';
         refs.lodaer.style.visibility = 'visible';
    } 
    
     if (value === false) {
         refs.container.style.visibility = 'visible';
         refs.lodaer.style.visibility = 'hidden';
     }
}


function errCleanCard() {
    refs.container.innerHTML = '';
    refs.lodaer.style.visibility = 'hidden'
}