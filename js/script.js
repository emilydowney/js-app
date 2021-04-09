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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'height', 'type', 'abilities']) {
    pokemonList.push(pokemon);
  }};

  return {
    getAll: getAll,
    add: add
  };
})();

//Uses forEach to write pokemon and height
pokemonRepository.getAll().forEach(function(pokemonList) {
  if (pokemonList.height > 0.6) {
    document.write(pokemonList.name + ' (Height: ' + pokemonList.height + ' - Wow, that\'s big!)<br>')
  } else {
    document.write(pokemonList.name + ' (Height: ' + pokemonList.height + ')<br>')
  }
});
