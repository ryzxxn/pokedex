'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import memoryState from 'memory-state';
import Searchbar from "./components/searchbar";
import ListPokemon from "./components/listPokemon";

interface ApiData {
  results: {
    name: string;
    url: string;
  }[];
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<ApiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiData>("https://pokeapi.co/api/v2/pokemon?limit=1302");
        memoryState.setState("AllPokemon", response.data.results);
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <Searchbar/>
      <ListPokemon/>
    </div>
    </>
  );
}
