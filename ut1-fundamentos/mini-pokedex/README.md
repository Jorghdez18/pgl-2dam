# Actividad final: desarrollo de una Pokédex con JavaScript

En esta actividad ampliaremos la mini-Pokédex desarrollada en la guía de la práctica Pre-pokédex hasta convertirla en una Pokédex más completa.

La aplicación consultará información real de Pokémon mediante PokéAPI y generará su contenido dinámicamente con JavaScript.

---

## 1. Punto de partida

Primeramente hemos desarrollado una mini-Pokédex, en la cual se encuentra la base sobre la que vamos a realizar una versión mejorada.

Esta mini-Pokédex tiene de momento:

* Una barra de búsqueda en la cual podemos introducir el número o el nombre de un Pokémon.
* Al buscar un Pokémon aparecen su número, nombre, peso, altura y tipo.
* La Pokédex se conecta a una API que contiene información sobre los Pokémon.
* Los datos obtenidos de la API se muestran dinámicamente en la página.

### Estructura inicial de carpetas y archivos

![Estructura inicial](assets/img/tree.png)

### Aplicación funcionando

![Aplicación funcionando](assets/img/capturaFuncionamiento.png)

### Búsqueda de un Pokémon

![Búsqueda de un Pokémon](assets/img/capturaBusqueda.png)

### Gestión de un Pokémon inexistente o de otro error controlado

![Error controlado](assets/img/error.png)

### Código utilizado para obtener un Pokémon

Una de las partes principales de la mini-Pokédex es la función que realiza la petición a PokéAPI:

```js
const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se ha podido cargar el Pokémon.");
  }

  const datos = await respuesta.json();

  return new Pokemon(datos);
};
```

### Explicación

La función `obtenerPokemon` recibe como parámetro el nombre o número del Pokémon que queremos buscar.

Se utiliza `fetch` para realizar una petición a PokéAPI. Después se comprueba si la respuesta ha sido correcta.

Si la respuesta no es correcta, se produce un error.

Si todo funciona correctamente, los datos se convierten en un objeto de la clase `Pokemon`.

### Código de la búsqueda

La búsqueda inicial utilizaba el formulario de la página:

```js
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  buscarPokemons();
});
```

Con esto conseguimos que al pulsar el botón de búsqueda se ejecute la función correspondiente sin recargar la página.

### Funcionalidad inicial

La aplicación permite buscar un Pokémon utilizando su nombre o número.

Los datos se obtienen mediante una petición a PokéAPI y posteriormente se muestran en la página.

También se controla el caso de que el Pokémon buscado no exista, mostrando un mensaje de error en lugar de dejar la aplicación bloqueada.

### Commit del punto de partida

> **Pendiente:** añadir aquí el enlace o identificador del commit correspondiente al punto de partida.

---

# 2. Carga de la colección de Pokémon

En esta fase se amplió la aplicación para poder cargar una colección de Pokémon desde PokéAPI.

En lugar de pedir solamente un Pokémon cuando el usuario realiza una búsqueda, la aplicación obtiene primero una colección y la guarda en un array.

### Array de Pokémon

Para guardar los Pokémon utilizamos:

```js
let pokemons = [];
```

Este array se utilizará posteriormente para mostrar, buscar y filtrar los Pokémon sin tener que realizar una nueva petición a la API cada vez.

### Carga de Pokémon

La función utilizada para cargar la colección es:

```js
const cargarPokemons = async () => {
  mensaje.textContent = "Cargando Pokémon...";
  resultado.innerHTML = "";

  try {
    const respuesta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
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
```

### Explicación

Primero se muestra el mensaje `Cargando Pokémon...`.

Después se realiza una petición a PokéAPI para obtener una cantidad grande de Pokémon.

Se ha utilizado:

```text
limit=2000
```

para no limitar la aplicación solamente a los 151 Pokémon de la primera generación y poder cargar todos los Pokémon disponibles actualmente dentro de ese límite.

La API devuelve una lista de resultados. Después se recorre esa lista y se obtiene la información completa de cada Pokémon.

Cada Pokémon se guarda en el array `pokemons`.

Finalmente se muestran todos los Pokémon en la página.

### Gestión de errores

La carga se encuentra dentro de un `try/catch`.

Si ocurre algún problema, se muestra un mensaje comprensible:

