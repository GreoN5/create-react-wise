import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return env.DEV
    ? {
      server: {
        proxy: {
          '/api': {
            target: env.VITE_API_URL,
            changeOrigin: true,
            secure: false,
            configure: (proxy) => {
              proxy.on('error', (err) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (req) => {
                console.log('Sending Request to the Target:', req.method);
              });
              proxy.on('proxyRes', (proxyRes, req) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          },
        },
      },
      plugins: [react(), tsconfigPaths()],
    }
    : {
      plugins: [react(), tsconfigPaths()],
    };
});

