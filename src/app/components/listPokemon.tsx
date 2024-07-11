import Link from 'next/link';
import memoryState from 'memory-state';
import Image from 'next/image';
import Searchbar from './searchbar';
import { useState } from 'react';

export default function ListPokemon() {
  const pokemonData = memoryState.getState('AllPokemon');
  const [numItemsToShow, setNumItemsToShow] = useState(20);

  if (!pokemonData) {
    return <></>
  }

  return (
    <>
    <div className='h-screen flex-col'>    
      <div className='flex flex-1 flex-row h-full'>
          <div className='flex flex-[.2] flex-col'>
            <div className='h-full overflow-y-scroll'>
              {pokemonData.map((item: any, index: number) => {
                // Extract the ID from the URL using a regular expression
                const id = item.url.match(/\/(\d+)\/$/)[1];
                return (
                    <Link key={index} href={`/pokemon/${id}`}>
                      <div className="flex flex-row p-2 text-white cursor-pointer hover:bg-[rgb(30,30,30)] justify-center items-center gap-8 w-[auto]">
                        <div>
                          <p className="capitalize font-mono">{item.name}</p>
                          <p className="text-gray-500 text-[.7rem]">#{id}</p>
                        </div>
                      </div>
                    </Link>
                    );
                    })}
            </div>
            </div>
          <div className='flex-col w-[100%]'>
            <div className='flex flex-1'>
              <Searchbar/>
            </div>
            <div className='grid grid-cols-4 overflow-y-scroll relative'>
              {pokemonData.slice(0, numItemsToShow).map((item: any, index: number) => {
                const id = item.url.match(/\/(\d+)\/$/)[1];
                return (
                  <div key={index} className='flex justify-center'>
                  <Image
                    key={index}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    height={100}
                    width={100}
                    quality={0}
                    priority
                    alt={item.name}
                  />
                  </div>
                );
              })}
              <div className='absolute bottom-0 flex justify-center flex-1 right-1/2 translate-x-1/2 p-[1rem]'>
                {numItemsToShow < pokemonData.length && (
                  <button className='text-black bg-white rounded p-[1.4rem] ' onClick={() => setNumItemsToShow(numItemsToShow + 20)}>
                    Show More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
)};