import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const Torus = () => {
  const groupRef = useRef()
  const torusRef1 = useRef()
  const torusRef2 = useRef()
  const torusRef3 = useRef()
  const torusRef4 = useRef()

  useFrame((_state, delta) => {
    groupRef.current.rotation.y += 0.04 * delta
    torusRef1.current.rotation.y += 0.25 * delta
    torusRef2.current.rotation.x -= 0.25 * delta
    torusRef3.current.rotation.z += 0.125 * delta
    torusRef4.current.rotation.z -= 0.0625 * delta
    torusRef4.current.rotation.x += 0.0625 * delta
  })

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef1}>
        <torusGeometry args={[5]} />
        <meshStandardMaterial
          color={[2, 1, 1.5]}
          toneMapped={false}
          emissive="blue"
        />
      </mesh>
      <mesh ref={torusRef2}>
        <torusGeometry args={[10]} />
        <meshStandardMaterial color="white" wireframe={true} />
      </mesh>
      <mesh ref={torusRef3}>
        <torusGeometry args={[15]} />
        <meshStandardMaterial
          color={[2, 1, 1.5]}
          toneMapped={false}
          emissive="blue"
        />
      </mesh>
      <mesh ref={torusRef4}>
        <torusGeometry args={[20]} />
        <meshStandardMaterial color="white" wireframe={true} />
      </mesh>
    </group>
  )
}
