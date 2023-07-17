import axios from 'axios';
import{loadProgErr} from './index'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = 'api_key=live_rYrVRULF5CrMitNcSEDyfHl2ahgC30j9gVFbuCA9LbTx1Bu2Vy0exAm68skAwszi'

export function fetchBreeds(arr) {
    return arr.map((item) => `<option value="${item.id}">${item.name}</option>`).join('');
}

const option = {
    onDownloadProgress: function (evtProgress) {
        loadProgErr(false)
       }
}

export function fetchCatByBreed(breedId) {
    const URL_CAT_INFO = 'https://api.thecatapi.com/v1/images/search?breed_ids='    
    
return axios.get(`${URL_CAT_INFO}${breedId}&${API_KEY}`, option)
        .then((catData) => {return catData})
        .catch((err) => {Notify.warning(err.code)})  
}

