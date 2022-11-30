import { useRef, useState } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { Particles } from './particles'
import { Stars } from './stars'
import { Torus } from './torus'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useControls } from 'leva'
import { Effects } from './postprocessing/effects'

export const Main = () => {
  const { camera, gl } = useThree()

  const { speed, numStars, numParticles } = useControls('Universe', {
    speed: { min: 1, max: 10, step: 0.01, value: 0.04 },
    numStars: { min: 0, max: 100000, step: 10, value: 10000 },
    numParticles: { min: 0, max: 100000, step: 10, value: 100000 },
  })

  const { toggle } = useControls('Special Effects', { toggle: true })

  const groupRef = useRef()
  const planetRef = useRef()

  useFrame((_state, delta) => {
    groupRef.current.rotation.y += delta * speed
    planetRef.current.rotation.y -= delta * (speed * 2)
  })

  extend({ OrbitControls })

  return (
    <group>
      {toggle ? <Effects /> : ''}

      <color args={['#000000']} attach="background" />
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      <Stars count={numStars} />
      <Particles count={numParticles} />

      <group ref={groupRef}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial
            color={[5, 1.6, 1.5]}
            toneMapped={false}
            emissive="blue"
          />
        </mesh>
        <Torus />
      </group>
    </group>
  )
}
