import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── Dependency pre-bundling ──────────────────────────────────────────────
  // Explicitly tell Vite which heavy deps to pre-bundle so cold-start is fast
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'firebase/app',
      'firebase/auth',
      'framer-motion',
      'react-icons/fi',
      'recharts',
      'sonner',
    ],
  },

  build: {
    // ── Code splitting ────────────────────────────────────────────────────
    // Split vendor JS into separate cacheable chunks so a code change doesn't
    // bust the entire bundle in production.
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Data fetching & state
          'vendor-query': ['@tanstack/react-query', 'axios'],
          // Firebase SDK (largest single dep)
          'vendor-firebase': ['firebase/app', 'firebase/auth'],
          // Stripe payment UI (only loaded on /payment)
          'vendor-stripe': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          // Animation libraries
          'vendor-motion': ['framer-motion', '@react-spring/web'],
          // Chart library
          'vendor-charts': ['recharts'],
          // Icon tree (large if not split)
          'vendor-icons': ['react-icons'],
          // Toast / notification
          'vendor-toast': ['sonner', 'react-hot-toast', 'sweetalert2'],
          // Socket
          'vendor-socket': ['socket.io-client'],
        },
      },
    },

    // Warn but don't fail on chunks > 1 MB (informational only for dev)
    chunkSizeWarningLimit: 1000,

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',

    // Generate source maps only in dev builds (keep prod lean)
    sourcemap: false,
  },

  // ── Dev server tweaks ────────────────────────────────────────────────────
  server: {
    // Warm up the most-visited pages so the first browser hit is instant
    warmup: {
      clientFiles: [
        './src/pages/home/Home.jsx',
        './src/Routes/Router.jsx',
        './src/layout/Layout.jsx',
      ],
    },
  },
})
