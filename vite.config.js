import { fileURLToPath, URL } from "url";
import { resolve, dirname } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    css: true, // Dynamically inject css as a <style> tag
    compileTemplate: true, // Explicitly convert template to render function
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(_dirname, "./index.js"),
      name: "Pumpkin",
      // the proper extensions will be added
      fileName: "pumpkin",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
