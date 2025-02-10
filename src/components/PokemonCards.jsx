import React from 'react'

const PokemonCards = ({pokemondata}) => {
  return (
    <li className='border-4 h-[450px] w-[300px] flex flex-col items-center bg-pink-700'>
        <figure >
            <img src={pokemondata.sprites.other.dream_world.front_default} alt={pokemondata.name} className='h-[200px]'/>
        </figure>
        <h1 className='font-bold text-2xl pt-4'> {pokemondata.name} </h1>
        <div>
            <p className='border-3 bg-green-600 text-white p-2 mt-4 rounded-2xl'>
                {
                    pokemondata.types.map((curType)=>curType.type.name).join(", ")
                }
            </p>
        </div>
        <div className='w-full flex justify-around mt-4'>
            <p>
                <span>Height:</span>{pokemondata.height}
            </p>
            <p>
                <span>Weight:</span>{pokemondata.weight}
            </p>
            <p>
                <span>Speed:</span>{pokemondata.stats[5].base_stat}
            </p>
        </div>
        <div className='w-[260px] flex justify-between pt-4 py-2'>
            <div>
                <p> {pokemondata.base_experience} </p>
                <span>Experience:</span>
            </div>
            <div>
                <p> {pokemondata.stats[1].base_stat} </p>
                <span>Attack:</span>
            </div>
            <div>
                <p> {pokemondata.abilities
                    .map((abilityInfo)=>abilityInfo.ability.name)
                    .slice(0, 1)
                    .join(", ")
                    } </p>
                <span>Abilities:</span>
            </div>
        </div>
    </li>
  )
}

export default PokemonCards