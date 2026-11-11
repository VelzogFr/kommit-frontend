import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  // Les e2e Playwright (e2e/*.test.ts) ne sont pas des tests Vitest.
  test: {
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
