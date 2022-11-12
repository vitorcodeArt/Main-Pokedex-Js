const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const background = ".background"


const maxRecords = 386
const limit = 50
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.name}" class="pokemon ${pokemon.name} ${pokemon.type}" onclick="getPokemon(${pokemon.name})">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type.name}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})






                // Manipulação Html section caracteristicas

function convertTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertNum(num, pokeId) {
    if (num.length < 2) {
        num = `#00${pokeId}`
    } else if (num.length < 3) {
        num = `#0${pokeId}`
    } else if (num.length < 4) {
        num = `#${pokeId}`
    }
    return num
}

function convertAbility(pokemonAbilities) {
    return pokemonAbilities.map((abilitySlot) => `<li class="ability">${abilitySlot.ability.name}</li>`)
}


function convertDetail(pokemon) {
    return `
    <div class="background ${pokemon.types[0].type.name}">
        <span class="return" onclick="voltar()">⟵</span>
        <div id="all-details" class="details-basic">
             <div class="division">
                 <div class="name-type">
                     <span class="name">${pokemon.name}</span>
                     <ol class="types">
                     ${convertTypes(pokemon.types).join('')}
                     </ol>
                 </div>
                 <div class="number-pokemon">
                     <span class="number">${convertNum(pokemon.id.toString().split(''), pokemon.id)}</span>
                 </div>
             </div>
         </div>
             <span class="pokemon-img">
                 <img id="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="bulbasaur">
             </span>
             <div class="details-avanced">
                 <ul class="informations">
                     <li class="information select">About</li>
                     <li class="information">Base Stats</li>
                     <li class="information">Evolution</li>
                     <li class="information">Moves</li>
                 </ul>
                 <div class="info-about">
                     <ul class="info-pokemon-left">
                         <li>Species</li>
                         <li>Height</li>
                         <li>Weight</li>
                         <li>Abilities</li>
                         <li><h4>Breeding</h4></li>
                         <li>Gender</li>
                         <li>Egg groups</li>
                         <li>Egg cycle</li>
                     </ul>
                     <ul class="info-pokemon-right">
                         <li id="species" class="info-right">${pokemon}</li>
                         <li id="height" class="info-right">(${(pokemon.height) * (10)
                        })cm</li>
                         <li id="weight" class="info-right">${((pokemon.weight / 10) * 2.205).toFixed(1)} lbs (${(pokemon.weight) / (10)})kg</li>
                         <li id="species" class="info-right">
                            <ul class="abilities">
                            ${convertAbility(pokemon.abilities).join('')}
                            </ul>
                         </li>
                         <li class="info-right"><h4>.</h4></li>
                         <li class="info-right">
                             <ul class="gender">
                                 <li>87.5%</li>
                                 <li>12.5%</li>
                             </ul>
                             </li class="info-right">
                             <li  id="egg-groups" class="info-right">${pokemon}</li>
                         <li  id="egg-cycle" class="info-right">Grass</li>
                     </ul>
                 </div>
             </div>
    </div>

    `
}


