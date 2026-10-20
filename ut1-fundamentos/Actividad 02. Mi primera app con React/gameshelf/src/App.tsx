
// src/App.tsx
import { useState } from "react";
import "./App.css";
import GameCard from "./components/GameCard";

type Game = {
  id: number;
  title: string;
  genre: string;
  price: number;
  available: boolean;
};

const games: Game[] = [
  { id: 1, title: "Hollow Knight", genre: "Aventura", price: 14.99, available: true },
  { id: 2, title: "Celeste", genre: "Plataformas", price: 19.99, available: true },
  { id: 3, title: "Stardew Valley", genre: "Simulación", price: 13.99, available: false },
  { id: 4, title: "Fornite", genre: "Acción", price: 17.99, available: false },
  { id: 5, title: "Pokemon Zafiro Alfa", genre: "Aventura", price: 23.88, available: true },
  { id: 6, title: "Pokémon Rubí Omega", genre: "Aventura", price: 24.99, available: true },
  { id: 7, title: "Pokémon Escarlata", genre: "Aventura", price: 45.50, available: true },
  { id: 8, title: "Pokémon Púrpura", genre: "Aventura", price: 45.50, available: false },
  { id: 9, title: "The Legend of Zelda: Tears of the Kingdom", genre: "Aventura", price: 59.99, available: true },
  { id: 10, title: "Super Mario Bros. Wonder", genre: "Plataformas", price: 49.99, available: true },
  { id: 11, title: "Elden Ring", genre: "Acción RPG", price: 39.95, available: true },
  { id: 12, title: "Minecraft", genre: "Sandbox", price: 29.99, available: true },
  { id: 13, title: "Animal Crossing: New Horizons", genre: "Simulación", price: 44.99, available: false },
  { id: 14, title: "Mario Kart 8 Deluxe", genre: "Carreras", price: 47.85, available: true },
  { id: 15, title: "Cyberpunk 2077", genre: "Acción RPG", price: 19.99, available: true },
  { id: 16, title: "Grand Theft Auto V", genre: "Acción", price: 14.99, available: true },
];

function App() {
  // 1. Estados lógicos para controlar los botones de filtrado
  const [verSoloDisponibles, setVerSoloDisponibles] = useState<boolean>(false);
  const [verSoloEconomicos, setVerSoloEconomicos] = useState<boolean>(false);

  // 2. Lógica combinada que filtra el catálogo en tiempo real
  const juegosFiltrados = games.filter((game) => {
    if (verSoloDisponibles && !game.available) {
      return false; // Descarta los agotados si el filtro está encendido
    }
    if (verSoloEconomicos && game.price >= 15) {
      return false; // Descarta los de 15€ o más si el filtro está encendido
    }
    return true; // Conserva el juego si pasa los filtros activos
  });

  return (
    <main className="app">
      <h1>GameShelf</h1>
      <p className="subtitle">Mi catálogo de videojuegos</p>

      {/* 3. Panel de control con los botones de filtrado interactivos */}
      <section className="filter-panel">
        <button
          className={`filter-btn ${verSoloDisponibles ? "active" : ""}`}
          onClick={() => setVerSoloDisponibles(!verSoloDisponibles)}
        >
          {verSoloDisponibles ? "Mostrar Todos" : "Ver Solo Disponibles"}
        </button>

        <button
          className={`filter-btn ${verSoloEconomicos ? "active" : ""}`}
          onClick={() => setVerSoloEconomicos(!verSoloEconomicos)}
        >
          {verSoloEconomicos ? "Todos los Precios" : "Ofertas (Menos de 15 €)"}
        </button>
      </section>

      {/* 4. Contador dinámico que se actualiza al filtrar */}
      <div className="counter-display">
        Mostrando <strong>{juegosFiltrados.length}</strong> de {games.length} videojuegos
      </div>

      {/* 5. Renderizado adaptativo de la cuadrícula */}
      <section className="catalog">
        {juegosFiltrados.length > 0 ? (
          juegosFiltrados.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              price={game.price}
              available={game.available}
            />
          ))
        ) : (
          <p className="no-results">No hay videojuegos que coincidan con la búsqueda.</p>
        )}
      </section>
    </main>
  );
}

export default App;
