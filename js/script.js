/* eslint-env jquery */
/* eslint-disable no-console */
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
  }}

  //Returns list of pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    //Creates buttons for each pokemon
    let list = $('.pokemon-list');
    let listItem = $('<li></li>');
    let button = $('<button type="button" class="btn-light main-button" data-toggle="modal" data-target="#exampleModal">' + pokemon.name + '</button>');
    listItem.addClass('group-list-item');
    listItem.append(button);
    list.append(listItem);
    //Shows details in modal upon click
    $(button).click(function() {
      showModal(pokemon);
    });
  }
  //Functions for loading message
  function loadMessage() {
    let message = $('#message');
    let loadMessage = $('<p>Information loading...</p>');

    message.append(loadMessage);
  }

  function removeMessage() {
    let message = $('#message');
    message.addClass('remove');
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
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  //Gets details from each pokemon url
  function loadDetails(item) {
    loadMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      removeMessage();
      item.id = details.id;
      item.imageUrl = details.sprites.other['official-artwork'].front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
      if (details.types.length === 2) {
        item.secondType = ', ' + details.types[1].type.name;
      } else item.secondType = '';
    }).catch(function (e) {
      console.error(e);
    })
  }
  //Generates pokemon details in modal
  function showModal(item) {
    loadDetails(item).then(function() {
      let modalBody = $('.modal-body');
      let modalBodyInfo = $('.modal-bodyinfo');
      let modalTitle = $('.modal-title');
      let modalContainer = $('#modal-container');
      modalContainer.addClass('is-visible');

      modalTitle.empty();
      modalBody.empty();
      modalBodyInfo.empty();

      let pokemonName = $('<h2>' + item.name + '</h2>');
      let pokemonId = $('<p>#' + item.id + '</p>');
      pokemonId.addClass('id');
      let pokemonImage = $('<img class="modal-img" style="width: 50%">');
      pokemonImage.attr('src', item.imageUrl);
      let pokemonHeight = $('<p>' + '<h7>Height</h7>: ' + item.height + '</p>');
      let pokemonType = $('<p><h7>Type</h7>: ' + item.types + item.secondType + '</p>');

      modalTitle.append(pokemonId);
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBodyInfo.append(pokemonHeight);
      modalBodyInfo.append(pokemonType);
    })
  }

  function pokemonSearch() {
      $(document).ready(function() {
        $('#search').on('keyup', function() {
          let value = $(this).val().toUpperCase();
          $('.pokemon-list').filter(function() {
            $(this).toggle($(this).text().toUpperCase().indexOf(value) > -1)
          });
        });
      });
    }

  //Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    pokemonSearch: pokemonSearch
  };
})();

//Uses forEach to write pokemon
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
