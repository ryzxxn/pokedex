'use client';
import { CiSearch } from 'react-icons/ci';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Poke_loader from '../components/poke_loader';

export default function Pokemon() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = useCallback((query) => {
    setQuery(query.trim()); // strip spaces before and after query
  }, []);

  if (loading) return <div><Poke_loader /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Search onSearch={handleSearch} />
      <Pokemon_list data={data} query={query} />
    </div>
  );
}

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  }, [onSearch]);

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        gap: '.6rem',
        boxShadow: '0rem 0rem rem #ff9a52',
      }}
    >
      <CiSearch style={{ fontSize: '1.2rem', color: 'white', fontStyle: 'bold' }} />
      <input
        style={{
          outline: 'none',
          border: 'none',
          padding: '.1rem',
          borderBottom: '.2px solid white',
          width: '40%',
          backgroundColor: 'transparent',
          color: 'white',
        }}
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search Pokemon..."
      />
    </div>
  );
}

function Pokemon_list({ data, query }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (query === '') {
      setFilteredData([]);
    } else {
      setFilteredData(
        data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [data, query]);

  return (
    <div
      style={{
        display: 'flex',
        margin: 0,
        flexDirection: 'column',
        gap: '.1rem',
        padding: '0rem .2rem',
        maxHeight: '20rem',
        overflowY: 'scroll',
      }}
    >
      {filteredData.length > 0 &&
        filteredData.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: '.3rem solid #ff9a52',
              cursor: 'pointer',
              color: 'white',
              borderRadius: '.2rem',
              padding: '1rem',
            }}
          >
            <span className="capitalize">{pokemon.name}</span>
            <Link href={`/pokemon/${pokemon.url.split('/').slice(-2)[0]}`}>View More</Link>
          </div>
        ))}
    </div>
  );
}
