'use client'
import { CiSearch } from "react-icons/ci";
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Pokemon() {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  function handleSearch(query) {
    setQuery(query.trim()) // strip spaces before and after query
  }

  if (!data) return <div>Loading Pokemon...</div>

  return (
    <div style={{width: '100%', display :'flex', flexDirection: 'column'}}>
      <Search onSearch={handleSearch} />
      <Pokemon_list data={data} query={query} />
    </div>
  )
}

function Search({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSearch(event) {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <div style={{padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', gap: '.6rem'}}>
        <CiSearch style={{backgroundColor: 'white', fontSize: '1.2rem'}} />
        <input style={{outline: 'none', border: 'none', padding: '.1rem', borderBottom: '1px solid grey'}} type="text" value={query} onChange={handleSearch} placeholder="Search Pokemon..." />
    </div>
  )
}

function Pokemon_list({ data, query }) {
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
      if (query === '') {
        setFilteredData([])
      } else {
        setFilteredData(data.results.filter((pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()))) // convert query and pokemon name to lowercase
      }
    }, [data, query])

  return (
    <div style={{display: 'flex', padding: 0, margin: 0, flexDirection: 'column', gap: '0rem'}}>
      {filteredData.length > 0 && filteredData.map((pokemon) => (
        <p className='capitalize' style={{borderBottom: '1px solid rgb(240,240,240)'}} key={pokemon.name}>{pokemon.name}</p>
      ))}
    </div>
  )
}