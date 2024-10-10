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
function getTypeImageUrl(type) {
  switch (type) {
    case 'combat':
    case 'fighting':
      return './assets/img/Tcombat.png';
    case 'dragon':
      return './assets/img/Tdragon.png';
    case 'eau':
    case 'water':
      return './assets/img/Teau.png';
    case 'electrik':
    case 'electric':
      return './assets/img/Telectrik.png';
    case 'feu':
    case 'fire':
      return './assets/img/Tfeu.png';
    case 'glace':
    case 'ice':
      return './assets/img/Tglace.png';
    case 'insecte':
    case 'bug':
      return './assets/img/Tinsecte.png';
    case 'plante':
    case 'grass':
      return './assets/img/Tplante.png';
    case 'poison':
      return './assets/img/Tpoison.png';
    case 'psy':
    case 'psychic':
      return './assets/img/Tpsy.png';
    case 'roche':
    case 'rock':
      return './assets/img/Troche.png';
    case 'sol':
    case 'ground':
      return './assets/img/Tsol.png';
    case 'spectre':
    case 'ghost':
      return './assets/img/Tspectre.png';
    case 'vol':
    case 'flying':
      return './assets/img/Tvol.png';
    case 'tenebres':
    case 'dark':
      return './assets/img/Ttenebres.png';
    default:
      return '';
  }
}


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
      pokemonTypes.textContent = 'Types: ';
      data.types.forEach(t => {
        const typeImageUrl = getTypeImageUrl(t.type.name);
        if (typeImageUrl) {
          const typeImage = document.createElement('img');
          typeImage.src = typeImageUrl;
          typeImage.alt = t.type.name + ' type';
          typeImage.style.cursor = 'pointer';
          typeImage.style.width = '55px';
          typeImage.style.height = '29px';
          typeImage.addEventListener('click', () => {
            // Code à ajouter ici
          });
          pokemonTypes.appendChild(typeImage);
        }
        // Ajouter l'icône Tnormal si le type est Normal
        if (t.type.name === 'normal') {
          const typeImage = document.createElement('img');
          typeImage.src = './assets/img/Tnormal.png';
          typeImage.alt = 'Normal type';
          typeImage.style.cursor = 'pointer';
          typeImage.style.width = '55px';
          typeImage.style.height = '29px';
          typeImage.addEventListener('click', () => {
            // Code à ajouter ici
          });
          pokemonTypes.appendChild(typeImage);
        }
      });
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
