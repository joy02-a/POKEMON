import React, { useState, useEffect } from 'react';
import PokemonCards from './PokemonCards';


const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [offset, setOffset] = useState(0);
    const limit = 8;

    const fetchPokemon = async () => {
        try {
            const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
            const res = await fetch(API);
            const data = await res.json();
            
            const detailedPokemonData = await Promise.all(
                data.results.map(async (curPokemon) => {
                    const res = await fetch(curPokemon.url);
                    return res.json();
                })
            );

            setPokemon(detailedPokemonData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [offset]); 

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <h1 className='text-white flex justify-center text-6xl'>Loading...</h1>;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }

    return (
        <div>
            <section className='flex flex-col items-center h-screen p-4'>
                <header>
                    <h1 className='text-white font-bold text-3xl'>Let's Catch Pokemon</h1>
                </header>

                <div className='pt-3'>
                    <input 
                        type="text" 
                        placeholder='Search Pokemon' 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-[300px] sm:w-[400px] h-[50px] rounded-2xl border-3 border-red-500 text-xl outline-none text-white placeholder-gray-500'
                    />
                </div>

                <div className="flex gap-4 mt-4 w-[400px] justify-between">
                    <button 
                        onClick={() => setOffset((prev) => Math.max(0, prev - limit))} 
                        disabled={offset === 0} 
                        className="bg-red-500 px-4 py-2 rounded disabled:opacity-50 text-white font-bold text-2xl w-[130px]"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setOffset((prev) => prev + limit)} 
                        className="bg-red-500 px-4 py-2 rounded text-white font-bold text-2xl w-[130px] "
                    >
                        Next
                    </button>
                </div>

                
                <div className='w-full h-full'>
                    <ul className='h-full w-full flex justify-around items-center flex-wrap p-4 gap-6'>
                        {searchData.map((curPokemon) => (
                            <PokemonCards key={curPokemon.id} pokemondata={curPokemon} />
                        ))}
                    </ul>
                </div>
                
            </section>
        </div>
    );
};

export default Pokemon;
