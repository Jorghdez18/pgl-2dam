
// Selecciona los elementos del HTML que utilizaremos en la aplicación
const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");

// Guarda los Pokémon cargados desde la API
let pokemons = [];

// Selecciona el filtro por tipo y los elementos de la ventana de detalles
const filtroTipo = document.querySelector("#filtro-tipo");
const ventanaDetalles = document.querySelector("#ventana-detalles");
const contenidoDetalles = document.querySelector("#contenido-detalles");
const cerrarDetalles = document.querySelector("#cerrar-detalles");

// Obtiene los datos de un Pokémon por su nombre o número mediante PokéAPI
const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;

  const respuesta = await fetch(url);

  // Comprueba si la petición se ha realizado correctamente
  if (!respuesta.ok) {
    throw new Error("No se ha podido cargar el Pokémon.");
  }

  // Convierte la respuesta JSON en un objeto Pokemon
  const datos = await respuesta.json();

  return new Pokemon(datos);
};

// Carga los primeros 151 Pokémon y los muestra en pantalla
const cargarPokemons = async () => {
  mensaje.textContent = "Cargando Pokémon...";
  resultado.innerHTML = "";
  pokemons = [];

  try {
    // Solicita a la API la lista los primeros 151 Pokémon
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );

    if (!respuesta.ok) {
      throw new Error("No se han podido cargar los Pokémon.");
    }

    const datos = await respuesta.json();

    // Obtiene los datos completos de cada Pokémon y los guarda en el array
    for (const pokemon of datos.results) {
      const pokemonCompleto = await obtenerPokemon(pokemon.name);
      pokemons.push(pokemonCompleto);
    }

    // Prepara el selector de tipos y muestra todas las tarjetas
    cargarTipos();
    mostrarPokemons(pokemons);

    mensaje.textContent = `Pokémon cargados: ${pokemons.length}`;
  } catch (error) {
    // Muestra un mensaje si falla la carga
    mensaje.textContent =
      "No se han podido cargar los Pokémon. Inténtalo de nuevo.";

    resultado.innerHTML = "";
  }
};

// Obtiene los tipos de los Pokémon cargados y los añade al selector
const cargarTipos = () => {
  const tipos = [];

  // Recorre los Pokémon para reunir sus tipos sin repetirlos
  for (const pokemon of pokemons) {
    for (const tipo of pokemon.tipos) {
      if (!tipos.includes(tipo)) {
        tipos.push(tipo);
      }
    }
  }

  // Ordena los tipos alfabéticamente
  tipos.sort();

  // Añade la opción para mostrar todos los Pokémon
  filtroTipo.innerHTML =
    '<option value="todos">Todos los tipos</option>';

  // Crea una opción para cada tipo encontrado
  for (const tipo of tipos) {
    filtroTipo.innerHTML += `
      <option value="${tipo}">${tipo}</option>
    `;
  }
};

