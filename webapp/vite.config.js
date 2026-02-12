import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const ghBase = repoName ? `/${repoName}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? ghBase : '/',
  plugins: [react()],
})
