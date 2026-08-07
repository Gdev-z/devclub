import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'build'
      ? [
          visualizer({
            open: true,
            filename: 'dist/stats.html',
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  server: {
    host: true,
    port: 5173,
  },
}))
