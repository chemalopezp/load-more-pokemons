// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import React, { useEffect, useState } from "react";

const fetchPokemons = async (limit, offset) => {
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchPokemons().then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="header">Pokemon List</h1>
      <div id="content"></div>
      {loading && <div>Loading...</div>}
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <button>Load More</button>
    </div>
  );
};

export default PokemonList;
