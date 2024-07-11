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
      <div className='flex flex-1 h-screen'>
          <div className='flex flex-[0.3] flex-col overflow-y-scroll md:flex-[0.2] h-full'>
              {pokemonData.map((item: any, index: number) => {
                // Extract the ID from the URL using a regular expression
                const id = item.url.match(/\/(\d+)\/$/)[1];
                return (
                    <Link key={index} href={`/pokemon/${id}`}>
                      <div className="flex flex-row p-2 text-white cursor-pointer hover:bg-[rgb(30,30,30)] gap-8 w-[auto]">
                        <div>
                          <p className="capitalize font-mono">{item.name}</p>
                          <p className="text-gray-500 text-[.7rem]">#{id}</p>
                        </div>
                      </div>
                    </Link>
                    );
                    })}
          </div>
          <div className='flex-col flex-1'>
            <div className='overflow-y-scroll'>
              <div className='grid grid-cols-5 overflow-y-hidden relative gap-2'>
                {pokemonData.slice(0, numItemsToShow).map((item: any, index: number) => {
                  const id = item.url.match(/\/(\d+)\/$/)[1];
                  return (
                    <div key={index} className='flex h-[100%] w-[100%] justify-center flex-col items-center bg-white rounded'>
                      <div>
                        <Image
                        style={{height: '5rem', width: '5rem'}}
                          key={index}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                          height={100}
                          width={100}
                          quality={0}
                          priority
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex-row justify-center flex p-[1rem]'>
                  {numItemsToShow < pokemonData.length && (
                    <button className='text-black bg-white rounded p-[1rem] ' onClick={() => setNumItemsToShow(numItemsToShow + 20)}>
                      Show More
                    </button>
                  )}
              </div>
            </div>
          </div>
      </div>
    </>
)};