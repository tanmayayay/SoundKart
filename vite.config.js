import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // relative asset paths → works on GitHub Pages subpaths & custom domains
  plugins: [react()],
})
