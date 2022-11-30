import { useRef } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { Particles } from './particles'
import { Stars } from './stars'
import { Torus } from './torus'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const Main = () => {
  const { camera, gl } = useThree()

  camera.position.set(0, 10, 0)

  const groupRef = useRef()
  const planetRef = useRef()

  useFrame((_state, delta) => {
    groupRef.current.rotation.y += 0.04 * delta
    planetRef.current.rotation.y -= 0.08 * delta
  })

  extend({ OrbitControls })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      <Particles />
      <Stars />

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
