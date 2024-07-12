"use client"
import React from 'react'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import {Model} from './model'
import { Canvas } from '@react-three/fiber'


export default function Hero() {

  return (
    <>
    <div className='h-screen'>
        <Canvas style={{ backgroundColor: 'white' }} camera={{ position: [0, 0, 10], fov: 40 }} orthographic={false}>
          <Environment preset="city" />

          <ambientLight />
          <Float floatIntensity={2} speed={5}>
              <Model />
          </Float>
          {/* <OrbitControls enableZoom={false}  enablePan={false} /> */}
        </Canvas>
    </div>
    </>
  )
}
