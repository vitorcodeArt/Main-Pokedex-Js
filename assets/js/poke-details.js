const pokeApiClick = {}

function convertPokeApiRequests(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.id = pokeDetail.id

    pokemon.number = convertNum(pokeDetail.id.toString().split(''), pokeDetail.id)
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.species = pokeDetail.species.url

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    
    pokemon.base_experience = pokeDetail.base_experience

    pokemon.hp = pokeDetail.stats[0]['base_stat']
    pokemon.atk = pokeDetail.stats[1]['base_stat']
    pokemon.def = pokeDetail.stats[2]['base_stat']
    pokemon.sp_atk = pokeDetail.stats[3]['base_stat']
    pokemon.sp_def = pokeDetail.stats[4]['base_stat']
    pokemon.speed = pokeDetail.stats[5]['base_stat']

    const total = pokemon.hp +
                  pokemon.atk +
                  pokemon.def + 
                  pokemon.sp_atk + 
                  pokemon.sp_def + 
                  pokemon.speed
    
    pokemon.total = total

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

function convertSpeciesRequests(species) {
    const specie = new Specie()

    const egg_groups = species.egg_groups.map((groupSlot) => groupSlot.name)
    specie.egg_groups = egg_groups
       
    specie.gender_rate = species.gender_rate  
    let male = (numRate) => {
        let male = ''
        if (numRate == 0) {
            male = '100%'
        } else if (numRate == 1){
            male = '87,5%'
        } else if (numRate == 2){
            male = '75%'
        } else if (numRate == 3){
            male = '66%'
        } else if (numRate == 4){
            male = '50%'
        } else if (numRate == 5){
            male = '33%'
        } else if (numRate == 6){
            male = '25%'
        } else if (numRate == 7){
            male = '12,5%'
        } else if (numRate == 8){
            male = '0%'
        }
        return male
    }
    specie.male = male(species.gender_rate)

    let female = (numRate) => {
        let female = ''
        if (numRate == 0) {
            female = '0%'
        } else if (numRate == 1){
            female = '12,5%'
        } else if (numRate == 2){
            female = '35%'
        } else if (numRate == 3){
            female = '33%'
        } else if (numRate == 4){
            female = '50%'
        } else if (numRate == 5){
            female = '66%'
        } else if (numRate == 6){
            female = '75%'
        } else if (numRate == 7){
            female = '87,5%'
        } else if (numRate == 8){
            female = '100%'
        }
        return female
    }
    specie.female = female(species.gender_rate)

    specie.capture_rate = species.capture_rate

    specie.flavor_text_entries = species.flavor_text_entries[15].flavor_text


    return specie
}


function getPokemon(pokemonName) {

    const caracteristicas = document.querySelector('.caracteristicas')
   
    var pokemonName = document.getElementById(`${pokemonName}`)
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.id}`
       

/* ------------- Requisição ao clique -----------*/ 


fetch(url)
.then((response) => response.json())
.then((jsonBody) => jsonBody)
.then(convertPokeApiRequests)
.then((pokemon) => {
    fetch(pokemon.species).then((res) => res.json())
    .then((detailRequests) => Promise.all([detailRequests]))
    .then((specieRequest) => specieRequest[0])
    .then(convertSpeciesRequests)
    .then((specie) => {
        caracteristicas.innerHTML = convertDetail(pokemon, specie)
    })
.catch((error) => console.log(error)) 
})  
    
    /* ------------------------------------------------- */
    

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
    

function about() {
    $(".info-base-stats").css("display", "none")
$(".info-about").css("display", "grid")
$("#click-stats").removeClass("select")
$("#click-about").addClass("select")
}
function stats(pokemonName) {
    var pokemonName = document.getElementById(`${pokemonName}`)
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.id}`
    
    fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody)
    .then(convertPokeApiRequests)
    .then((pokemon) => {
        $("#hp").animate({ width: `${pokemon.hp / 2}%`}, "slow");
    $("#atk").animate({ width: `${pokemon.atk / 2}%`}, "slow");
    $("#def").animate({ width: `${pokemon.def / 2}%`}, "slow");
    $("#sp-atk").animate({ width: `${pokemon.sp_atk / 2}%`}, "slow");
    $("#sp-def").animate({ width: `${pokemon.sp_def / 2}%`}, "slow");
    $("#speed").animate({ width: `${pokemon.speed / 2}%`}, "slow");
    $("#total").animate({ width: `${pokemon.total / 10}%`}, "slow");
        })
    .catch((error) => console.log(error)) 


    $(".info-base-stats").css("display", "block")
    $(".info-about").css("display", "none")
    $("#click-about").removeClass("select")
    $("#click-stats").addClass("select") 
    

}



    window.addEventListener('resize', function () {
        var largura = window.innerWidth;
    
        if (largura > 575)  {
            $(".content").css("display", "block")   
        } 
    });