// Crea el HTML de una tarjeta con los datos de un Pokémon
const crearTarjeta = (pokemon) => {
  // Crea las etiquetas HTML de sus tipos
  const tiposHTML = pokemon.tipos
    .map((tipo) => `
      <span class="tipo tipo--${tipo}">
        ${tipo}
      </span>
    `)
    .join("");

  // Devuelve la tarjeta con sus imágenes, datos y botón de detalles
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

      <button
        type="button"
        class="pokemon__boton-detalles"
      >
        VER DETALLES
      </button>
    </article>
  `;
};

// Muestra las tarjetas recibidas o un mensaje si no hay resultados
const mostrarPokemons = (lista) => {
  if (lista.length === 0) {
    resultado.innerHTML = "";
    mensaje.textContent = "No se han encontrado Pokémon.";
    return;
  }

  // Crea las tarjetas y las añade al contenedor de resultados
  resultado.innerHTML = lista
    .map((pokemon) => crearTarjeta(pokemon))
    .join("");
};

// Busca Pokémon por nombre, número o tipo y combina el filtro seleccionado
const buscarPokemons = () => {
  // Normaliza la búsqueda eliminando espacios externos y pasando a minúsculas
  const busqueda = inputBusqueda.value.trim().toLowerCase();
  const tipoSeleccionado = filtroTipo.value;

  // Filtra el array según el texto y el tipo seleccionado
  const resultados = pokemons.filter((pokemon) => {
    // Comprueba si coincide el nombre, el número o el tipo escrito
    const coincideNombre = pokemon.nombre.includes(busqueda);
    const coincideNumero = String(pokemon.id) === busqueda;
    const coincideTipoBusqueda = pokemon.tipos.includes(busqueda);

    // Comprueba si el Pokémon pertenece al tipo seleccionado
    const coincideFiltroTipo =
      tipoSeleccionado === "todos" ||
      pokemon.tipos.includes(tipoSeleccionado);

    // Acepta todos los Pokémon si la búsqueda está vacía;
    // en caso contrario, exije que coincida el texto y el filtro de tipo
    const coincideBusqueda =
      !busqueda ||
      coincideNombre ||
      coincideNumero ||
      coincideTipoBusqueda;

    return coincideBusqueda && coincideFiltroTipo;
  });

  // Actualiza las tarjetas con los resultados encontrados
  mostrarPokemons(resultados);

  // Muestra el número de coincidencias si hay resultados
  if (resultados.length > 0) {
    mensaje.textContent = `Pokémon encontrados: ${resultados.length}`;
  }
};

// Detecta los clics en los botones de detalles y abre la ventana del Pokémon
resultado.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".pokemon__boton-detalles");

  // No ahce nada si el clic no corresponde al botón de detalles
  if (!boton) {
    return;
  }

  // Localiza la tarjeta pulsada y obtiene su número
  const tarjeta = boton.closest(".pokemon");

  const numero = tarjeta
    .querySelector(".pokemon__numero")
    .textContent.replace("N.º ", "")
    .trim();

  // Busca en el array el Pokémon correspondiente a ese número
  const pokemon = pokemons.find(
    (pokemon) => pokemon.id === Number(numero)
  );

  if (!pokemon) {
    return;
  }


  // Crea el HTML de las seis estadísticas base
  const estadisticasHTML = pokemon.estadisticas
    .map((estadistica) => `
      <div class="dato">
        <span>
          ${estadistica.stat.name}
        </span>
        <strong>${estadistica.base_stat}</strong>
      </div>
    `)
    .join("");

  // Crea la lista de habilidades del Pokémon
  const habilidadesHTML = pokemon.habilidades
    .map((habilidad) => `<li>${habilidad}</li>`)
    .join("");

  // Muestra los datos ampliados dentro de la ventana de detalles
  contenidoDetalles.innerHTML = `
    <h2>${pokemon.nombre}</h2>

    <img
      class="pokemon__imagen-detalles"
      src="${pokemon.imagen}"
      alt="Imagen frontal de ${pokemon.nombre}"
    >

    <p><strong>Número:</strong> ${pokemon.id}</p>
    <p><strong>Tipos:</strong> ${pokemon.tipos.join(", ")}</p>
    <p><strong>Altura:</strong> ${pokemon.altura / 10} m</p>
    <p><strong>Peso:</strong> ${pokemon.peso / 10} kg</p>
    <p>
      <strong>Experiencia base:</strong>
      ${pokemon.experiencia ?? "No disponible"}
    </p>

    <h3>HABILIDADES</h3>
    <ul class="habilidades">
      ${habilidadesHTML}
    </ul>

    <h3>ESTADÍSTICAS BASE</h3>
    <div class="pokemon__estadisticas">
      ${estadisticasHTML}
    </div>
  `;

  // >Muestra la ventana de detalles por encima de las tarjetas
  ventanaDetalles.hidden = false;
  ventanaDetalles.style.display = "flex";
});

// Cierra la ventana de detalles al pulsar el botón de cerrar
cerrarDetalles.addEventListener("click", () => {
  ventanaDetalles.hidden = true;
  ventanaDetalles.style.display = "none";
});

// Cierra la ventana al pulsar sobre el fondo oscuro exterior
ventanaDetalles.addEventListener("click", (evento) => {
  if (evento.target === ventanaDetalles) {
    ventanaDetalles.hidden = true;
    ventanaDetalles.style.display = "none";
  }
});

// Evita que el formulario recargue la página y ejecuta la búsqueda
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  buscarPokemons();
});

// Actualiza los resultados cuando se cambia el tipo seleccionado
filtroTipo.addEventListener("change", () => {
  buscarPokemons();
});

// Carga los Pokémon automáticamente al abrir la aplicación
cargarPokemons();

