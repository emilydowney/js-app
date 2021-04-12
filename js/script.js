//Provides array of pokemon
let pokemonRepository = (function() {
  let pokemonList = [
  { name : 'Charmander',
    height : 0.6,
    type : 'fire',
    abilities : ['blaze', 'solar-power']
  },
  { name : 'Squirtle',
    height : 0.5,
    type : 'water',
    abilities : ['rain-dish', 'torrent']
  },
  { name : 'Bulbasaur',
    height : 0.7,
    type : ['grass', 'poison'],
    abilities : ['chlorophyll', 'overgrow']
  },
  { name : 'Pidgey',
    height : 0.3,
    type : ['flying', 'normal'],
    abilities : ['keen-eye', 'tangled-feet', 'big-pecks']
  },
  { name : 'Jigglypuff',
    height : 0.5,
    type : ['fairy', 'normal'],
    abilities : ['cute-charm', 'friend-guard']
  }];

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemonList[0]).every((key) => key in pokemon)) {
    pokemonList.push(pokemon);
  } else {
      console.log('error')
  }};

  function getAll() {
    return pokemonList;
    }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('primary-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

//Uses forEach to write pokemon and height
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
