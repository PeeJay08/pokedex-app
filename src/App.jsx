/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

  const fetchPokemons = (page) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`)
      .then((response) => {
        if (!response.ok || response.status !== 200) {
          throw new Error("Server did not respond correctly");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data structure is an array of objects with 'id' and 'name' properties.
        const pokemonData = data.results.map((pokemon, index) => ({
          id: (page - 1) * 20 + index + 1,
          name: pokemon.name,
        }));
  
        setPokemons(pokemonData);
        setTotalPages(Math.ceil(data.count / 20));
      })
      .catch((err) => {
        alert(`You have an error ${err.message}`);
      });
  };


  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const loadPage = (page) => {
    setCurrentPage(page);
  };

  const pagesToShow = 5; // Number of page buttons to display
  const pageButtons = [];

  // Calculate which page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => loadPage(i)}
        className={i === currentPage ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className="pokemon-container">
      <h1>PoKéDeX</h1>
      <PokemonList pokemons={pokemons} />
      <div className="pagination">
        <button onClick={() => loadPage(prevPage)}>Previous</button>
        {pageButtons}
        <button onClick={() => loadPage(nextPage)}>Next</button>
      </div>
    </div>
  );
}

export default App;
