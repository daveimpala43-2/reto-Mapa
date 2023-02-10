import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

export default defineConfig({
  resolve:{
    alias:{
      '@': resolve(__dirname, './src'),
      '@pages': resolve(__dirname,'./src/pages'),
      '@context': resolve(__dirname,'./src/context'),
      '@router': resolve(__dirname,'./src/router'),
      '@api': resolve(__dirname,'./src/api'),
    }
  },
  plugins: [react()],
})
