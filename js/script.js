//Provides array of pokemon
let pokemonRepository = (function() {
  let pokemonList = [];
  //Links to pokedex API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Function to add additional pokemon to array
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
  } else {
      console.log('error')
  }};

  //Returns list of pokemon
  function getAll() {
    return pokemonList;
  };

  function addListItem(pokemon) {
    //Creates buttons for each pokemon
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('primary-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    //Log pokemon to console upon click
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  };

  //Fetch and compile list of pokemon
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      let elementToRemove = document.querySelector('.message');
      elementToRemove.parentElement.removeChild(elementToRemove);
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

  //Gets details from each pokemon url
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      let elementToRemove = document.querySelector('.message');
      elementToRemove.parentElement.removeChild(elementToRemove);
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    })
  };

  //Logs pokemon details to console
  function showDetails(item) {
    loadDetails(item).then(function() {
      console.log(item)
    })
  };

  //Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Uses forEach to write pokemon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
