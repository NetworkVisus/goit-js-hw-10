import axios from 'axios';
import * as catApi from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

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
    new SlimSelect({
      select: refs.selector,
      settings: {
        disabled: false,
      },
    });
    refs.selector.hidden = false;
    refs.loader.hidden = true;
  })
  .catch(() => {
    refs.loader.hidden = true;
    refs.error.hidden = false;
  });

refs.selector.addEventListener('change', handleSelection);

function handleSelection(event) {
  refs.catCard.style.display = 'none';
  refs.loader.hidden = false;
  catApi
    .fetchCatByBreed(event.currentTarget.value)
    .then(({ data }) => {
      refs.loader.hidden = true;
      refs.catCard.style.display = 'flex';
      console.log(data);
      refs.catCard.innerHTML = createCatCard(data[0].breeds);
    })
    .catch(() => {
      refs.loader.hidden = true;
      refs.error.hidden = false;
    });
}

function createCatCard(breed) {
  return breed
    .map(
      ({ name, temperament, description, reference_image_id }) =>
        `<img class = "card-img" src = "https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt = "${name}">
            <div class = "cat-info-descr">
        <h3 class = "card-header">${name}</h3>
          <p class = "card-description">${description}</p>
          <p class = "card-temperaments"><span class = "temperament-span">Temperament: </span>${temperament}</p>
          </div>
      `
    )
    .join('');
}

function fillSelect(breeds) {
  return breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}
