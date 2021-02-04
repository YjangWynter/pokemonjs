const axios = require('axios');
//URL for pokemon API's list of all pokemon from the Unova region
const pokedex = 'https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156/';

// retrieves a list of objects containing all the urls for the Unova Pokedex
async function getPokemon() {
    //console.log("Entered 1st funciton");
    return result = await axios({
        method: "get",
        url: pokedex
    }).then(response => response.data.results).catch((error) => console.log(`Error #1: ${error}`));
};
//     axios(pokemon).then((response) => format(response.data)).catch((error) => console.log(`Error #2: ${error}`));

//selects a random url to read the pokemon's data
const url = getPokemon().then((res) => {
    let rand_url = randomPokemon(res);
    //console.log(`URL: ${rand_url}`)
    return rand_url
});

//fetches url then uses takes the response 
async function printPokemon(url) {
    let pokemon = await url;
    return axios(pokemon).then((response) => format(response.data)).catch((error) => console.log(`Error #2: ${error}`));
}
printPokemon(url)
function format(pokemon) {
    //formatting the name of the pokemon to capitalize the first letter
    let name = capitalize(pokemon.name)
    //set a random move
    let move = randomMove(pokemon);
    //print to the console the pokemon's name and id and its random move
    console.log(`Pokemon #${pokemon.id}, ${name}, used ${move}!`);
}

function randomMove(pokemon) {
    //generate a random number
    let move_num = Math.floor((Math.random() * pokemon.moves.length) + 1);
    //select the move with move number
    let move_name = pokemon.moves[move_num].move.name;
    //capitalize the move name
    let move = capitalize(move_name);
    //return move
    return move;
}

function randomPokemon(pokedex) {
    let num = Math.floor((Math.random() * 156) + 1);
    let pokemon = pokedex[num].url;
    return pokemon
}
function capitalize(name){
    let cap_name = name.charAt(0).toUpperCase() + name.slice(1);
    return cap_name;
}