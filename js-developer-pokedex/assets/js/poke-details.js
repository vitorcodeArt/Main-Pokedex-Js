const pokeApiClick = {}

function getPokemon(pokemonName) {
    
    var pokemonName = document.getElementById(`${pokemonName.id}`)
    const caracteristicas = document.querySelector('.caracteristicas')

    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.id}`
    
    console.log(pokemonName);

    fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody)
    .then((pokemon) => {
        fetch(pokemon.species.url).then((res) => res.json())
        .then((detailRequests) => Promise.all([detailRequests]))
        .then((speciesDetails) => {
            console.log(speciesDetails);
        })
        caracteristicas.innerHTML = convertDetail(pokemon)
    })
    .catch((error) => console.log(error))   
    
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.id}/`)
    .then((r) => r.json())
    .then((jsonBody) => jsonBody)
    .then((species) => species)
    

        /* -----------  Manipulação CSS Jquery  -----------*/
    
    
    $("body").addClass("body-click")
    $(".caracteristicas").css("display", "block")
    $(".pokemons").addClass("pokemons-click")
    
    if (window.matchMedia("(max-width:575px)").matches) {
        $("body").addClass("body-click")
        $(".content").css("display", "none")
      } else if (window.matchMedia("(max-width:991px)").matches) {
        $("body").addClass("body-click")
        $(".content").css("display", "block")
        $(".pokemons").addClass("pokemons-click")
      }
    }

function voltar() {
    if (window.matchMedia("(max-width:575px)").matches) {
        $("body").removeClass("body-click")
        $(".caracteristicas").css("display", "none")
        $(".background").css("width", "50%")
        $(".content").css("display", "block")
      }
}

function voltar() {
    if (window.matchMedia("(max-width:991px)").matches) {
        $("body").removeClass("body-click")
        $(".caracteristicas").css("display", "none")
        $(".background").css("width", "50%")
        $(".content").css("display", "block")
      }
}

function voltar() {
    if (window.matchMedia("(max-width: 2020px)").matches) {
        $("body").removeClass("body-click")
        $(".caracteristicas").css("display", "none")
        $(".content").css("display", "block")
        $(".pokemons").removeClass("pokemons-click")
      }
}
    window.addEventListener('resize', function () {
        //var altura = window.innerHeight;
        var largura = window.innerWidth;
    
        if (largura > 575)  {
            $(".content").css("display", "block")   
    
        } 
    });