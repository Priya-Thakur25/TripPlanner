import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers:{
        'Content-Type' : 'application/json',
        'X-Goog-Api-Key' : 'AlzaSy2J9pFOTvXdGG4BlsS9Oo6U1sRZ8jeetrT',
        'X-Goog-FieldMask' : 'places.photos,places.displayName,places.id'

    }
}

export const GetPlaceDetails = (data) => axios.post(BASE_URL,data,config)