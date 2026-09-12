import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path: '/' for Vercel, '/REPO-NAME/' for GitHub Pages project sites.
// Override at build time with: VITE_BASE=/your-repo/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
