import { articles, projects } from "../data/content.js"

export default function handler(_req, res) {
  res.status(200).json({ projects, articles })
}
