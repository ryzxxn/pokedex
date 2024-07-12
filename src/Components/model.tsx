'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useGLTF, useProgress } from '@react-three/drei'
import { ReactThreeFiber, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { motion, useAnimation } from 'framer-motion'

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/models/pokeball.glb') as any
  const { progress } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)
  const neshref=useRef<Mesh>(null!)
  const controls = useAnimation()

  
  return (
    <motion.group
      ref={neshref}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 180}}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <group ref={neshref} {...props} scale={0.2} dispose={null} position={[0, 0, 0]}>
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
      </motion.group>
  )
}

useGLTF.preload('/models/pokeball.glb')