```js
catch (error) {
  mensaje.textContent =
    "No se han podido cargar los Pokémon. Inténtalo de nuevo.";

  resultado.innerHTML = "";
}
```

De esta forma el usuario no recibe directamente un mensaje técnico de JavaScript.

### Clase Pokemon

Para organizar los datos obtenidos de la API se creó el archivo:

```text
js/Pokemon.js
```

En él se encuentra la clase `Pokemon`.

Una parte de la clase es:

```js
class Pokemon {
  constructor(datos) {
    this.id = datos.id;
    this.nombre = datos.name;

    this.imagen = datos.sprites.front_default;
    this.imagenShiny = datos.sprites.front_shiny;

    this.imagenEspalda = datos.sprites.back_default;
    this.imagenEspaldaShiny = datos.sprites.back_shiny;

    this.altura = datos.height;
    this.peso = datos.weight;

    this.tipos = datos.types.map((tipo) => tipo.type.name);

    this.habilidades = datos.abilities.map(
      (habilidad) => habilidad.ability.name
    );

    this.ps = datos.stats.find(
      (estadistica) => estadistica.stat.name === "hp"
    ).base_stat;

    this.experiencia = datos.base_experience;

    this.estadisticas = datos.stats;
  }
}
```

### Explicación de la clase

La clase `Pokemon` sirve para guardar solamente los datos que necesitamos utilizar en nuestra aplicación.

Por ejemplo:

```js
this.id = datos.id;
this.nombre = datos.name;
```

guardan el número y el nombre.

También se guardan las imágenes:

```js
this.imagen = datos.sprites.front_default;
this.imagenEspalda = datos.sprites.back_default;
```

La API proporciona la altura y el peso en unas unidades diferentes a las que mostramos en pantalla. Por eso posteriormente se realiza la conversión.

### Captura de la carga

![Carga de Pokémon](assets/img/carga.png)

> **Pendiente:** añadir captura cuando esta parte esté terminada y comprobada.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 3. Creación de las tarjetas de Pokémon

Después de obtener los datos de los Pokémon, se crean las tarjetas mediante JavaScript.

Cada tarjeta muestra:

* Número de Pokédex.
* Nombre.
* Imagen.
* Tipo o tipos.
* PS.
* Altura.
* Peso.

### Creación de una tarjeta

La función utilizada para crear una tarjeta es:

```js
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
```

### Mostrar las tarjetas

Una vez creadas las tarjetas, se muestran dentro del elemento `resultado`:

```js
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
```

Esta función recibe una lista de Pokémon y crea una tarjeta para cada uno.

Si la lista está vacía, se muestra un mensaje indicando que no se han encontrado Pokémon.

### Altura y peso

PokéAPI proporciona la altura y el peso en unidades diferentes a las que queremos mostrar.

Por eso realizamos la conversión:

```js
${pokemon.altura / 10} m
```

y:

```js
${pokemon.peso / 10} kg
```

### Sprite trasero y delantero

Cada tarjeta contiene las dos imágenes:

```html
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
```

Inicialmente se muestra la imagen trasera.

Cuando el cursor pasa por encima de la tarjeta, mediante CSS se oculta la imagen trasera y se muestra la frontal.

```css
.pokemon__imagen--frente {
  display: none;
}

.pokemon:hover .pokemon__imagen--espalda {
  display: none;
}

.pokemon:hover .pokemon__imagen--frente {
  display: block;
}
```

No se realiza una nueva petición a la API cuando se pasa el ratón por encima, porque las dos imágenes ya se habían obtenido anteriormente.

### Captura de las tarjetas

![Tarjetas de Pokémon](assets/img/tarjetas.png)

> **Pendiente:** añadir captura cuando esta parte esté terminada.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 4. Búsqueda de Pokémon

En esta fase se mejoró el sistema de búsqueda para trabajar directamente con la colección que ya se había cargado.

Una de las ventajas de cargar primero los Pokémon es que las búsquedas posteriores son más rápidas porque se realizan sobre el array `pokemons`.

### Código de búsqueda

```js
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
```

### Explicación

Primero se obtiene el contenido del buscador:

```js
const busqueda = inputBusqueda.value.trim().toLowerCase();
```

`trim()` permite eliminar espacios sobrantes y `toLowerCase()` permite que la búsqueda no dependa de utilizar mayúsculas o minúsculas.

