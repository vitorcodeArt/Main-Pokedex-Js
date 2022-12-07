const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const background = ".background"


const maxRecords = 649
const limit = 50
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="${pokemon.id}" class="pokemon ${pokemon.type}" onclick="getPokemon(${pokemon.id})">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif"
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



        /*------- Manipulação Html na section de caracteristicas -------*/

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

function convertDetail(pokemon, specie) {
    return `
    <div class="background ${pokemon.type}">
        <span class="return" onclick="voltar()">⟵</span>
        <div id="all-details" class="details-basic">
             <div class="division">
                 <div class="name-type">
                     <span class="name">${pokemon.name}</span>
                     <ol class="types">
                     ${pokemon.types.map((type) => `<li class="type ${type.name}">${type}</li>`).join('')}
                     </ol>
                 </div>
                 <div class="number-pokemon">
                     <span class="number">${pokemon.number}</span>
                 </div>
             </div>
             </div>
             <div class="details-avanced">
             <span class="pokemon-img">
                 <img id="pokemon-img" class="poke-img" src="${pokemon.photo}" alt="${pokemon.name}">
             </span>
                 <ul class="informations">
                     <li id="click-about" class="information select" onclick="about()">About</li>
                     <li id="click-stats" class="information" onclick="stats(${pokemon.id})">Base Stats</li>
                 </ul>
                 <div class="info-about">
                     <ul class="info-pokemon-left">
                         <li>Base exp.</li>
                         <li>Height</li>
                         <li>Weight</li>
                         <li>Abilities</li>
                         <li><h4>Breeding</h4></li>
                         <li>Gender</li>
                         <li>Egg groups</li>
                         <li>Capture rate</li>
                     </ul>
                     <ul class="info-pokemon-right">
                         <li id="base_experience" class="info-right">${pokemon.base_experience}</li>
                         <li id="height" class="info-right">(${(pokemon.height) * (10)
                        })cm</li>
                         <li id="weight" class="info-right">${((pokemon.weight / 10) * 2.205).toFixed(1)} lbs (${(pokemon.weight) / (10)})kg</li>
                         <li id="abilities" class="info-right">
                            <ul class="ulSloties">
                                ${pokemon.abilities.map((ability) => `<li class="liSlot ${ability.name}">${ability}</li>`).join('')}
                            </ul>
                         </li>
                         <li class="info-right"><h4>.</h4></li>
                         <li class="info-right">
                             <ul class="gender">
                                 <li><img class="img-gender" src="imgs/sexo-masculino.png" alt="simbolo do gênero masculino">  ${specie.male}</li>
                                 <li><img class="img-gender" src="imgs/sexo-feminino.png" alt="simbolo do gênero feminino"> ${specie.female}</li>
                             </ul>
                             </li class="info-right">
                             <li  id="egg-groups" class="info-right">
                                <ul class="ulSloties">
                                ${specie.egg_groups.map((group) => `<li id="egg_group" class="liSlot">${group}</li>`).join('')}
                                </ul>
                             </li>
                         <li  id="capture_rate" class="info-right">${specie.capture_rate}</li>
                     </ul>
                 </div>
                 <div class="info-base-stats">
                     <div class="grid-conteiner">
                         <ul class="info-pokemon-left">
                             <li>HP</li>
                             <li>Attack</li>
                             <li>Defense</li>
                             <li>Sp. Atk</li>
                             <li>Sp. Def</li>
                             <li>Speed</li>
                             <li>Total</li>
                         </ul>
                         <ul id="info-stats" class="info-pokemon-right">
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.hp}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="hp"></i></li>
                             </ul>
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.atk}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="atk"></i></li>
                             </ul>
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.def}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="def"></i></li>
                             </ul>
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.sp_atk}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="sp-atk"></i></li>
                             </ul>
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.sp_def}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="sp-def"></i></li>
                             </ul>
                             <ul class="stats-progess">
                                 <li class="info-right">${pokemon.speed}</li>
                                 <li class="progess-bar"><i class="${pokemon.type}" id="speed"></i></li>
                             </ul>
                            <ul class="stats-progess">
                                <li class="info-right">${pokemon.total}</li>
                                <li class="progess-bar"><i class="${pokemon.type}" id="total"></i></li>
                            </ul>
                                             </ul>
                     </div>
                    <div class="div-curiosity">
                        <h3 class="curiosity">Curiosity</h3>
                        <p class="curiosity text">${specie.flavor_text_entries}</p>
                    </div>
                </div>
            </div>
        </div>

    `
}


