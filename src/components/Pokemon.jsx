import React, { useState } from 'react'
import { useEffect } from 'react';
import PokemonCards from './PokemonCards';


const Pokemon = () => {
    const [pokemon, setpokemon] = useState([]);
    const [loading, setloading] = useState(true);
    const [error,seterror] = useState(null);
    const [search, setsearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  const fetchPokemon = async() => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const detailedpokemondata = data.results.map(async(curPokemon)=>{
                // console.log(curPokemon.url);
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });
            // console.log(detailedpokemondata);

            const detailResponse = await Promise.all(detailedpokemondata);
            // console.log(detailResponse);
            setpokemon(detailResponse);
            setloading(false);

        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error);
        }
  }
  useEffect(() => {
    fetchPokemon();
  }, []);

//   search functionality

const searchdata = pokemon.filter((curpokemon)=>curpokemon.name.toLowerCase().includes(search.toLowerCase()))
  
  if(loading){
    return <div>
        <h1>loadong.....</h1>
    </div>
  }
  if(error){
    return <div>
        <h1>{error.message}</h1>
    </div>
  }

  return (
    <div className=' '>
        <section className='flex flex-col items-center  h-screen p-4'>
            <header>
                <h1 className='text-white font-bold text-3xl'>Lets Catch Pokemon</h1>
            </header>
            <div className='pt-3 '>
                <input type="text" placeholder='Search Pokemon' value={search} 
                onChange={(e)=>setsearch(e.target.value)}
                className='w-[300px] sm:w-[400px] border-red-500 h-[50px] rounded-2xl border-3 border-b-5 placeholder-gray-500 text-xl outline-none'
                />
            </div>
            <div className='w-full h-full'>
                <ul className=' h-full w-full flex justify-around items-center flex-wrap p-4 gap-6'>
                    {
                        searchdata.map((curPokemon)=>{
                            return <PokemonCards key={curPokemon.id} pokemondata = {curPokemon} />
                        })
                    }
                </ul>
            </div>
        </section>
    </div>
  )
}

export default Pokemon