import Pokemon from "./Pokemon";

const PokemonList = ({ pokemons, currentPage }) => {
  return (
    <div className="container">
      {pokemons.map((pokemon) => (
        <Pokemon key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
