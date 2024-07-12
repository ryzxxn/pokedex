'use client'
import React, { useState, useEffect } from 'react'
import { useGLTF, useProgress } from '@react-three/drei'

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/models/pokeball.glb') as any
  const { progress } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true)
    }
  }, [progress])

  return (
      <group {...props} scale={0.2} dispose={null} position={[0, 0, 0]}>
        <mesh geometry={nodes.Pokeball.geometry} position={[0, 0, 0]}>
          <meshPhysicalMaterial metalness={0.1} roughness={0.3} color={'#0f0f0f'} />
        </mesh>

        <mesh geometry={nodes.Pokeball001.geometry} position={[0, 0, 0]}>
          <meshPhysicalMaterial roughness={1} color={'white'} />
        </mesh>

        <mesh geometry={nodes.Pokeball002.geometry} position={[0, 0, 0]}>
          <meshPhysicalMaterial metalness={0.1} roughness={0.3} color={'red'} />
        </mesh>
      </group>
  )
}

useGLTF.preload('/models/pokeball.glb')