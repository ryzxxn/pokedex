'use client';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import StatBar from '@/app/components/stat_bar';
import Image from 'next/image';

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [evolutionChain, setEvolutionChain] = useState(null);

  const fetchPokemonData = useCallback(async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = response.data;
      const paddedId = pokemonData.id.toString().padStart(3, '0');
      pokemonData.image = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId}.png`;
      setPokemon(pokemonData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  useEffect(() => {
    if (pokemon) {
      const filtered = pokemon.moves.filter((move) =>
        move.move.name.includes(searchTerm.toLowerCase())
      );
      setFilteredMoves(filtered.slice(0, 8));
    }
  }, [pokemon, searchTerm]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon?.id}`
        );
        const speciesUrl = response.data.evolution_chain.url;
        const evolutionChainResponse = await axios.get(speciesUrl);
        setEvolutionChain(evolutionChainResponse.data.chain);
      } catch (error) {
        console.error(error);
      }
    };

    if (pokemon) {
      fetchEvolutionChain();
    }
  }, [pokemon]);

  const typeColors = useMemo(() => ({
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    flying: '#A890F0',
    fighting: '#C03028',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    rock: '#B8A038',
    psychic: '#F85888',
    ice: '#98D8D8',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#F0B6BC',
  }), []);

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    return (
      <div>
        <p className='capitalize'>{chain.species.name}</p>
        <br/>
        {chain.evolves_to.map((evolution) => (
          <div key={evolution.species.name}>
            <p className='capitalize'>
              {evolution.evolution_details[0].trigger.name} at level{' '}
              {evolution.evolution_details[0].min_level}
            </p>
            {renderEvolutionChain(evolution)}
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div style={{ display: 'flex', width: '100%', padding: '0rem 2rem' }} className='flex-col md:flex-row'>
        <div key={pokemon.id} style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
          <h1 style={{ color: 'white', fontSize: '2rem' }}>{pokemon.name.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {pokemon.types.map((type) => (
              <p
                className="capitalize"
                key={type.type.name}
                style={{ display: 'inline-block', color: typeColors[type.type.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
          <p style={{ color: 'white' }}>Weight: {pokemon.weight} lbs</p>
          <p style={{ color: 'white' }}>Height: {pokemon.height}0 cm</p>
          <Image 
            src={pokemon.image} // Path to your image
            alt="Example Image"
            quality={0}
            width={500} // Desired width of the image
            height={300} // Desired height of the image
          />
        </div>

        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', padding: '0rem 2rem', justifyContent: 'center', gap: '2rem' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '2rem' }}>Stats</h1>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} style={{ color: 'white' }}>
                {stat.stat.name.toUpperCase()} {stat.base_stat}
                <StatBar percent={(stat.base_stat / 255) * 100} />
              </div>
            ))}
          </div>
          
          <div className='flex-col md:flex-row'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem', padding: '0rem 0rem' }}>
            <h1 style={{ color: 'white', fontSize: '2rem' }}>Moves</h1>
            <input
              type="text"
              placeholder="Search moves..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
              }}
            />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredMoves.map((move) => (
                <li className='capitalize' key={move.move.name} style={{ color: 'white' }}>
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ color: 'white' }}>
          <h1 style={{ color: 'white', fontSize: '2rem' }}>Evolution</h1>
            {renderEvolutionChain(evolutionChain)}
          </div>
        </div>
      </div>
    </>
  );
}
