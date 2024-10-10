const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('button');
const pokemonPicture = document.getElementById('pokemon-picture');
const pokemonName = document.getElementById('pokemon-name');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonPosition = document.getElementById('pokemon-position');
const previousButton = document.getElementById('pokemon-previous');
const nextButton = document.getElementById('pokemon-next');

let currentPokemonId = 1;

function fetchPokemon(pokemon) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon non trouvé');
      }
      return response.json(); 
    })
    .then(data => {
      pokemonPicture.src = data.sprites.front_default;
      pokemonName.textContent = 'Nom: ' + data.name;
      pokemonWeight.textContent = 'Poids: ' + (data.weight / 10) + ' kg';
      pokemonHeight.textContent = 'Taille: ' + (data.height / 10) + ' m';
      pokemonTypes.textContent = 'Types: ' + data.types.map(t => t.type.name).join(', ');
      pokemonAbilities.textContent = 'Capacités: ' + data.abilities.map(a => a.ability.name).join(', ');
      currentPokemonId = data.id;
      pokemonPosition.textContent = 'Pokémon ' + currentPokemonId + ' sur 1010';
      previousButton.disabled = currentPokemonId === 1;
      nextButton.disabled = currentPokemonId === 1010;
    })
    .catch(error => {
      alert('Erreur lors de la récupération du Pokémon');
      console.error(error);
    });
}

function loadPreviousPokemon() {
  if (currentPokemonId > 1) {
    fetchPokemon(currentPokemonId - 1);
  }
}

function loadNextPokemon() {
  if (currentPokemonId < 1010) {
    fetchPokemon(currentPokemonId + 1);
  }
}

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    fetchPokemon(query);
  } else {
    alert('Veuillez entrer un nom ou un numéro de Pokémon');
  }
});

previousButton.addEventListener('click', loadPreviousPokemon);
nextButton.addEventListener('click', loadNextPokemon);

fetchPokemon(1);
