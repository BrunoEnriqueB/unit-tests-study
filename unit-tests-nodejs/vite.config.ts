import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
      '@test/': new URL('./src/__tests__/', import.meta.url).pathname,
    },
  },
});
