import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { random } from 'canvas-sketch-util'
import { Object3D } from 'three'

export const Particles = () => {
  const light = useRef()
  const mesh = useRef()
  const count = 100000

  const particles = useMemo(() => {
    const array = []
    for (let i = 0; i < count; i++) {
      const time = random.range(0, 100)
      const factor = random.range(20, 120)
      const speed = random.range(0.01, 0.015) / 5
      const x = random.range(-50, 50)
      const y = random.range(-50, 50)
      const z = random.range(-50, 50)

      array.push({ time, factor, speed, x, y, z })
    }
    return array
  }, [count])

  const object = useMemo(() => new Object3D(), [])

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle

      // Update the particle time
      const t = (particle.time += speed)

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      object.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t)
      object.scale.set(s, s, s)
      object.rotation.set(s * 15, s * 15, s * 15)
      object.updateMatrix()

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, object.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#010101" />
      </instancedMesh>
    </>
  )
}
