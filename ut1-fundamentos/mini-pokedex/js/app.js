const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");

let pokemons = [];

// Obtener los datos de un Pokémon
const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se ha podido cargar el Pokémon.");
  }

  const datos = await respuesta.json();

  return new Pokemon(datos);
};

// Cargar todos los Pokémon
const cargarPokemons = async () => {
  mensaje.textContent = "Cargando Pokémon...";
  resultado.innerHTML = "";

  try {
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=2000" //He puesto un límite de 2000 para pedir una cantidad suficientemente grande de Pokémon y poder mostrar todos los disponibles en la API
    );

    if (!respuesta.ok) {
      throw new Error();
    }

    const datos = await respuesta.json();

    for (const pokemon of datos.results) {
      const pokemonCompleto = await obtenerPokemon(pokemon.name);

      pokemons.push(pokemonCompleto);
    }

    mostrarPokemons(pokemons);

    mensaje.textContent = `Pokémon cargados: ${pokemons.length}`;
  } catch (error) {
    mensaje.textContent =
      "No se han podido cargar los Pokémon. Inténtalo de nuevo.";

    resultado.innerHTML = "";
  }
};

// Crear HTML de una tarjeta
const crearTarjeta = (pokemon) => {
  const tiposHTML = pokemon.tipos
    .map((tipo) => `
      <span class="tipo tipo--${tipo}">
        ${tipo}
      </span>
    `)
    .join("");

  return `
    <article class="pokemon">

      <div class="pokemon__numero">
        N.º ${pokemon.id}
      </div>

      <div class="pokemon__imagen-contenedor">

        <img
          class="pokemon__imagen pokemon__imagen--espalda"
          src="${pokemon.imagenEspalda}"
          alt="Imagen trasera de ${pokemon.nombre}"
        >

        <img
          class="pokemon__imagen pokemon__imagen--frente"
          src="${pokemon.imagen}"
          alt="Imagen frontal de ${pokemon.nombre}"
        >

      </div>

      <h2 class="pokemon__nombre">
        ${pokemon.nombre}
      </h2>

      <div class="pokemon__tipos">
        ${tiposHTML}
      </div>

      <div class="pokemon__datos">

        <div class="dato">
          <span>PS</span>
          <strong>${pokemon.ps}</strong>
        </div>

        <div class="dato">
          <span>Altura</span>
          <strong>${pokemon.altura / 10} m</strong>
        </div>

        <div class="dato">
          <span>Peso</span>
          <strong>${pokemon.peso / 10} kg</strong>
        </div>

      </div>

    </article>
  `;
};

// Mostrar una lista de Pokémon
const mostrarPokemons = (lista) => {

  if (lista.length === 0) {
    resultado.innerHTML = "";
    mensaje.textContent = "No se han encontrado Pokémon.";
    return;
  }

  resultado.innerHTML = lista
    .map((pokemon) => crearTarjeta(pokemon))
    .join("");
};

// Buscar Pokémon
const buscarPokemons = () => {

  const busqueda = inputBusqueda.value.trim().toLowerCase();

  if (!busqueda) {
    mostrarPokemons(pokemons);
    mensaje.textContent = `Pokémon cargados: ${pokemons.length}`;
    return;
  }

  const resultados = pokemons.filter((pokemon) => {

    const coincideNombre = pokemon.nombre.includes(busqueda);

    const coincideNumero =
      String(pokemon.id) === busqueda;

    return coincideNombre || coincideNumero;
  });

  mostrarPokemons(resultados);

  if (resultados.length > 0) {
    mensaje.textContent = `Pokémon encontrados: ${resultados.length}`;
  }
};

// Buscar al pulsar el botón
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  buscarPokemons();
});

// Buscar mientras escribimos
inputBusqueda.addEventListener("input", () => {
  buscarPokemons();
});

// Cargar Pokémon al abrir la página
cargarPokemons();