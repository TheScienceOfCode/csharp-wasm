import { defineConfig } from "vite";
import wasmSharp from "@wasmsharp/vite-plugin";

// App-mode build (not lib mode: lib mode inlines the .NET assemblies as base64) whose only entry is runner.js.
export default defineConfig({
  plugins: [wasmSharp()],
  base: "./",
  build: {
    target: "esnext",
    outDir: "docs",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: { runner: "runner.js" },
      preserveEntrySignatures: "strict",
      output: { entryFileNames: "runner.js", chunkFileNames: "assets/[name]-[hash].js", assetFileNames: "assets/[name]-[hash][extname]" },
    },
  },
});
