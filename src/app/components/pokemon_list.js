'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function Pokemon_list() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302')
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          setError(error)
        })
    }, [])
  
    if (error) return <div>Error loading Pokemon...</div>
    if (!data) return <div>Loading Pokemon...</div>
  
    // Map over the data and display each Pokemon in a list item
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', overflowX: 'scroll'}}>
            {data.results.map((pokemon) => (
            <p style={{wordBreak: 'keep-all'}} className='capitalize' key={pokemon.name}>{pokemon.name}</p>
            ))}
        </div>
        </>
    )
  }