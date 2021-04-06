//Provides array of pokemon
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
  }
];

//Uses loop to write pokemon and height
for (var i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.6) {
      document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ' - Wow, that\'s big!)<br>')
  }  else {
    document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')<br>')
  }
}
