import react from '@vitejs/plugin-react-swc'
import type { ResolvedConfig, Plugin } from 'vite'
import { defineConfig } from 'vite'
import {readFile} from 'node:fs/promises'

const neutralino = (): Plugin => {
  let config: ResolvedConfig;
  return {
    name: 'neutralino',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async transformIndexHtml(html) {
      if (config.mode === "development") {
        const authFileContent = await readFile('.tmp/auth_info.json', 'utf-8');
        const { nlPort } = await JSON.parse(authFileContent);

        return html.replace(
          "<neutralino>",
          `<script src="http://localhost:${nlPort}/__neutralino_globals.js"></script>`
        );
      } else {
        return html.replace(
          "<neutralino>",
          '<script src="%PUBLIC_URL%/__neutralino_globals.js"></script>'
        );
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    neutralino()
  ],
  build: {
    outDir: "build"
  },
  server: {
    port: 3000,
    strictPort: true
  }
})