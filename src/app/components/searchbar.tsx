'use client'
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link';
import memoryState from 'memory-state'; // Import memory-state

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    // Function to update pokemonData from memory-state
    const updatePokemonData = () => {
      setPokemonData(memoryState.getState('AllPokemon') || []);
    };

    // Subscribe to 'AllPokemon' changes from memory-state
    memoryState.subscribe('AllPokemon', updatePokemonData);

    // Initial fetch of data
    updatePokemonData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      memoryState.subscribe('AllPokemon', updatePokemonData);
    };
  }, []); // Empty dependency array ensures subscription happens only once on component mount

  useEffect(() => {
    if (!pokemonData) return;

    if (query === '') {
      setFilteredData([]);
    } else {
      const filteredResults = pokemonData
        .filter((item: any) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((item: any) => ({
          ...item,
          id: item.url.split('/').filter(Boolean).pop(),
        }));
      setFilteredData(filteredResults);
    }
  }, [query, pokemonData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim());
  };

  return (
    <div className="flex flex-col items-center w-full p-4 justify-center md:flex-col">
      <div className="flex items-center bg-transparent w-4/5 p-2 gap-2 flex-row-reverse border-b-[.1rem] border-gray-300">
        <CiSearch className="text-white font-bold" />
        <input
          className=" outline-none w-full font-mono text-white bg-transparent"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search Pokemon..."
        />
      </div>
      {filteredData.length > 0 && (
        <div className="overflow-y-scroll h-40 max-h-40 w-4/5 mt-2 bg-bg-[rgb(24,24,24)] rounded">
          {filteredData.map((item: any) => (
            <Link href={`/pokemon/${item.id}`} key={item.id}>
              <div className="flex p-2 text-white cursor-pointer hover:bg-[rgb(30,30,30)] flex-row justify-between items-center">
                <p className="capitalize font-mono">{item.name}</p>
                <p className="text-gray-500 text-[.7rem]">#{item.id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
