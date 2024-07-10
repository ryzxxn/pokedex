import memoryState from 'memory-state'
import React from 'react'

export default function page() {

    var pokemon = memoryState.getState('AllPokemon')
    console.log(pokemon);
    
  return (
    <>
    <p>Pokemon</p>

    </>
  )
}
