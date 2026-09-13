const pokemonContainer = document.getElementsByClassName('pokeContainer');
pokemonCount = 1025
colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);

}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = mainTypes.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    pokemonEl.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modalContent').style.backgroundColor = color;
        document.getElementById('modalBody').innerHTML = `
        ...
    `;
    });

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    pokemonEl.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modalBody').innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <div><small class="type">Type: <span>${type}</span></small></div>
            <div><small class="height">Height: <span>${pokemon.height}</span></small></div>
            <div><small class="weight">Weight: <span>${pokemon.weight}</span></small></div>
            <div><small class="base-experience">Base Experience: <span>${pokemon.base_experience}</span></small></div>
        </div>
    `;
    });
    pokemonContainer[0].appendChild(pokemonEl);
}
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
fetchPokemons();