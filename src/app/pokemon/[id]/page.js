'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Statbar from '@/app/Components/statbar';
import { MdOutlineHeight } from "react-icons/md";
import { FaWeightScale } from "react-icons/fa6";

export default function Page({ params }) {
  const { id } = params;
  const [pokemonData, setPokemonData] = useState(null);
  const [paddedID, setpaddedID] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data);
        setpaddedID(data.id.toString().padStart(3, '0'))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemonData) {
    return <></>
  }

  return (
    <div className=' bg-black flex flex-col h-screen sm:flex-col md:flex-row lg:flex-row'>
      <div className='h-full flex justify-center'>
        {pokemonData && (
            <div className='flex flex-col w-full min-w-28'>
              <div className='flex justify-between' style={{padding: "0rem 2rem"}}>
                  <h1 className='capitalize text-white text-left text-[2rem]'>{pokemonData.name}</h1>
                  <h1 className='capitalize text-gray-500 text-left text-[2rem] font-mono'>#{paddedID}</h1>
              </div>

              <div className='w-full flex flex-col text-white' style={{padding: "0rem 2rem"}}>
                <p className='flex items-center text-[.9rem] gap-4'><MdOutlineHeight className='text-[1.2rem]'/>{pokemonData.height}0 cm</p>
                <p className='flex items-center text-[.9rem] gap-4'><FaWeightScale className='text-[1.2rem]'/>{pokemonData.weight} lbs</p>
              </div>

              <div className="w-full h-auto justify-center flex">
                  <Image
                      src={pokemonData.sprites.other['official-artwork'].front_default}
                      alt={`Image of ${pokemonData.name}`}
                      height={500}
                      width={500}
                      priority
                      className='w-[15rem]'
                  />
              </div>
              <div className='w-full flex flex-col' style={{padding: "0rem 2rem"}}>
                  {pokemonData.stats.map((item, index) => (
                      <div key={index} className='flex flex-col'>
                          <div className='text-white capitalize flex justify-between items-center'>
                            <p className='text-[.9rem]'>{item.stat.name}</p>
                            <p className='text-[.8rem]'>{item.base_stat}</p>
                          </div>
                          <Statbar key={index} percent={item.base_stat} />
                      </div>
                  ))}
              </div>
              <div className='w-full flex flex-col gap-0  text-white' style={{padding: "1rem 2rem"}}>
              <h1>TYPE</h1>
                <div className='flex gap-4'>
                {pokemonData.types.map((item, index) => (
                  <div key={index} className='flex flex-row'>
                    <div className='text-gray-500 capitalize flex justify-between items-center'>
                      <p className='text-[.9rem]'>{item.type.name}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <div className='w-full flex flex-col text-white' style={{padding: "0rem 2rem"}}>
              <h1>ABILITY</h1>
                  {pokemonData.abilities.map((item, index) => (
                      <div key={index} className='flex flex-col'>
                          <div className='text-gray-500 capitalize flex justify-between items-center'>
                          <p className='text-[.9rem]'>{item.ability.name}</p>

                          </div>
                      </div>
                  ))}
              </div>


            </div>
        )}
      </div>
      <div className='bg-yellow-400 h-full flex flex-1 overflow-scroll'>
      <div className='w-full flex-col text-white' style={{padding: "0rem 2rem"}}>
          <h1>MOVES</h1>
          <div className='z-10'>
            <div className='flex flex-col overflow-scroll gap-4 text-nowrap'>
                {pokemonData.moves.map((item, index) => (
                  <div key={index} className='flex flex-col'>
                    <div className='text-gray-500 capitalize flex justify-between items-center'>
                      <p className='text-[.9rem] p-2 rounded-lg z-0' style={{border: '1px solid gray'}}>{item.move.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
