
## Preguntas a responder de Axios:
### 1. ¿Cómo se importa Axios en un archivo TypeScript?
Se importa utilizando la sintaxis estándar de módulos de ES6 en la parte superior de tu archivo de TypeScript:

```typescript
import axios from 'axios';
```

---

### 2. ¿Cómo se solicita información con una petición GET?
Utilizas el método `axios.get()`, pasándole como argumento la **URL** de la API a la que quieres consultar:

```typescript
axios.get('https://ejemplo.com');
```

---

### 3. ¿Qué devuelve Axios y dónde están los datos de la respuesta?
Axios devuelve una **Promesa** que, al resolverse, entrega un **objeto de respuesta**. Los datos estructurados que envía el servidor se encuentran específicamente dentro de la propiedad **`.data`** de ese objeto devuelto.

---

### 4. Conceptos de Asincronía
* **Operación asíncrona:** Es una tarea que se ejecuta en segundo plano y **no bloquea** el hilo principal del programa. El código sigue ejecutándose sin esperar a que la tarea termine (por ejemplo, mientras esperas que los juegos terminen de descargarse del servidor).
* **Promesa:** Es un objeto que representa el **resultado futuro** de una operación asíncrona, el cual puede completarse con éxito (resuelta) o fallar (rechazada).
* **`async`:** Palabra clave que se coloca antes de una función para indicar que manejará tareas asíncronas y que **siempre devolverá una promesa**.
* **`await`:** Palabra clave que **pausa la ejecución** de la función `async` hasta que la promesa se resuelva, permitiendo escribir código asíncrono limpio que se lee como si fuera síncrono.

---

### 5. ¿Cómo puede React guardar los datos recibidos y actualizar la página?
React utiliza el Hook **`useState`**. Al guardar el array de videojuegos usando la función actualizadora del estado, React detecta automáticamente el cambio de datos y **vuelve a renderizar (actualizar) la vista** en el navegador.

```tsx
const [juegos, setJuegos] = useState<Videojuego[]>([]);
// Para guardar los datos: setJuegos(respuesta.data);
```

---

### 6. ¿Cómo se inicia una operación externa cuando se muestra un componente?
Se utiliza el Hook **`useEffect`** configurado con un **array de dependencias vacío `[]`**. Esto le indica a React que debe ejecutar la petición HTTP **solo una vez**, justo cuando el componente se monta e introduce por primera vez en la pantalla.

```tsx
useEffect(() => {
  // Aquí se invoca la función encargada de hacer la petición con Axios
}, []);
```

---

### 7. ¿Cómo se recorre una lista para mostrar un elemento por videojuego?
Se utiliza el método **`.map()`** de JavaScript dentro del código JSX de React. Es un requisito obligatorio asignar una propiedad **`key` única** (normalmente el ID del videojuego) al elemento contenedor raíz de cada ítem de la lista.

```tsx
{juegos.map((juego) => (
  <div key={juego.id}>
    <h3>{juego.titulo}</h3>
  </div>
))}
```

---

### 8. Tipo de TypeScript para los videojuegos (Interface)
Basándonos en la estructura estándar de un formato JSON de videojuegos, la definición del tipo en TypeScript mediante una **`interface`** se modela de la siguiente manera:

```typescript
export interface Videojuego {
  id: number;
  titulo: string;
  genero: string;
  plataforma: string;
  precio: number;
  lanzamiento?: string; // Propiedad opcional
}
```

---

### 9. ¿Cómo puedes limitar la cantidad de juegos que muestras?
Existen dos formas principales de limitar el volumen de datos mostrados:

* **En el Frontend (JavaScript):** Aplicando el método **`.slice()`** al array antes de iterarlo con el `.map()`. Por ejemplo, para mostrar únicamente los 5 primeros elementos:
  ```tsx
  juegos.slice(0, 5).map(juego => (...))
  ```
* **En el Backend (API):** Añadiendo un parámetro de control (como `_limit` o `limit`) directamente en los parámetros de la **URL de la petición de Axios**, siendo esta la opción más eficiente en rendimiento:
  ```typescript
  axios.get('https://ejemplo.com?_limit=5');
  ```
