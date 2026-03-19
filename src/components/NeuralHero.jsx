import { Canvas, useFrame } from "@react-three/fiber"
import { Clone, Edges, OrbitControls, useGLTF } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import brainModelUrl from "../../central_brain_of_mankind_cml.glb"

const MODEL_ANCHOR_X = 1.5

function ParticleField() {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const count = 1100
    const data = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const write = index * 3
      data[write] = (Math.random() - 0.5) * 30
      data[write + 1] = (Math.random() - 0.5) * 20
      data[write + 2] = (Math.random() - 0.5) * 28 - 10
    }

    return data
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.035
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#59f2ff" size={0.03} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function HoloScanLine() {
  const scanRef = useRef(null)

  useFrame((state) => {
    if (!scanRef.current) return

    const elapsed = state.clock.elapsedTime
    scanRef.current.position.y = -0.9 + ((elapsed * 0.65) % 1.8)
    scanRef.current.material.opacity = 0.22 + Math.sin(elapsed * 9) * 0.08
  })

  return (
    <mesh ref={scanRef} position={[0, 0, 0]}>
      <planeGeometry args={[4.2, 0.08]} />
      <meshBasicMaterial color="#44f6ff" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function CoreParticleCloud() {
  const cloudRef = useRef(null)
  const matRef = useRef(null)

  const positions = useMemo(() => {
    const count = 420
    const data = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const radius = 0.15 + Math.random() * 1.45
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const write = index * 3
      data[write] = radius * Math.sin(phi) * Math.cos(theta)
      data[write + 1] = radius * Math.cos(phi)
      data[write + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    return data
  }, [])

  useFrame((state) => {
    if (!cloudRef.current || !matRef.current) return

    const elapsed = state.clock.elapsedTime
    cloudRef.current.rotation.y = elapsed * 0.22
    cloudRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.1
    cloudRef.current.position.y = Math.sin(elapsed * 0.8) * 0.04

    const flicker = 0.2 + Math.sin(elapsed * 6.2) * 0.06 + (Math.random() - 0.5) * 0.03
    matRef.current.opacity = THREE.MathUtils.clamp(flicker, 0.1, 0.3)
  })

  return (
    <points ref={cloudRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} color="#5ff8ff" size={0.026} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </points>
  )
}

function FaintGrid() {
  return (
    <gridHelper
      args={[8.2, 46, "#1da7b5", "#0e4f58"]}
      position={[0, -1.36, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function GlowRing() {
  const ringRef = useRef(null)

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.material.opacity = 0.22 + Math.sin(state.clock.elapsedTime * 1.9) * 0.05
  })

  return (
    <mesh ref={ringRef} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.34, 2.25, 96]} />
      <meshBasicMaterial color="#49ebff" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function CyberNeuralCore({ url }) {
  const { scene } = useGLTF(url)
  const coreRef = useRef(null)
  const pulseRef = useRef({ phase: Math.random() * Math.PI * 2, base: 1.22, glitchAmp: 0.02 })

  const prepared = useMemo(() => {
    const model = scene.clone(true)
    const emissiveMaterials = []

    model.traverse((child) => {
      if (!child.isMesh) return

      const meshName = (child.name || "").toLowerCase()
      if (meshName.includes("floor") || meshName.includes("base") || meshName.includes("plane") || meshName.includes("circle") || meshName.includes("disc")) {
        child.visible = false
        return
      }

      const cyberMaterial = new THREE.MeshStandardMaterial({
        color: "#080b10",
        emissive: "#3de8ff",
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.28,
      })

      cyberMaterial.side = THREE.DoubleSide
      child.material = cyberMaterial
      emissiveMaterials.push(cyberMaterial)

    })

    const bounds = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    bounds.getSize(size)
    bounds.getCenter(center)

    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const normalizedScale = 2.62 / maxAxis

    model.scale.setScalar(normalizedScale)
    model.position.sub(center.multiplyScalar(normalizedScale))

    return { model, emissiveMaterials }
  }, [scene])

  useFrame((state, delta) => {
    if (!coreRef.current) return

    const elapsed = state.clock.elapsedTime
    const targetX = 0
    const targetScale = 1.24
    const glitchX = Math.sin(elapsed * 4.2 + pulseRef.current.phase) * pulseRef.current.glitchAmp
    const glitchZ = Math.cos(elapsed * 3.5 + pulseRef.current.phase * 0.7) * pulseRef.current.glitchAmp

    coreRef.current.rotation.y += delta * 0.18
    coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, Math.sin(elapsed * 0.9) * 0.08, 0.08)
    coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, targetX + glitchX, 0.06)
    coreRef.current.position.z = THREE.MathUtils.lerp(coreRef.current.position.z, glitchZ, 0.06)
    coreRef.current.scale.x = THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, 0.06)
    coreRef.current.scale.y = THREE.MathUtils.lerp(coreRef.current.scale.y, targetScale, 0.06)
    coreRef.current.scale.z = THREE.MathUtils.lerp(coreRef.current.scale.z, targetScale, 0.06)

    const flicker =
      pulseRef.current.base +
      Math.sin(elapsed * 2.2 + pulseRef.current.phase) * 0.16 +
      Math.sin(elapsed * 7.4 + pulseRef.current.phase * 0.4) * 0.06 +
      (Math.random() - 0.5) * 0.05

    const emissiveIntensity = THREE.MathUtils.clamp(flicker, 0.95, 1.5)
    for (let index = 0; index < prepared.emissiveMaterials.length; index += 1) {
      prepared.emissiveMaterials[index].emissiveIntensity = emissiveIntensity
    }

  })

  return (
    <group ref={coreRef}>
      <Clone
        object={prepared.model}
        inject={(object) =>
          object.isMesh ? (
            <Edges scale={1.01} threshold={16} color="#45f3ff" />
          ) : null
        }
      />

      <CoreParticleCloud />
      <HoloScanLine />
    </group>
  )
}

function CameraIntro({ onComplete }) {
  const completeRef = useRef(false)
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const lookAtTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime

    const orbitDuration = 6
    const zoomDuration = 2.8
    const introDuration = orbitDuration + zoomDuration

    let baseX
    let baseY
    let baseZ

    if (elapsed <= orbitDuration) {
      const t = elapsed / orbitDuration
      const angle = t * Math.PI * 2
      const radius = 2.85
      baseX = MODEL_ANCHOR_X + Math.cos(angle) * radius
      baseY = 0.38 + Math.sin(angle * 2) * 0.07
      baseZ = Math.sin(angle) * radius
    } else {
      const rawT = Math.min((elapsed - orbitDuration) / zoomDuration, 1)
      const easedT = 1 - (1 - rawT) ** 3
      const radius = THREE.MathUtils.lerp(2.85, 6.7, easedT)
      const angle = Math.PI * 2
      baseX = MODEL_ANCHOR_X + Math.cos(angle) * radius
      baseY = THREE.MathUtils.lerp(0.38, 0.28, easedT)
      baseZ = Math.sin(angle) * radius
    }

    if (elapsed >= introDuration && !completeRef.current) {
      completeRef.current = true
      onComplete?.()
    }

    const settleProgress = elapsed > introDuration ? Math.min((elapsed - introDuration) / 1.3, 1) : 0
    const settleEase = settleProgress * settleProgress * (3 - 2 * settleProgress)
    const settledX = THREE.MathUtils.lerp(baseX, -2.5, settleEase)
    const settledY = THREE.MathUtils.lerp(baseY, 1, settleEase)
    const settledZ = THREE.MathUtils.lerp(baseZ, 6, settleEase)

    targetPos.set(settledX, settledY, settledZ)
    state.camera.position.lerp(targetPos, 0.055)
    lookAtTarget.set(MODEL_ANCHOR_X, 0, 0)
    state.camera.lookAt(lookAtTarget)
  })

  return null
}

