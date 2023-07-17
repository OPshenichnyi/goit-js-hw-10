import axios from 'axios';
import {fetchBreeds, fetchCatByBreed} from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'live_rYrVRULF5CrMitNcSEDyfHl2ahgC30j9gVFbuCA9LbTx1Bu2Vy0exAm68skAwszi';

const END_POINT = '/breeds';

const refs = {
    select: document.querySelector('.breed-select'),
    container: document.querySelector('.cat-info'),
    lodaer: document.querySelector('.loader')
}

refs.lodaer.style.visibility= 'hidden'

const option = {
    onDownloadProgress: function (evtProgress) {
        loaderProgress(evtProgress.progress)
    }
}

axios.get(`${END_POINT}`, option)
    .then((resp) => {refs.select.innerHTML = fetchBreeds(resp.data)})
    .catch((err) => {Notify.warning(err.code)})

refs.select.addEventListener('change', () => {loadProgErr(true), fetchCatByBreed(refs.select.value).then((res) => { markupCatCard(res.data[0].url,res.data[0].breeds[0] )})});

function markupCatCard(urlImg, catInfo) {
    const { name, description, temperament } = catInfo;

    refs.container.innerHTML = `<img src="${urlImg}" alt="${name}" width="500px"><div class="catCard">
    <H2>${name}</H2><p>${description}</p><p><span class="spanCat">Temperament: </span>${temperament}</p></div>`;
}


function loaderProgress(progress) {
    refs.lodaer.style.visibility = 'visible';
    refs.select.style.visibility = 'hidden';
            if (progress === 1) {
                refs.lodaer.style.visibility = 'hidden';
                refs.select.style.visibility = 'visible';
     }  
}


 export function loadProgErr(value) {
       
     if (value === true) {
         refs.container.style.visibility = 'hidden';
         refs.lodaer.style.visibility = 'visible';
     } 
     if (value === false) {
         refs.container.style.visibility = 'visible';
         refs.lodaer.style.visibility = 'hidden';
     }
}

