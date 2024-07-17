'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Statbar from '@/app/Components/statbar';

export default function Page({ params }) {
  const { id } = params;
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='flex h-screen sm:flex-row md:bg-black flex-col'>
      <div className='bg-pink-400 h-full flex items-center justify-center'>
        {pokemonData && (
            <div className='flex flex-col items-start'>
            <div className="w-[15rem] h-auto">
                <Image
                    src={pokemonData.sprites.other['official-artwork'].front_default}
                    alt={`Image of ${pokemonData.name}`}
                    height={500}
                    width={500}
                />
            </div>
            <div>
                <p className='capitalize pl-4 pr-4 w-full'>{pokemonData.name}</p>
            </div>
            <div>
                {pokemonData.stats.map((stat, index) => (
                    <Statbar key={index} percent={stat.base_stat} />
                ))}
            </div>
            </div>
        )}
      </div>
      <div className='bg-yellow-400 h-full flex flex-1'>
        {/* Other content in the yellow div */}
      </div>
    </div>
  );
}
