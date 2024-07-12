"use client"
import React from 'react'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import {Model} from './model'
import { MotionCanvas } from 'framer-motion-3d'


export default function Hero() {

  return (
    <>
    <div className='h-screen'>
        <MotionCanvas style={{ backgroundColor: 'transparent' }} camera={{ position: [0, 0, 10], fov: 40 }} orthographic={false}>
          <Environment preset="city" />

          <ambientLight />
          <Float floatIntensity={2} speed={5}>
              <Model />
          </Float>
          <OrbitControls enableZoom={false} />
        </MotionCanvas>
    </div>
    </>
  )
}
