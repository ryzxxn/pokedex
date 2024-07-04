'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatBar from './stat_bar';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
      const pokemon = response.data;
      const id = pokemon.id.toString().padStart(3, '0');
      pokemon.image = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id}.png`;
      setPokemonData(pokemon);
    };

    fetchPokemonData();
  }, [currentId]);

  const handleNext = () => {
    setCurrentId((prevId) => prevId + 1);
  };

  const handlePrev = () => {
    if (currentId === 1) {
      return;
    }
  
    setCurrentId((prevId) => prevId - 1);
  };
  

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', }}>
      <div style={{ display: 'flex',  justifyContent: 'space-between', padding: '1rem 2rem'}}>
        <button onClick={handlePrev}><IoIosArrowBack style={{color: 'white', fontSize: '2rem'}} /></button>
        <button onClick={handleNext}><IoIosArrowForward style={{color: 'white', fontSize: '2rem'}} /></button>
      </div>
      <div style={{display: 'flex', width: '100%', padding: '0rem 2rem'}}>
        <div key={pokemonData.id} style={{ display: 'flex', flex: '1', flexDirection: 'column'}}>
          <h1 style={{color: 'white', fontSize: '2rem'}}>{pokemonData.name.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {pokemonData.types.map((type) => {
              const typeColors = {
                normal: '#A8A878',
                fire: '#F08030',
                water: '#6890F0',
                grass: '#78C850',
                flying: '#A890F0',
                fighting: '#C03028',
                poison: '#A040A0',
                electric: '#F8D030',
                ground: '#E0C068',
                rock: '#B8A038',
                psychic: '#F85888',
                ice: '#98D8D8',
                bug: '#A8B820',
                ghost: '#705898',
                steel: '#B8B8D0',
                dragon: '#7038F8',
                dark: '#705848',
                fairy: '#F0B6BC',
              };

              return (
                <p
                  className='capitalize'
                  key={type.type.name}
                  style={{
                    display: 'inline-block',
                    color: typeColors[type.type.name]
                  }}
                >
                  {type.type.name}
                </p>
              );
            })}
          </div>
          <p style={{color: 'white'}}>Weight: {pokemonData.weight} lbs</p>
          <p style={{ color: 'white' }}>Height: {pokemonData.height}0 cm</p>
          <Image 
            src={pokemonData.image} // Path to your image
            alt="Example Image"
            quality={0}
            width={500} // Desired width of the image
            height={300} // Desired height of the image
          />
        </div>

        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', padding: '0rem 2rem', justifyContent: 'start'}}>
          {pokemonData.stats.map((stat) => (
                <div key={stat.stat.name} style={{color: 'white'}}>
                  {stat.stat.name.toUpperCase()} {stat.base_stat}
                  <StatBar percent={(stat.base_stat / 255) * 100} />
                </div>
              ))}
              <Link href={`/pokemon/${pokemonData.id}`}>
                <p style={{color: 'white', border: '.2rem solid white', width: 'max-content', padding: '.3rem .4rem', borderRadius: '.5rem', margin: '1rem 0rem'}}>View More</p>
              </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default PokemonList;
