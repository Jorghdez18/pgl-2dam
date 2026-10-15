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
  return (
    <main className="app">
      <h1>GameShelf</h1>
      <p>Mi catálogo de videojuegos</p>
      <section className="catalog">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            genre={game.genre}
            price={game.price}
            available={game.available}
          />
        ))}
      </section>
    </main>
  );
}

export default App;