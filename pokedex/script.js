const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const pokemonTypes = document.querySelector('.pokemon__types');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonWeight = document.querySelector('.pokemon__weight');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  try {

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (response.status === 200) {
      return await response.json();
    }

    return null;

  } catch {
    return null;
  }
};

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {

    pokemonImage.style.display = 'block';

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${data.id}`;

    pokemonImage.src =
      data.sprites.versions['generation-v']
      ['black-white'].animated.front_default
      || data.sprites.front_default;

    pokemonTypes.innerHTML =
      data.types.map(type => type.type.name).join(' / ');

    pokemonHeight.innerHTML =
      `${data.height / 10} m`;

    pokemonWeight.innerHTML =
      `${data.weight / 10} kg`;

    searchPokemon = data.id;
    input.value = '';

  } else {

    pokemonImage.style.display = 'none';

    pokemonName.innerHTML = 'Não encontrado';
    pokemonNumber.innerHTML = '';

    pokemonTypes.innerHTML = '-';
    pokemonHeight.innerHTML = '-';
    pokemonWeight.innerHTML = '-';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {

  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }

});

buttonNext.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);