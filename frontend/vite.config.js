import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/socket.io': {
          target: env.VITE_API_URL, // Access the loaded environment variable
          ws: true, // Enables websocket proxying
          changeOrigin: true,
        },
      },
    },
  }
})
