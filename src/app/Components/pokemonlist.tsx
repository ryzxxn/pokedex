"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Pokemon {
  name: string;
  url: string;
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface TypeGradients {
  [key: string]: string;
  normal: string;
  fire: string;
  water: string;
  electric: string;
  grass: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
}

// Define a dictionary of gradients for each type of Pokemon
const typeGradients: TypeGradients = {
  normal: "radial-gradient(#ffffff, #b8a038)",
  fire: "radial-gradient(#ffffff, #e04000)",
  water: "radial-gradient(#ffffff, #4870f0)",
  electric: "radial-gradient(#ffffff, #f8c000)",
  grass: "radial-gradient(#ffffff, #488030)",
  ice: "radial-gradient(#ffffff, #68a8a8)",
  fighting: "radial-gradient(#ffffff, #a02018)",
  poison: "radial-gradient(#ffffff, #703070)",
  ground: "radial-gradient(#ffffff, #d0b058)",
  flying: "radial-gradient(#ffffff, #7880e0)",
  psychic: "radial-gradient(#ffffff, #f03870)",
  bug: "radial-gradient(#ffffff, #889810)",
  rock: "radial-gradient(#ffffff, #887028)",
  ghost: "radial-gradient(#ffffff, #504878)",
  dragon: "radial-gradient(#ffffff, #5028d8)",
  dark: "radial-gradient(#ffffff, #504838)",
  steel: "radial-gradient(#ffffff, #9898b0)",
  fairy: "radial-gradient(#ffffff, #e098a8)",
};

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<JSX.Element[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch the data for all Pokemon
        const response = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon/?limit=1302`);
        const pokemonData = response.data.results;

        // Map the data into an array of JSX elements
        const pokemonElements = await Promise.all(pokemonData.map(async pokemon => {
          // Extract the Pokemon ID from the URL
          const id = pokemon.url.split('/').filter(Boolean).pop();
          // Pad the ID with leading zeros to ensure it has three digits
          if (typeof id !== 'string') {
            return null;
          }

          const paddedId = id.padStart(3, '0');

          // Fetch the data for the current Pokemon to get its type
          const pokemonResponse = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);

          // Check that the pokemonResponse.data object and the pokemonResponse.data.types array are defined and not empty
          if (!pokemonResponse.data || !pokemonResponse.data.types || pokemonResponse.data.types.length === 0) {
            return null;
          }

          const pokemonType = pokemonResponse.data.types[0].type.name;

          // Get the gradient for the Pokemon type
          let gradient = typeGradients.normal; // default gradient
          if (pokemonType in typeGradients) {
            gradient = typeGradients[pokemonType];
          }

          return (
            <div key={pokemon.name} style={{ backgroundImage: gradient }} className='flex flex-col p-4 min-w-[4rem] rounded gap-4 max-w-[8rem] justify-center'>
              <Image
                className='scale-150'
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId}.png`}
                height={500}
                width={500}
                quality={0}
                priority
              />
              <div className='flex justify-center z-10 pt-5'>
                <p className='text-white capitalize' style={{ textShadow: '0rem 0rem .4rem rgb(0,0,0,.800)' }}>{pokemon.name}</p>
              </div>
            </div>
          );
        }));

        // Set the state with the array of JSX elements
        setPokemonList(pokemonElements.filter(element => element !== null));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleMoreClick = () => {
  const newOffset = offset + 10;
  if (newOffset <= 1302) {
    setOffset(newOffset);
  }
};
  

  return (
    <div className='h-full flex flex-1 flex-col'>
      <div className='grid h-full flex-1 p-4 place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-all'>
        {pokemonList.slice(offset, offset + 18)}
      </div>
      {offset + 10 < pokemonList.length && (
        <div className='flex flex-row justify-center'>
          <button className='px-2 py-1 rounded bg-blue-500 text-white' onClick={handleMoreClick}>More</button>
        </div>
      )}
    </div>
  );
}