function NeuralHero({ name = "Rashmi Paboda" }) {
  const [showText, setShowText] = useState(false)

  return (
    <div className="neural-hero" id="neural-hero">
      <Canvas dpr={[1, 1.75]} camera={{ position: [2.85, 0.38, 0], fov: 48 }}>
        <color attach="background" args={["#03050b"]} />
        <fog attach="fog" args={["#050812", 6.5, 22]} />

        <ambientLight intensity={0.03} color="#151a34" />
        <pointLight position={[3.6, 1.5, 2.8]} intensity={0.35} color="#6e38ff" />
        <pointLight position={[-3.6, 1.2, 2.4]} intensity={0.32} color="#3ef2ff" />

        <ParticleField />
        <group position={[MODEL_ANCHOR_X, 0, 0]}>
          <FaintGrid />
          <GlowRing />
          <CyberNeuralCore url={brainModelUrl} />
        </group>
        <CameraIntro onComplete={() => setShowText(true)} />
        <OrbitControls enablePan={false} enableZoom={false} target={[MODEL_ANCHOR_X, 0, 0]} />

        <EffectComposer multisampling={0}>
          <Bloom intensity={1.7} luminanceThreshold={0.42} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div className={`neural-hero__overlay ${showText ? "is-visible neural-hero__overlay--split" : ""}`}>
        <h1 className="neural-hero__title glitch-signal" data-text={`Hi, I'm ${name}`}>
          {`Hi, I'm ${name}`}
        </h1>
        <p className="neural-hero__subtitle glitch-signal" data-text="CS Student | University of Moratuwa">
          CS Student | University of Moratuwa
        </p>
      </div>
    </div>
  )
}

useGLTF.preload(brainModelUrl)

export default NeuralHero
