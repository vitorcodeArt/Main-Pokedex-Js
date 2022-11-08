for(let i = 0; i < pokemonList.length; i++) {
    console.log(pokemonList[i]);
}

function getPokemon() {   
    
    const pokeName = document.querySelectorAll('.pokemon');
    console.log(pokeName);

    pokeName.forEach(element => console.log(element.id));

    
}