'use client'
import Searchbar from "./Components/searchbar";
import axios from "axios";
import { useEffect, useState } from "react";
import memoryState from "memory-state";
import { MdOutlineMenu } from "react-icons/md";
import ListPokemon from "./Components/listPokemon";

export default function Home() {
  const [PokemonData, setPokemonData] = useState([])
  const [ShowList, setShowList] = useState(false)

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302");
      memoryState.setState("AllPokemon", response.data.results);
      setPokemonData(response.data.results)
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  }, []);

  function ToggleList() {
    setShowList(!ShowList)
  }

  return (
    <>
    <div className="flex flex-col h-screen">
      <div className="p-4 flex justify-center items-center gap-4  bg-[rgb(15,15,15)]">
          <MdOutlineMenu style={{fontSize: '2rem', color: 'white', cursor: 'pointer'}} onClick={ToggleList}/>
          <Searchbar/>
      </div>
      <div className="flex flex-1 h-full">
        { ShowList && (
        <div className="flex flex-[.1] max-h-[calc(100vh-80px)] absolute z-20">
          <div className="flex flex-col overflow-y-scroll static top-0">
            {PokemonData.map((item, index) => (
              <div key={index} className="flex justify-between flex-row gap-1 text-white items-center p-2 static left-0 top-0 bg-[rgb(24,24,24)] hover:bg-[rgb(41,41,41)] transition-all cursor-pointer max-w-40">
                <p className="text-[1.2] capitalize">{item.name}</p>
                <p className="font-mono text-[.8rem] text-gray-400">#{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
        )}
        <span className="bg-[rgb(15,15,15)] flex flex-1 max-h-[calc(100vh-80px)]">
          <span  className="flex flex-col flex-1 overflow-y-scroll w-full">
          <ListPokemon/>
          </span >
        </span >
      </div>
    </div>
    </>
  );
}
