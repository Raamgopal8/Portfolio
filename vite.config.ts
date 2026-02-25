import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  const plugins = [react()]

  // Keep Tailwind plugin enabled when available, but don't hard fail if
  // dependencies were installed without optional dev packages.
  try {
    const tailwindcss = (await import('@tailwindcss/vite')).default
    plugins.push(tailwindcss())
  } catch {
    // no-op
  }

  return {
    plugins,
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
