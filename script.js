const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let anteriorBtn = document.getElementById('pokemon-anterior');
let siguienteBtn = document.getElementById('pokemon-siguiente');
let formBusqueda = document.getElementById('formulario-pokemon')
let barraBusqueda = document.getElementById('pokemon-busqueda');
let fotoPokemon = document.getElementById('foto-pokedex');
let pokemonShiny = document.getElementById('shiny-check');
let pokemonNombre = document.getElementById('display-nombre');
let pokedexEncender = document.getElementById('pokedex-encender');
let idPokemonActual;

function primeraLetraMayuscula(palabra) {
    var palabra;
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

// Encender y apagar la Pokedex //

pokedexEncender.addEventListener('click', () => {
    let opcionShiny = pokemonShiny.checked;
    if (!pokedexEncender.classList.contains('bi-circle-fill-apagar')) {
        pokedexEncender.classList.add('bi-circle-fill-apagar')
        barraBusqueda.disabled = false;
        if (opcionShiny) {
            mostrarPokemonShiny(1)
            siguienteBtn.disabled = false;
            anteriorBtn.disabled = false;
        } else {
            mostrarPokemon(1)
            siguienteBtn.disabled = false;
            anteriorBtn.disabled = false;
        }
    } else {
        pokedexEncender.classList.remove('bi-circle-fill-apagar')
        fotoPokemon.setAttribute('src', '')
        pokemonNombre.innerHTML = '';
        barraBusqueda.disabled = true;
        siguienteBtn.disabled = true;
        anteriorBtn.disabled = true;
    }
})

// Fetch Pokemon //

async function fetchPokemon(pokemon) {
    let resultado = await fetch(POKEMON_URL + `${pokemon}`);
    const dataPokemon = await resultado.json();
    idPokemonActual = dataPokemon.id;
    return dataPokemon
}

fetchPokemon(1)

// Mostrar data del Pokemon //

async function mostrarPokemon(pokemon) {
    const data = await fetchPokemon(pokemon);
    let versionNormal = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    fotoPokemon.setAttribute('src', versionNormal);
    pokemonNombre.innerHTML = `#` + data.id.toString().padStart(3, 0) + ` ` + primeraLetraMayuscula(data.name);
}

// Mostrar data del Pokemon Shiny //

async function mostrarPokemonShiny(pokemon) {
    const data = await fetchPokemon(pokemon);
    let versionShiny = data.sprites.versions['generation-v']['black-white'].animated.front_shiny;
    fotoPokemon.setAttribute('src', versionShiny);
    pokemonNombre.innerHTML = `#` + data.id.toString().padStart(3, 0) + ` ` + primeraLetraMayuscula(data.name);
}

// Cambiar el placeholder cuando se activa la busqueda shiny //

function avisarShiny() {
    let opcionShiny = pokemonShiny.checked;
    if (opcionShiny) {
        barraBusqueda.placeholder = 'Opción shiny activada';
        setTimeout(() => {
            barraBusqueda.placeholder = 'Ingrese el Pokemon';
        }, 2000);
    } else if (!opcionShiny) {
        barraBusqueda.placeholder = 'Opción shiny desactivada';
        setTimeout(() => {
            barraBusqueda.placeholder = 'Ingrese el Pokemon';
        }, 2000);
    }
}

// Escucha de evento para modificar el placeholder cuando se activa/desactiva la busqueda Shiny //

pokemonShiny.addEventListener('click', avisarShiny)

// Buscar Pokemon //

formBusqueda.addEventListener('submit', (e) => {
    let busqueda = barraBusqueda.value.toLowerCase();
    let opcionShiny = pokemonShiny.checked;
    e.preventDefault();
    if (busqueda && opcionShiny) {
        mostrarPokemonShiny(busqueda)
    } else {
        mostrarPokemon(busqueda)
    }
})

// Cargar siguiente Pokemon //

siguienteBtn.addEventListener('click', () => {
    let opcionShiny = pokemonShiny.checked;
    if (opcionShiny) {
        mostrarPokemonShiny(idPokemonActual + 1);
    } else {
        mostrarPokemon(idPokemonActual + 1);
    }
})

// Cargar anterior Pokemon //

anteriorBtn.addEventListener('click', () => {
    let opcionShiny = pokemonShiny.checked;
    if (idPokemonActual === 1) {
        if (opcionShiny) {
            mostrarPokemonShiny(1)
        } else {
            mostrarPokemon(1)
        }
    } else if (opcionShiny) {
        mostrarPokemonShiny(idPokemonActual - 1);
    } else {
        mostrarPokemon(idPokemonActual - 1);
    }
})