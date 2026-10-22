import axios from "axios";
import { useEffect, useState } from "react";
import GameCard from "./components/GameCard";
import "./App.css";
import type { Game } from "./types/Game";

const API_URL = "https://api.sampleapis.com/switch/games";

function App (){
  const [games, setGames] = useState<Game[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function loadGames() {
      try {
        const response = await axios.get<Game[]> (API_URL);
        setGames(response.data)
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar el catalogo, vuelva a intentarlo mas tarde")
      }finally{
        setLoading(false);
      }
    }
    loadGames();
  })

  return(
    <main className="app">
      <h1>GameShelf</h1>
      <p>Videojuegos recibidos desde la API</p>

      {loading && <p role="status">Cargando Videojuegos</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && games.length > 0 && (
        <section className="catalog">
          {games.map((game) => (
              <GameCard key ={game.id} game = {game} />
          )
          )}
        </section>
      )}

    </main>
  )
}

export default App;
