import axios from 'axios';


axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'live_rYrVRULF5CrMitNcSEDyfHl2ahgC30j9gVFbuCA9LbTx1Bu2Vy0exAm68skAwszi';

const API_KEY = 'api_key=live_rYrVRULF5CrMitNcSEDyfHl2ahgC30j9gVFbuCA9LbTx1Bu2Vy0exAm68skAwszi'
const END_POINT = '/breeds';

export function fetchBreeds() {

return axios.get(`${END_POINT}`)
   
}


export function fetchCatByBreed(breedId) {
    
const URL_CAT_INFO = 'https://api.thecatapi.com/v1/images/search?breed_ids='    
    
return axios.get(`${URL_CAT_INFO}${breedId}&${API_KEY}`)
          
}







