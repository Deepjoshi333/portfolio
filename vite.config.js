import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const INITIAL_LIKES = 214
const likesFile = path.resolve('.local-data', 'likes.json')
let likesWriteQueue = Promise.resolve()

const withLocalLikes = (increment = false) => {
  const operation = likesWriteQueue.then(async () => {
    let likes
    try {
      const saved = JSON.parse(await readFile(likesFile, 'utf8'))
      likes = Number.isSafeInteger(saved.likes) && saved.likes >= INITIAL_LIKES
        ? saved.likes
        : INITIAL_LIKES
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      likes = INITIAL_LIKES
    }

    if (increment) likes += 1
    await mkdir(path.dirname(likesFile), { recursive: true })
    await writeFile(likesFile, JSON.stringify({ likes }), 'utf8')
    return likes
  })

  likesWriteQueue = operation.catch(() => {})
  return operation
}

const localLikesApi = {
  name: 'local-likes-api',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const pathname = new URL(request.url, 'http://localhost').pathname
      if (pathname !== '/.netlify/functions/likes') return next()

      if (request.method !== 'GET' && request.method !== 'POST') {
        response.writeHead(405, { 'content-type': 'application/json' })
        response.end(JSON.stringify({ error: 'Method not allowed.' }))
        return
      }

      try {
        const likes = await withLocalLikes(request.method === 'POST')
        response.writeHead(200, {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        })
        response.end(JSON.stringify({ likes }))
      } catch (error) {
        console.error('Unable to access local portfolio likes:', error)
        response.writeHead(500, { 'content-type': 'application/json' })
        response.end(JSON.stringify({ error: 'Unable to save likes locally.' }))
      }
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localLikesApi],
})
