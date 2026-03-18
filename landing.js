import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js"
import { GLTFLoader } from "https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js"

const sceneWrap = document.getElementById("scene-wrap")
const overlay = document.querySelector(".overlay")

const scene = new THREE.Scene()
scene.background = new THREE.Color("#040711")

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, 0.4, 2.7)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace
sceneWrap.appendChild(renderer.domElement)

// Soft neon lighting for a futuristic look.
const ambient = new THREE.AmbientLight("#3f66ff", 0.55)
scene.add(ambient)

const keyLight = new THREE.PointLight("#6fa5ff", 1.25, 20)
keyLight.position.set(2.8, 2.2, 3.4)
scene.add(keyLight)

const fillLight = new THREE.PointLight("#4a5fff", 0.75, 18)
fillLight.position.set(-3.2, -1.4, 2.2)
scene.add(fillLight)

const rimLight = new THREE.PointLight("#81a3ff", 0.45, 16)
rimLight.position.set(0, 0, -4)
scene.add(rimLight)

// Optional background particles for depth and motion.
const particleCount = 500
const particleGeometry = new THREE.BufferGeometry()
const particlePositions = new Float32Array(particleCount * 3)
for (let i = 0; i < particleCount; i += 1) {
  const index = i * 3
  particlePositions[index] = (Math.random() - 0.5) * 20
  particlePositions[index + 1] = (Math.random() - 0.5) * 12
  particlePositions[index + 2] = -2 - Math.random() * 18
}
particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))

const particleMaterial = new THREE.PointsMaterial({
  color: "#8fc8ff",
  size: 0.04,
  transparent: true,
  opacity: 0.75,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
})

const particles = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particles)

const modelGroup = new THREE.Group()
scene.add(modelGroup)

let loadedModel = null
const loader = new GLTFLoader()

// Load the 3D model from the same directory as this script/page.
loader.load(
  "./model.glb",
  (gltf) => {
    loadedModel = gltf.scene

    // Normalize model scale and center for reliable framing.
    const box = new THREE.Box3().setFromObject(loadedModel)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const normalizedScale = 1.7 / maxAxis

    loadedModel.scale.setScalar(normalizedScale)
    loadedModel.position.sub(center.multiplyScalar(normalizedScale))
    loadedModel.position.y -= 0.1

    modelGroup.add(loadedModel)
  },
  undefined,
  (error) => {
    console.error("Failed to load model.glb:", error)
  },
)

// Subtle mouse-based interaction with damping for smoothness.
const pointer = { x: 0, y: 0 }
const pointerTarget = { x: 0, y: 0 }

window.addEventListener("pointermove", (event) => {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1
  pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1)
})

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

let introStart = performance.now()
let introDone = false

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2
}

// Trigger text fade-in shortly after intro animation starts.
setTimeout(() => {
  overlay?.classList.add("overlay--visible")
}, 300)

function animate(now) {
  requestAnimationFrame(animate)

  const elapsedSec = now * 0.001

  // Intro camera zoom-out with slight blur increase.
  if (!introDone) {
    const duration = 2.4
    const raw = Math.min((now - introStart) / (duration * 1000), 1)
    const t = easeInOutCubic(raw)

    camera.position.z = THREE.MathUtils.lerp(2.7, 6.8, t)
    camera.position.y = THREE.MathUtils.lerp(0.4, 0.2, t)
    sceneWrap.style.setProperty("--scene-blur", `${THREE.MathUtils.lerp(0.35, 1.1, t).toFixed(2)}px`)

    if (raw >= 1) {
      introDone = true
      sceneWrap.style.setProperty("--scene-blur", "0.55px")
    }
  }

  pointer.x = THREE.MathUtils.lerp(pointer.x, pointerTarget.x, 0.05)
  pointer.y = THREE.MathUtils.lerp(pointer.y, pointerTarget.y, 0.05)

  // Continuous slow 360° model rotation plus slight pointer tilt.
  if (loadedModel) {
    modelGroup.rotation.y += 0.0035
    modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, pointer.y * 0.12, 0.04)
    modelGroup.rotation.z = THREE.MathUtils.lerp(modelGroup.rotation.z, pointer.x * 0.06, 0.04)
  }

  // Gentle particle drift.
  particles.rotation.y = elapsedSec * 0.015
  particles.rotation.x = Math.sin(elapsedSec * 0.15) * 0.025

  renderer.render(scene, camera)
}

requestAnimationFrame(animate)