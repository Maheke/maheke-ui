import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [svelte()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(`./src`, import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["svelte-navigator"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
