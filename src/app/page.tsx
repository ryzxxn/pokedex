'use client'
import Searchbar from "./Components/searchbar";
import axios from "axios";
import memoryState from 'memory-state';
import { useState, useEffect } from "react";
import Image from "next/image";
import Pokemonlist from "./Components/pokemonlist";

interface ApiData {
  results: {
    name: string;
    url: string;
  }[];
}

export default function Home() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiData>("https://pokeapi.co/api/v2/pokemon?limit=1302");
        memoryState.setState("AllPokemon", response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
  <>
  <div className="p-2 gap-2 flex flex-col">
    <div className="flex justify-center" style={{width:'auto', height: 'auto'}}>
      <Image
        alt=""
        src='/pokedex.svg'
        height={0}
        width={300}
        className="h-[3rem]"
        priority
        />
    </div>
    <Searchbar/>
    <Pokemonlist/>
  </div>
  </>
  );
}
