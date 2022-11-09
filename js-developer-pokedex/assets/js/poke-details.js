for (let i = 0; i < pokemonList.length; i++) {
    console.log(pokemonList[i]);
}

function getPokemon(pokemonName) {

    var idPokemonString = document.getElementById(`${pokemonName.id}`).querySelectorAll('.number')[0].innerHTML;

    var idPokemonSplit = idPokemonString.split('');

    var idPokemon = '';

    idPokemonSplit.forEach(element => {
        idPokemon = '';
        if (element > 0) {
            idPokemon += element;
        }
    });

    const pokeName = document.querySelector('.pokemon.' + pokemonName.id);
    document.getElementById('pokemon-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`;
}