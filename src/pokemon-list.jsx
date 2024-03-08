// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonsCount, setPokemonsCount] = useState(0);
  const [nextCallUrl, setNextCallUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
  );

  const fetchPokemons = async (limit, offset) => {
    try {
      const response = await fetch(nextCallUrl);
      const data = await response.json();
      setLoading(false);
      setPokemons(pokemons.concat(data.results));
      setPokemonsCount(data.count);
      setNextCallUrl(data.next);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemons().then((data) => {});
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
      <p>
        Displaying {pokemons.length} of {pokemonsCount} results
      </p>
      {pokemons.length !== pokemonsCount ? (
        <button onClick={fetchPokemons}>Load more</button>
      ) : null}
    </div>
  );
};

export default PokemonList;
