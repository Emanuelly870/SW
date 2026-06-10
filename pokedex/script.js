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

// Função assíncrona para buscar Pokémon
async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (!response.ok) {
      throw new Error('Pokémon não encontrado');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error.message);
    return null;
  }
}

// Função assíncrona para renderizar Pokémon
async function renderPokemon(pokemon) {

  try {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (!data) {
      throw new Error('Dados não encontrados');
    }

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

  } catch (error) {

    console.error('Erro ao renderizar Pokémon:', error.message);

    pokemonImage.style.display = 'none';

    pokemonName.innerHTML = 'Não encontrado';
    pokemonNumber.innerHTML = '';

    pokemonTypes.innerHTML = '-';
    pokemonHeight.innerHTML = '-';
    pokemonWeight.innerHTML = '-';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', async () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    await renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', async () => {
  searchPokemon++;
  await renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
