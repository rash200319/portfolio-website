import cors from "cors"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { articles, projects } from "../data/content.js"

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({ ok: true })
})

app.get("/api/content", (_req, res) => {
  res.json({ projects, articles })
})

const publicPath = path.resolve(__dirname, "..", "public")
app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
