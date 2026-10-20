

---

## 🛠️ Explicación Técnica del Sistema de Filtros Combinados

Para dar respuesta a los requisitos y al reto final de la actividad, se ha implementado una arquitectura basada en el flujo de datos unidireccional de React y la inmutabilidad de los arrays en JavaScript.

### 1. Gestión del Estado Dinámico con `useState`
En lugar de manipular directamente el árbol de elementos del DOM (enfoque heredado de Vanilla JavaScript), la aplicación delega el control de la interfaz en dos variables de estado booleanas administradas por el Hook `useState`:
* `verSoloDisponibles`: Controla si el usuario desea restringir la vista a productos con existencias en stock (`true` o `false`).
* `verSoloEconomicos`: Gestiona la activación del filtro de ofertas para videojuegos con un precio inferior a 15 € (`true` o `false`).

Cada vez que el usuario interactúa con uno de los botones, se ejecuta su respectiva función actualizadora (`setVerSoloDisponibles` o `setVerSoloEconomicos`), invirtiendo el valor lógico anterior mediante el operador de negación `!`. Esto desencadena de forma inmediata un **nuevo ciclo de renderizado (re-render)** en el componente `App`.

### 2. Algoritmo de Filtrado Acumulativo
Para evitar la pérdida de los datos originales, el array de datos principal `games` se mantiene intacto e inmutable. En cada renderizado, la aplicación genera un array derivado en tiempo real llamado `juegosFiltrados` aplicando el método predictivo `.filter()`:

```typescript
const juegosFiltrados = games.filter((game) => {
  if (verSoloDisponibles && !game.available) {
    return false; // Excluye los juegos agotados si el filtro de disponibilidad está activo
  }
  if (verSoloEconomicos && game.price >= 15) {
    return false; // Excluye los juegos costosos si el filtro de ofertas está activo
  }
  return true; // Conserva el juego si supera con éxito ambos criterios
});
```

Este enfoque permite combinar ambos filtros de manera simultánea. Por ejemplo, si activas ambos botones a la vez, la aplicación mostrará única y exclusivamente los videojuegos que estén **disponibles Y que además cuesten menos de 15 €** (como *Hollow Knight* o *Grand Theft Auto V*).

### 3. Inyección y Renderizado Seguro en la Interfaz (JSX)
Finalmente, evaluamos la longitud del array resultante mediante un operador ternario. Si existen juegos que cumplan los criterios seleccionados, realizamos una iteración mediante el método `.map()`, transformando cada objeto de datos en una instancia del componente reutilizable `<GameCard />` y asignando la propiedad obligatoria `key={game.id}` para la optimización de reconciliación del Virtual DOM de React. En caso de que el array esté vacío, se inyecta dinámicamente un bloque de contingencia avisando que no hay resultados disponibles.
