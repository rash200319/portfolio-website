const sceneWrap = document.getElementById("scene-wrap")
const overlay = document.querySelector(".overlay")

const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")
sceneWrap.appendChild(canvas)

const particles = []
const particleCount = 78

const pointer = { x: 0.5, y: 0.5 }
let width = 0
let height = 0
let rafId = 0

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function resize() {
  width = window.innerWidth
  height = window.innerHeight

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function createParticles() {
  particles.length = 0

  for (let index = 0; index < particleCount; index += 1) {
    particles.push({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      radius: randomBetween(1, 3.2),
      alpha: randomBetween(0.14, 0.55),
      speedX: randomBetween(-0.18, 0.18),
      speedY: randomBetween(-0.14, 0.14),
    })
  }
}

function drawBackground(time) {
  context.clearRect(0, 0, width, height)

  const pulse = (Math.sin(time * 0.0004) + 1) * 0.5

  const gradient = context.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, "#060c1f")
  gradient.addColorStop(0.5, "#070a17")
  gradient.addColorStop(1, "#020309")
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)

  const orbA = context.createRadialGradient(
    width * (0.2 + pointer.x * 0.06),
    height * (0.2 + pointer.y * 0.04),
    0,
    width * 0.2,
    height * 0.2,
    width * 0.42,
  )
  orbA.addColorStop(0, `rgba(56, 189, 248, ${0.22 + pulse * 0.12})`)
  orbA.addColorStop(1, "rgba(56, 189, 248, 0)")
  context.fillStyle = orbA
  context.fillRect(0, 0, width, height)

  const orbB = context.createRadialGradient(
    width * (0.82 - pointer.x * 0.05),
    height * (0.18 + pointer.y * 0.05),
    0,
    width * 0.82,
    height * 0.18,
    width * 0.36,
  )
  orbB.addColorStop(0, `rgba(139, 92, 246, ${0.2 + (1 - pulse) * 0.1})`)
  orbB.addColorStop(1, "rgba(139, 92, 246, 0)")
  context.fillStyle = orbB
  context.fillRect(0, 0, width, height)
}

function drawGrid(time) {
  const spacing = 38
  const drift = (time * 0.015) % spacing

  context.save()
  context.strokeStyle = "rgba(79, 252, 255, 0.09)"
  context.lineWidth = 1

  for (let x = -spacing; x < width + spacing; x += spacing) {
    context.beginPath()
    context.moveTo(x + drift, 0)
    context.lineTo(x + drift, height)
    context.stroke()
  }

  for (let y = -spacing; y < height + spacing; y += spacing) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }

  context.restore()
}

function drawParticles() {
  particles.forEach((particle) => {
    particle.x += particle.speedX
    particle.y += particle.speedY

    if (particle.x < -30) particle.x = width + 30
    if (particle.x > width + 30) particle.x = -30
    if (particle.y < -30) particle.y = height + 30
    if (particle.y > height + 30) particle.y = -30

    context.beginPath()
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    context.fillStyle = `rgba(79, 252, 255, ${particle.alpha})`
    context.fill()
  })
}

function animate(time) {
  drawBackground(time)
  drawGrid(time)
  drawParticles()
  rafId = requestAnimationFrame(animate)
}

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / width
  pointer.y = event.clientY / height
})

window.addEventListener("resize", () => {
  resize()
  createParticles()
})

resize()
createParticles()
animate(0)

setTimeout(() => {
  overlay?.classList.add("overlay--visible")
}, 260)

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(rafId)
})
