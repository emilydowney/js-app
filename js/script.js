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
    let list = $('.pokemon-list');
    let listItem = $('<li></li>');
    let button = $('<button type="button" class="btn-light primary-button" data-toggle="modal" data-target="#exampleModal">' + pokemon.name + '</button>');
    listItem.addClass('group-list-item');
    listItem.append(button);
    list.append(listItem);
    //Shows details in modal upon click
    $(button).click(function() {
      showModal(pokemon);
    });
  };
  //Functions for loading message
  function loadMessage() {
    let message = document.querySelector('#message');
    let loadMessage = document.createElement('p');
    loadMessage.innerText = 'Information loading...'

    message.appendChild(loadMessage);
  }

  function removeMessage() {
    let message = document.querySelector('#message');
    message.classList.add('remove');
  }
  //Fetch and compile list of pokemon
  function loadList() {
    loadMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      removeMessage();
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
    loadMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      removeMessage();
      item.id = details.id;
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

  //Generates pokemon details in modal
  function showModal(item) {
    loadDetails(item).then(function() {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalContainer = $('#modal-container');
      modalContainer.addClass('is-visible');

      modalContainer.click(function(e) {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      modalTitle.empty();
      modalBody.empty();

      let pokemonName = $('<h2>' + item.name + '</h2>');
      let pokemonId = $('<p>#' + item.id + '</p>');
      let pokemonImage = $('<img class="modal-img" style="width: 50%">');
      pokemonImage.attr('src', item.imageUrl);
      let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');
      let pokemonType = $('<p>Type: ' + item.types + item.secondType + '</p>');


      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonId);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonType);
    })
  };
  //Function to hide modal
  function hideModal() {
    let modalContainer = $('#modal-container');
    modalContainer.removeClass('is-visible');
  };
  //Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

//Uses forEach to write pokemon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
