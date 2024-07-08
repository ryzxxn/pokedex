'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Statbar from '@/app/components/statbar';
import { FaWeightHanging } from "react-icons/fa6";
import { MdHeight } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Searchbar from '@/app/components/searchbar';

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
    other: {
        dream_world: {
            front_default: string;
        }
    }
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
  // Add other properties as needed
}

export default function Page() {
  const { id } = useParams();
  // Ensure that id is a string
  const pokemonId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonId]);

  const handleDecrement = () => {
    const newId = parseInt(pokemonId) - 1;
    if (newId > 0) {
      router.push(`/pokemon/${newId}`);
    }
  };

  const handleIncrement = () => {
    const newId = parseInt(pokemonId) + 1;
    router.push(`/pokemon/${newId}`);
  };

  return (
    <>
    <p style={{position: 'absolute', top: '0px', fontFamily: 'monospace', color: 'grey', padding: '.5rem .5rem', fontSize: '2rem'}}>#000{pokemonId}</p>
    <div className='p-5 bg-black text-white h-screen flex items-center flex-col justify-evenly font-mono'>
        <Searchbar/>
        <div className='flex justify-between absolute right-0 flex-row-reverse w-[100%] items-center gap-8 p-0'>
            <div className='p-4 bg-[rgb(34,34,34)] rounded' onClick={handleIncrement}><FaArrowRight /></div>
            <div className='p-4 bg-[rgb(34,34,34)] rounded' onClick={handleDecrement}><FaArrowLeft /></div>
        </div>
        <div className='rounded bg-[rgb(25,25,25)] p-6 w-[90%] md:w-[30rem]'>
      {pokemonData ? (
        <div className='flex flex-col'>
          <p className='capitalize text-2xl'>{pokemonData.name}</p>
          <div>
                <div>
                    <div className='flex gap-3'>
                        {pokemonData.types.map((type) => (
                            <p className='text-[.9rem] capitalize' key={type.type.name}>{type.type.name}</p>
                        ))}
                    </div>
                    <div className='flex gap-2 items-center'>
                    <MdHeight /><p className='text-[.9rem]'>Weight: {pokemonData.height}0cm</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                    <FaWeightHanging /><p className='text-[.9rem]'>Weight: {pokemonData.weight}lbs</p>
                    </div>
                </div>
          </div>
          <div className='flex flex-row justify-center'>
            <Image width={250} height={250} src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name}/>
          </div>
          <div>
            <div>
              {pokemonData.stats.map((stat) => (
                <div key={stat.stat.name}>
                <div className='flex capitalize justify-between items-center'>
                  <p>{stat.stat.name}</p>
                  <p className='text-[.7rem]'>{stat.base_stat}</p>
                </div>
                  <Statbar percent={String((stat.base_stat / 255) * 100)}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center'>
            <p>Loading...</p>
        </div>
      )}
      </div>
    </div>
    </>
  );
}