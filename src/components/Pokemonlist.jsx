import React, { useState, useEffect } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`${API_URL}?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, [offset]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon.name.toUpperCase()}</li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={() => setOffset(offset + limit)} className="bg-gray-300 px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
