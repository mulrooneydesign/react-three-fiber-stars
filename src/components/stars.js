import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { random } from 'canvas-sketch-util'
import { Object3D, Color } from 'three'

export const Stars = ({ count }) => {
  const light = useRef()
  const mesh = useRef()
  const material = useRef()

  const particles = useMemo(() => {
    const array = []
    for (let i = 0; i < count; i++) {
      const time = random.range(0, 100)
      const factor = random.range(20, 120)
      const speed = random.range(0.01, 0.015) / 5
      const randomColor = [
        random.range(0, 1),
        random.range(0, 1),
        random.range(0, 1),
      ]

      const x = random.range(-50, 50)
      const y = random.range(-50, 50)
      const z = random.range(-50, 50)

      array.push({ time, factor, speed, randomColor, x, y, z })
    }
    return array
  }, [count])

  const object = useMemo(() => new Object3D(), [])
  const color = useMemo(() => new Color(), [])

  useFrame(() => {
    particles.forEach((particle, index) => {
      let { factor, speed, randomColor, x, y, z } = particle

      const t = (particle.time += speed)

      object.position.set(
        x + Math.cos(t / 10) + (Math.tan(t * 1) * factor) / 20,
        y + Math.sin(t / 10) + (Math.cos(t * 2) * factor) / 20,
        z + Math.cos(t / 10) + (Math.cos(t * 3) * factor) / 20
      )

      const s = Math.sin(t)
      object.scale.set(s * 0.2, s * 0.2, s * 0.2)
      object.rotation.set(s * 15, s * 15, s * 15)

      object.updateMatrix()

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, object.matrix)
      // set color of the instanced meshes
      mesh.current.setColorAt(
        index,
        color.setRGB(randomColor[0], randomColor[1], randomColor[2])
      )
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <pointLight ref={light} distance={10} intensity={5} color="hotpink" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.28, 0]} />
        <meshLambertMaterial ref={material} color={color} />
      </instancedMesh>
    </>
  )
}
