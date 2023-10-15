import { useState, useEffect } from "react";

const Pokemon = ({ pokemon }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [pokemonType, setPokemonType] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.sprites.front_default);
        setPokemonType(data.types[0].type.name);
      })
      .catch((error) => console.error("Error fetching Pokemon data:", error));
  }, [pokemon.name]);
  return (
    <div className="pokemon">
      <span >ID: #0{pokemon.id}</span>
      {imageUrl && <img src={imageUrl} alt={pokemon.name} />}
      <div className="name-and-type">
      <span className="name">{pokemon.name}</span>
      <span className="type">Type: {pokemonType}</span>
      </div>

    </div>
  );
};
export default Pokemon;