Después se recorren los Pokémon que ya tenemos guardados y se comprueba si coincide el nombre o el número.

Para el nombre se utiliza:

```js
pokemon.nombre.includes(busqueda)
```

Esto permite realizar búsquedas por fragmentos.

Por ejemplo:

```text
char
```

puede encontrar Pokémon cuyo nombre contenga esa parte.

Para el número se comprueba que sea exactamente igual:

```js
String(pokemon.id) === busqueda
```

### Buscar mientras escribimos

Además del botón de búsqueda, los resultados se actualizan mientras escribimos:

```js
inputBusqueda.addEventListener("input", () => {
  buscarPokemons();
});
```

De esta forma no es necesario realizar una nueva petición a PokéAPI cada vez que se escribe una letra.

### Buscar con Enter

El formulario también permite realizar la búsqueda pulsando Enter:

```js
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  buscarPokemons();
});
```

### Búsqueda vacía

Si el usuario borra todo el contenido del buscador, vuelven a aparecer todos los Pokémon:

```js
if (!busqueda) {
  mostrarPokemons(pokemons);
  mensaje.textContent = `Pokémon cargados: ${pokemons.length}`;
  return;
}
```

### Captura

![Búsqueda](assets/img/capturaBusqueda.png)

> **Pendiente:** comprobar y actualizar la captura cuando la versión final esté terminada.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 5. Filtros por tipo

En esta fase se añadirá un selector para poder filtrar los Pokémon según su tipo.

El selector tendrá una opción para mostrar todos los Pokémon y diferentes opciones obtenidas a partir de los datos cargados.

La búsqueda por nombre o número y el filtro por tipo deberán funcionar conjuntamente.

### Código

> **Pendiente:** añadir el código cuando se implemente esta parte.

### Funcionamiento

El usuario podrá:

* Mostrar todos los Pokémon.
* Seleccionar un tipo.
* Buscar un Pokémon y aplicar un tipo al mismo tiempo.
* Ver un mensaje si no existe ningún resultado.

### Captura

![Filtros](assets/img/filtros.png)

> **Pendiente:** añadir captura cuando esta parte esté terminada.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 6. Detalles de un Pokémon

Cada tarjeta tendrá un botón `Ver detalles`.

Al pulsarlo se mostrará información más completa sin necesidad de recargar la página.

Los detalles mostrarán:

* Nombre.
* Número.
* Imagen frontal.
* Tipos.
* Altura.
* Peso.
* Experiencia base.
* Habilidades.
* PS.
* Ataque.
* Defensa.
* Ataque especial.
* Defensa especial.
* Velocidad.

### Código

> **Pendiente:** añadir el código cuando se implemente esta parte.

### Captura

![Detalles](assets/img/detalles.png)

> **Pendiente:** añadir captura cuando esta parte esté terminada.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 7. Estados y gestión de errores

La aplicación tendrá diferentes estados para informar al usuario de lo que está ocurriendo.

Los estados principales serán:

* Preparado.
* Cargando.
* Cargado.
* Sin resultados.
* Error.

### Estado de carga

Durante la carga se muestra:

```js
mensaje.textContent = "Cargando Pokémon...";
```

### Estado sin resultados

Cuando no se encuentra ningún Pokémon:

```js
if (lista.length === 0) {
  resultado.innerHTML = "";
  mensaje.textContent = "No se han encontrado Pokémon.";
  return;
}
```

### Estado de error

Si existe un problema al cargar los datos:

```js
catch (error) {
  mensaje.textContent =
    "No se han podido cargar los Pokémon. Inténtalo de nuevo.";

  resultado.innerHTML = "";
}
```

Los mensajes están pensados para que el usuario pueda entender qué ha ocurrido sin tener que conocer los detalles técnicos de JavaScript o de la API.

### Commit

> **Pendiente:** añadir enlace o identificador del commit.

---

# 8. Diseño responsive

La aplicación debe poder utilizarse tanto en ordenador como en dispositivos con pantallas pequeñas.

Para ello se utiliza CSS Grid para organizar las tarjetas:

```css
.resultado {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
```

También se utiliza una media query para adaptar el diseño a pantallas pequeñas:

```css
@media (max-width: 480px) {
  .resultado {
    grid-template-columns: 1fr;
  }

  .buscador__controles {
    flex-direction: column;
  }

  .buscador button {
    width: 100%;
  }
}
```

