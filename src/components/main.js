import { useRef } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { Particles } from './particles'
import { Stars } from './stars'
import { Torus } from './torus'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useControls } from 'leva'

export const Main = () => {
  const { camera, gl } = useThree()

  const { speed, numStars, numParticles } = useControls('Universe', {
    speed: { min: 0, max: 100, step: 0.001, value: 1 },
    numStars: { min: 0, max: 100000, step: 10, value: 10000 },
    numParticles: { min: 0, max: 100000, step: 10, value: 100000 },
  })

  camera.position.set(0, 10, 0)

  console.log(speed)

  const groupRef = useRef()
  const planetRef = useRef()

  useFrame((_state, delta) => {
    groupRef.current.rotation.y += 0.04 * delta * speed
    planetRef.current.rotation.y -= 0.08 * delta * speed
  })

  extend({ OrbitControls })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      <Stars count={numStars} />
      <Particles count={numParticles} />

      <group ref={groupRef}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="white" wireframe={true} />
        </mesh>
        <Torus />
      </group>
    </>
  )
}
