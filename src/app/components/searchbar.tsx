'use client';
import memoryState from 'memory-state';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const pokemonData = memoryState.getState('AllPokemon');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim());
  };

  useEffect(() => {
    if (query === '') {
      setFilteredData([]);
    } else {
      setFilteredData(
        pokemonData
          .filter((item: any) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((item: any) => ({
            ...item,
            id: item.url.split('/').filter(Boolean).pop(),
          }))
      );
    }
  }, [pokemonData, query]);

  return (
    <div className="flex flex-col items-center w-full p-4 justify-center md:flex-col">
      <div className="flex items-center bg-white w-4/5 p-2 gap-2 rounded flex-row-reverse">
        <CiSearch className='text-black font-bold' />
        <input
          className="border-none outline-none w-full font-mono text-black"
          type="text"
          value={query}
          onChange={handleChange}
        />
      </div>
      {filteredData.length > 0 && (
        <div className="overflow-y-scroll h-40 max-h-40 w-4/5 mt-2 bg-bg-[rgb(24,24,24)] rounded">
          {filteredData.map((item: any) => (
            <Link href={`/pokemon/${item.id}`} className="flex p-2 text-white cursor-pointer hover:bg-[rgb(30,30,30)] flex-row justify-between items-center" key={item.id}>
              <p className='capitalize font-mono'>{item.name}</p> 
              <p className='text-gray-500 text-[.7rem]'>#{item.id}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