De esta manera, en pantallas pequeñas las tarjetas pasan a ocupar una columna y los controles del buscador se colocan uno debajo de otro.

### Captura

![Diseño responsive](assets/img/responsive.png)

> **Pendiente:** añadir captura de la versión móvil.

---

# 9. Pruebas realizadas

Para comprobar que la aplicación funciona correctamente se realizarán diferentes pruebas.

| Prueba                         | Resultado esperado                     | Resultado |
| ------------------------------ | -------------------------------------- | --------- |
| Abrir la aplicación            | La página carga correctamente          | ⬜         |
| Cargar Pokémon                 | Aparecen los Pokémon                   | ⬜         |
| Buscar `pikachu`               | Aparece Pikachu                        | ⬜         |
| Buscar `25`                    | Aparece el Pokémon número 25           | ⬜         |
| Buscar `char`                  | Aparecen Pokémon que coinciden         | ⬜         |
| Buscar un Pokémon inexistente  | Aparece mensaje de no resultados       | ⬜         |
| Borrar la búsqueda             | Vuelven a aparecer todos               | ⬜         |
| Filtrar por tipo               | Aparecen Pokémon del tipo seleccionado | ⬜         |
| Combinar búsqueda y tipo       | Se aplican ambos filtros               | ⬜         |
| Pasar el ratón por una tarjeta | Cambia al sprite frontal               | ⬜         |
| Quitar el ratón                | Vuelve al sprite trasero               | ⬜         |
| Abrir detalles                 | Aparece la información completa        | ⬜         |
| Cerrar detalles                | El panel se cierra correctamente       | ⬜         |
| Pantalla pequeña               | La aplicación se adapta                | ⬜         |
| Error de conexión              | Aparece un mensaje comprensible        | ⬜         |
| Consola del navegador          | No aparecen errores de JavaScript      | ⬜         |

---

# 10. Estructura final del proyecto

La estructura final del proyecto será:

```text
pokedex/
├── index.html
├── README.md
├── assets/
│   ├── images/
│   └── img/
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── Pokemon.js
```

### Descripción de los archivos

* `index.html`: contiene la estructura principal de la página.
* `style.css`: contiene los estilos y el diseño responsive.
* `app.js`: contiene la lógica principal de la aplicación.
* `Pokemon.js`: contiene la clase utilizada para representar los datos necesarios de cada Pokémon.
* `README.md`: contiene la documentación del desarrollo del proyecto.
* `assets/img/`: contiene las capturas utilizadas en la documentación.

---

# 11. Tecnologías utilizadas

Para realizar el proyecto se han utilizado:

* HTML5.
* CSS3.
* JavaScript.
* PokéAPI.
* Visual Studio Code.
* Git.
* GitHub.

No se han utilizado frameworks ni librerías externas de JavaScript.

---

# 12. Historial de commits

Durante el desarrollo se realizarán varios commits para poder ver la evolución del proyecto.

| Fase              | Descripción                               | Commit    |
| ----------------- | ----------------------------------------- | --------- |
| Punto de partida  | Estado inicial de la mini-Pokédex         | Pendiente |
| Carga de datos    | Carga de la colección de Pokémon          | Pendiente |
| Tarjetas          | Creación y diseño de las tarjetas         | Pendiente |
| Búsqueda          | Búsqueda por nombre, fragmento y número   | Pendiente |
| Filtros           | Filtros por tipo y combinación de filtros | Pendiente |
| Detalles          | Panel de información detallada            | Pendiente |
| Estados y errores | Gestión de estados y errores              | Pendiente |
| Responsive        | Adaptación a diferentes pantallas         | Pendiente |
| Revisión final    | Últimas correcciones y mejoras            | Pendiente |

---

# 13. Conclusiones

Con esta actividad se ha ampliado la mini-Pokédex inicial utilizando JavaScript para trabajar con datos obtenidos desde una API.

Durante el desarrollo se ha trabajado con peticiones a una API, arrays, objetos, clases, eventos, búsqueda, filtros, generación dinámica de HTML y gestión de errores.

También se ha mejorado el diseño de la aplicación para que sea más completa y pueda utilizarse en diferentes tamaños de pantalla.

> **Pendiente:** completar esta sección al finalizar el proyecto con una valoración personal del desarrollo, las dificultades encontradas y lo aprendido durante la actividad.

