'use client'
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei';
import { FaArrowDown } from "react-icons/fa";

const scrollToSecondPart = () => {
  document.getElementById('secondpart').scrollIntoView({ behavior: 'smooth' });
}

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/pokeball.glb')
  return (
    <group
      {...props} scale={.2} dispose={null}>
      <mesh
        geometry={nodes.Pokeball.geometry}
        position={[0, 0, 0]}
      ><meshPhysicalMaterial metalness={0} roughness={1} color={'#0f0f0f'} />
      </mesh>

      <mesh
        geometry={nodes.Pokeball001.geometry}
        position={[0, 0, 0]}
      ><meshPhysicalMaterial roughness={1} color={'white'} />
      </mesh>

      <mesh
        geometry={nodes.Pokeball002.geometry}
        position={[0, 0, 0]}
      ><meshPhysicalMaterial metalness={0} roughness={.5} color={'red'} /></mesh>
    </group>
  )
}
useGLTF.preload('models/pokeball.glb')


export default function Hero() {
  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gradient-to-br from-yellow-200 to-red-500'>
        <p className="text-white text-[10rem] font-extrabold">POKEDEX</p>
        <div onClick={scrollToSecondPart} style={{ position: 'absolute', bottom: '1rem', padding: '2rem', backgroundColor: 'white', borderRadius: '50%', zIndex: '20', cursor: 'pointer'}}>
          <FaArrowDown style={{fontSize: '1.3rem'}} />
        </div>
      </div>

      {/* 3D CANVAS OVERLAY */}
      <div className='canvas-anim' style={{ height: '100vh', position: 'absolute', top: '-500px', left: '0px', width: '100%'}}>
        <Canvas style={{ backgroundColor: 'transparent' }} camera={{ position: [0, 0, 10], fov: 40 }} orthographic={false}>
          <Environment preset="city" />

          <ambientLight />
          <Float floatIntensity={2} speed={5}>
            <Model />
          </Float>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </>
  )
}
