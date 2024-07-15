import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function ListPokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const typeGradients = {
    normal: "radial-gradient(#ffffff, #b8a038)",
    fire: "radial-gradient(#ffffff, #e04000)",
    water: "radial-gradient(#ffffff, #4870f0)",
    electric: "radial-gradient(#ffffff, #f8c000)",
    grass: "radial-gradient(#ffffff, #488030)",
    ice: "radial-gradient(#ffffff, #68a8a8)",
    fighting: "radial-gradient(#ffffff, #a02018)",
    poison: "radial-gradient(#ffffff, #703070)",
    ground: "radial-gradient(#ffffff, #d0b058)",
    flying: "radial-gradient(#ffffff, #7880e0)",
    psychic: "radial-gradient(#ffffff, #f03870)",
    bug: "radial-gradient(#ffffff, #889810)",
    rock: "radial-gradient(#ffffff, #887028)",
    ghost: "radial-gradient(#ffffff, #504878)",
    dragon: "radial-gradient(#ffffff, #5028d8)",
    dark: "radial-gradient(#ffffff, #504838)",
    steel: "radial-gradient(#ffffff, #9898b0)",
    fairy: "radial-gradient(#ffffff, #e098a8)",
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      const data = [];
      for (let i = 0; i < 18; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${offset + i + 1}`);
        const pokemon = await response.json();
        data.push(pokemon);
      }
      setPokemonData(prevData => {
        const newPokemonData = [...prevData, ...data];
        const uniquePokemonData = Array.from(new Set(newPokemonData.map(pokemon => pokemon.id)))
          .map(id => newPokemonData.find(pokemon => pokemon.id === id));
        return uniquePokemonData;
      });
      setLoading(false);
    };

    fetchPokemonData();
  }, [offset]);

  const handleShowMore = () => {
    setOffset(prevOffset => prevOffset + 20);
  };

  return (
    <div className='grid h-full flex-1 p-4 place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-all'>
      {pokemonData.map(pokemon => {
        const gradient = pokemon.types && typeGradients[pokemon.types[0].type.name];
        return (
          <div key={pokemon.id} style={{ backgroundImage: gradient }} className='flex flex-col p-2 min-w-[6rem] rounded gap-4 max-w-[6rem] justify-center select-none cursor-pointer'>
            <Image
              className='scale-[150%] sm:scale-[180%]'
              alt={pokemon.name}
              src={pokemon.sprites.other['official-artwork'].front_default}
              height={500}
              width={500}
              quality={0}
              priority
            />
            <div className='flex justify-center z-10 pt-5'>
              <p className='text-white capitalize' style={{ textShadow: '0rem 0rem .4rem rgb(0,0,0,.800)' }}>{pokemon.name}</p>
            </div>
          </div>
        );
      })}
      <div className='absolute bottom-0'>
        <button className='absolute bottom-4 bg-[rgb(41,41,41)] p-2 rounded text-white text-nowrap z-10' onClick={handleShowMore} disabled={loading}>
            {loading ? 'Loading...' : 'Show More'}
        </button>
      </div>
    </div>
  );
}

export default ListPokemon;
