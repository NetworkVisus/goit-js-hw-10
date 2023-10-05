import axios from 'axios';
import * as catApi from './cat-api.js';
import SlimSelect from 'slim-select';

const refs = {
  selector: document.querySelector('.breed-select'),
  catCard: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

catApi
  .fetchBreeds()
  .then(({ data }) => {
    refs.selector.insertAdjacentHTML('beforeend', fillSelect(data));
    refs.selector.hidden = false;
    refs.loader.hidden = true;
    new SlimSelect({
      select: refs.selector,
    });
  })
  .catch(() => {
    refs.loader.hidden = true;
    refs.error.hidden = false;
  });

refs.selector.addEventListener('select', handleSelection);

function handleSelection(event) {
  console.log(event.Target);
}

function createCatCard(breed) {}

function fillSelect(breeds) {
  return breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}
