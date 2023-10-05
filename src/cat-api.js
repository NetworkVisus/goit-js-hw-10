import axios from 'axios';

const API_KEY =
  'live_CxING8sOpkUo4oZadExQwcyPcKNUP3B0YonDaPQuP80oWVT8wGjxdNNlj0gqObEk';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
