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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
      if (details.types.length === 2) {
        item.secondType = ', ' + details.types[1].type.name;
      } else item.secondType = '';
    }).catch(function (e) {
      console.error(e);
    })
  };

  //Logs pokemon details to console
  function showDetails(item) {
    loadDetails(item).then(function() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.add('is-visible');
      modalContainer.innerHTML = '';
      modalContainer.addEventListener('click', function(e) {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerText = 'X';
      closeButton.addEventListener('click', hideModal);

      let pokemonName = document.createElement('h2');
      pokemonName.innerText = item.name;
      let pokemonImage = document.createElement('img');
      pokemonImage.src = item.imageUrl;
      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText= 'Height: ' + item.height;
      let pokemonType = document.createElement('p');
      pokemonType.innerText= 'Type: ' + item.types + item.secondType;

      modal.appendChild(closeButton);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonImage);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonType);
      modalContainer.appendChild(modal);
    })
  };

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  };

  window.addEventListener('keydown', function(e) {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    hideModal: hideModal
  };
})();

//Uses forEach to write pokemon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
