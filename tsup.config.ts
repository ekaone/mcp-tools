import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true, // esbuild
  sourcemap: true,
});
