import React from 'react';
import Link from 'next/link';
import memoryState from 'memory-state';
import Image from 'next/image';

export default function ListPokemon() {
  const pokemonData = memoryState.getState('AllPokemon');

  return (
    <div className='flex justify-center'>
      <div className="flex flex-col flex-wrap md:grid grid-cols-4 gap-0 p-0">
        {pokemonData ? (
          pokemonData.map((item: any, index: number) => {
            // Extract the ID from the URL using a regular expression
            const id = item.url.match(/\/(\d+)\/$/)[1];

            return (
              <div key={index} className="flex flex-row flex-wrap w-[100%] justify-center">
                <Link href={`/pokemon/${id}`}>
                  <div className="flex flex-row p-2 text-white cursor-pointer hover:bg-[rgb(30,30,30)] justify-center items-center gap-8 w-[auto]">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                      height={100}
                      width={100}
                      alt={item.name}
                    />
                    <div>
                      <p className="capitalize font-mono">{item.name}</p>
                      <p className="text-gray-500 text-[.7rem]">#{id}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}