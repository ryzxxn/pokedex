import memoryState from 'memory-state'
import React from 'react'

export default function page() {

    var pokemon = memoryState.getState('pokemon')
    console.log(pokemon);
    
  return (
    <>
    <p>Pokemon</p>

    </>
  )
}
