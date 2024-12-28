import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: 'public',
    define: {
        global: {},
    },
    plugins: [
      react(),
      svgr(),
      VitePWA({
          injectRegister: 'auto',
          includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'signifier.svg'],
          devOptions: {
              enabled: true,
              type: 'module',
          },
          manifest: {
              name: 'Programmino',
              short_name: 'Programmino',
              description: 'CRO tool to quickly find rates and compose email and quotations from Blastness booking engines',
              theme_color: '#2e5749',
              icons: [
                  {
                      src: '/pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png'
                  },
                  {
                      src: '/pwa-64x64.png',
                      sizes: '64x64',
                      type: 'image/png'
                  },
                  {
                      src: '/apple-touch-icon-180x180.png',
                      sizes: '180x180',
                      type: 'image/png',
                      purpose: 'maskable',
                  },

              ]
          }
      }),
  ],
})