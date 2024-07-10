'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Statbar from '@/app/components/statbar';
import { FaWeightHanging } from 'react-icons/fa6';
import { MdHeight } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
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
}

const MotionImage = motion(Image)

export default function Page({params}: {params:{id:number}}) {
  const { id } = useParams();
  const pokeid = id.toString().padStart(3, '0');
  const pokemonId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [nextPokemonData, setNextPokemonData] = useState<PokemonData | null>(null); // State for next Pokemon data
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchCurrentPokemon = async () => {
      try {
        const response = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(response.data);
        // After fetching current Pokemon, start fetching next Pokemon (pokeid + 1)
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentPokemon();
  }, []);

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
      <p
        style={{
          position: 'absolute',
          top: '0px',
          fontFamily: 'monospace',
          color: 'grey',
          padding: '.5rem .5rem',
          fontSize: '2rem',
        }}
      >
        #000{pokemonId}
      </p>
      <div className='p-5 text-white h-screen flex items-center flex-col justify-evenly font-mono'>
        <div className='flex justify-between absolute right-0 flex-row-reverse w-[100%] items-center gap-8 p-0'>
          <div className='p-4 bg-[rgb(34,34,34)] rounded' onClick={handleIncrement}>
            <FaArrowRight />
          </div>
          <div className='p-4 bg-[rgb(34,34,34)] rounded' onClick={handleDecrement}>
            <FaArrowLeft />
          </div>
        </div>
        <div className='rounded p-6 w-[90%] md:w-[30rem]'>
          {pokemonData ? (
            <div className='flex flex-col transition-all'>
              {/* <p className='capitalize text-2xl'>{pokemonData.name}</p> */}
              <div className='flex flex-row justify-center'>
                {!imageLoaded && (
                  <>
                    {/* <div className='h-full w-full flex flex-row justify-center items-center'>
                      <Image width={500} height={500} priority src='/pikachu.gif' alt='pikachu.gif' style={{ height: '6rem', width: 'auto' }} />
                    </div> */}
                  </>
                )}
                <div>
                    <MotionImage
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                    className='w-[15rem] h-[15rem]'
                    quality={0}
                    priority
                    width={500}
                    height={500}
                    src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokeid}.png`}
                    alt={pokemonData.name}
                    onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                <div style={{ height: '0px',width: '0px', opacity: '0'}}>
                <Image
                  className='w-[15rem] h-[15rem]'
                  quality={0}
                  width={500}
                  height={500}
                  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${(parseInt(pokeid) + 1).toString().padStart(3, '0')}.png`}
                  alt={pokemonData.name}
                  onLoad={() => setImageLoaded(true)}
                />
                </div>
              </div>
              <p className='capitalize text-2xl'>{pokemonData.name}</p>
              <div>
                <div className='flex gap-3'>
                  {pokemonData.types.map((type) => (
                    <p className='text-[.9rem] capitalize' key={type.type.name}>
                      {type.type.name}
                    </p>
                  ))}
                </div>
                <div className='flex gap-2 items-center'>
                  <MdHeight />
                  <p className='text-[.9rem]'>Height: {pokemonData.height}0cm</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <FaWeightHanging />
                  <p className='text-[.9rem]'>Weight: {pokemonData.weight}lbs</p>
                </div>
              </div>
              <div>
                {pokemonData.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className='flex capitalize justify-between items-center'>
                      <p>{stat.stat.name}</p>
                      <p className='text-[.7rem]'>{stat.base_stat}</p>
                    </div>
                    <Statbar percent={String((stat.base_stat / 255) * 100)} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* Render next Pokemon data if available */}
      {nextPokemonData && (
        <></>
      )}
    </>
  );
}
