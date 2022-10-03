import type { ReactNode } from 'react'
import * as THREE from 'three'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { useTheme } from '~/utils/theme-provider'

type Props = {
  className: string
  children: ReactNode
}

const Visualisation = ({ className }: Props) => {
  const [theme] = useTheme()
  return (
    <div className={className}>
      <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 50 }}>
        <Physics gravity={[0, 50, 0]}>
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders />
            <InstancedSpheres theme={theme} />
          </group>
        </Physics>
      </Canvas>
    </div>
  )
}

function InstancedSpheres({ count = 200, theme }) {
  const tempColor = new THREE.Color()

  const colors =
    theme === 'light'
      ? ['#fffde7', '#fff9c4', '#fff59d', '#fff176']
      : ['#000', '#111', '#222', '#333']

  const data = Array.from({ length: 200 }, () => ({
    color: colors[Math.floor(Math.random() * colors.length - 1)],
    opacity: Math.random(),
    scale: 0.25 + Math.random(),
  }))

  const { viewport } = useThree()
  const [ref, api] = useSphere((index) => ({
    mass: data[index].scale * 10,
    position: [4 - Math.random() * 8, -viewport.height * 2, 0, 0],
    args: [data[index].scale],
  }))
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(count)
          .fill()
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    [count]
  )
  useLayoutEffect(() => {
    // Cannon does not support variable size for instances (yet), so this is something that's exclusive to react
    for (let i = 0; i < count; i++)
      api.at(i).scaleOverride([data[i].scale, data[i].scale, data[i].scale])
  }, [])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 64, 64]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  )
}

function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane
        position={[0, viewport.height / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 - 0.5, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 0.5, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, 1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

function Plane({ color, position = [0, 0, 0], ...props }) {
  const [, api] = usePlane(() => ({ ...props }))
  useEffect(() => api.position.set(...position), [api, position])
}

function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: 'Kinematic', args: [4] }))
  useFrame((state) =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    )
  )
}

export default Visualisation
