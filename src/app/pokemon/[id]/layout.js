import Pokemon from '@/app/components/search'
import React from 'react'
import PokemonPage from './page'

export default function Layout() {
  return (
   <>
   <div>
    <Pokemon/>
    <PokemonPage/>
    </div>
   </>
  )
}
